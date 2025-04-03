import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from difflib import get_close_matches


def load_event_data(grade):
    """Load appropriate event data based on student grade."""
    filename = "events_10plus.json" if grade >= 10 else "events_junior.json"
    
    try:
        with open(filename, 'r') as file:
            event_data = json.load(file)
        
        if not event_data:
            print(f"⚠️ Warning: Event data is empty in {filename}!")
            return {}

    except (FileNotFoundError, json.JSONDecodeError):
        print(f"❌ Error: Could not load event data from {filename}. Check the file path and format.")
        return {}

    required_keys = {"description", "location", "domain"}
    return {name: details for name, details in event_data.items() if all(key in details for key in required_keys)}


def normalize_location(location):
    """Normalize common location names for better matching."""
    location_map = {
        "bangalore": "bengaluru",
        "mumbai": "bombay",
        "delhi": "new delhi",
        "hyd": "hyderabad",
        "madras": "chennai",
        "mysore": "mysuru",
        "mangalore": "mangaluru"
    }
    return location_map.get(location.lower(), location.lower())


def save_search_history(grade, user_query, location):
    """Save user search history for future recommendations."""
    history = {}
    try:
        with open("search_history.json", "r") as file:
            history = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        pass

    # Include grade information in the history
    if "grade_data" not in history:
        history["grade_data"] = {}
    
    if str(grade) not in history["grade_data"]:
        history["grade_data"][str(grade)] = {}
        
    history["grade_data"][str(grade)].setdefault(user_query, []).append(location)
    
    with open("search_history.json", "w") as file:
        json.dump(history, file, indent=4)


def recommend_events(grade, user_query, location, event_data):
    """Recommend events based on user domain query and location using TF-IDF and cosine similarity."""

    event_names = list(event_data.keys())
    event_descriptions = [event['description'] for event in event_data.values()]
    event_locations = [event['location'] for event in event_data.values()]
    event_domains = [event['domain'] for event in event_data.values()]

    user_query = user_query.lower().strip()
    location = normalize_location(location)

    # Fuzzy matching to find the closest matching domain
    matching_domains = get_close_matches(user_query, [domain.lower() for domain in event_domains], n=3, cutoff=0.5)
    if matching_domains:
        print(f"\n🔍 Did you mean: {', '.join(matching_domains)}?")
        user_query = matching_domains[0]  

    domain_filtered_events = [
        (name, desc, loc, domain) for name, desc, loc, domain in zip(event_names, event_descriptions, event_locations, event_domains)
        if user_query in domain.lower()  # Check if user query exists in domain
    ]

    if not domain_filtered_events:
        print(f"\n⚠️ No events found for the '{user_query}' domain.")
        return []

    location_filtered_events = [
        (name, desc, loc, domain) for name, desc, loc, domain in domain_filtered_events
        if location in loc.lower()  
    ]

    # If no events found in location, show all domain-specific events
    if not location_filtered_events:
        print(f"\n📍 No events found in {location.title()} for '{user_query}'. Showing all events in this domain.")
        location_filtered_events = domain_filtered_events

    # Combine event descriptions and locations for better text matching
    combined_descriptions = [f"{desc} {loc}" for _, desc, loc, _ in location_filtered_events]
  
    tfidf_vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf_vectorizer.fit_transform(combined_descriptions)
    
    # Convert user query into TF-IDF vector
    user_query_vector = tfidf_vectorizer.transform([user_query])
  
    similarity_scores = cosine_similarity(user_query_vector, tfidf_matrix).flatten()

    # Sort events based on similarity scores (highest first)
    sorted_indices = np.argsort(similarity_scores)[::-1]

    # Prepare recommendations
    recommendations = []
    for index in sorted_indices:
        event_name = location_filtered_events[index][0]
        event_location = location_filtered_events[index][2]
        event_domain = location_filtered_events[index][3]
        event_score = similarity_scores[index]
        
        # Get additional details from the original event data
        full_event_data = event_data[event_name]
        
        recommendations.append({
            'event': event_name,
            'location': event_location,
            'domain': event_domain,
            'date': full_event_data.get('date', 'Date not specified'),
            'fee': full_event_data.get('fee', 'Fee not specified'),
            'score': event_score
        })

    return recommendations


def create_sample_data():
    """Create sample JSON data files for testing if they don't exist."""
    
    # Events for 10+ grade students (tech-focused)
    events_10plus = {
        "AI Conference 2024": {
            "description": "Join the AI revolution at this global AI conference with top experts.",
            "location": "Bengaluru",
            "domain": "AI",
            "date": "Jan 10, 2024",
            "fee": "₹2,000"
        },
        "Blockchain Summit 2024": {
            "description": "Explore the future of finance and technology at the blockchain summit.",
            "location": "Bengaluru",
            "domain": "Blockchain",
            "date": "Jan 15, 2024",
            "fee": "₹2,500"
        },
        "Tech Meetup 2024": {
            "description": "A meetup for tech enthusiasts to discuss the latest trends in technology.",
            "location": "Bengaluru",
            "domain": "Technology",
            "date": "Jan 20, 2024",
            "fee": "Free"
        },
        "AI Workshop": {
            "description": "Hands-on workshop to learn AI tools and techniques.",
            "location": "Chennai",
            "domain": "AI",
            "date": "Feb 10, 2024",
            "fee": "₹1,500"
        },
        "Blockchain Workshop": {
            "description": "Learn how blockchain works with interactive sessions.",
            "location": "Hyderabad",
            "domain": "Blockchain",
            "date": "Dec 5, 2024",
            "fee": "₹1,000"
        },
        "HTMD Conference": {
            "description": "HTMD Conference is happening on Dec 07, 2024, from 9:00 AM - 5:00 PM at Microsoft reactor-Lavelle Road, Bengaluru. The registration fee is $299 with 1200 attendees expected. Key topics include Technology, Innovation, and AI.",
            "location": "Bengaluru",
            "domain": "Technology",
            "date": "Dec 07, 2024",
            "fee": "₹20,000"
        },
        "Unfold": {
            "description": "Unfold 24 is Asia's largest hackathon with $100K+ worth bounties and 500+ Web3 developers. It's taking place in Whitefield, Bengaluru at the Marriott Hotel.",
            "location": "Bengaluru",
            "domain": "Web3",
            "date": "Dec 12, 2024",
            "fee": "₹3,000"
        },
        "AI Camp": {
            "description": "AI Camp is a meetup in Bengaluru focusing on AI, LLMs, ML, and Data. It's a free event with hands-on sessions.",
            "location": "Bengaluru",
            "domain": "AI",
            "date": "Jan 30, 2024",
            "fee": "Free"
        },
        "Cybersecurity Hackathon": {
            "description": "A 48-hour hackathon focused on solving real-world cybersecurity challenges.",
            "location": "Mysuru",
            "domain": "Cybersecurity",
            "date": "Mar 15, 2024",
            "fee": "₹1,000"
        },
        "DevOps Conference": {
            "description": "Learn about the latest DevOps practices, tools, and methodologies.",
            "location": "Mangaluru",
            "domain": "DevOps",
            "date": "Apr 20, 2024",
            "fee": "₹2,500"
        }
    }
    
    # Events for junior students (non-tech focused)
    events_junior = {
        "Karnataka Science Exhibition": {
            "description": "Annual state-level science exhibition for students to showcase innovative projects.",
            "location": "Bengaluru",
            "domain": "Science",
            "date": "Feb 5, 2024",
            "fee": "₹200"
        },
        "Junior Programming Contest": {
            "description": "Programming competition designed for young students to learn coding basics.",
            "location": "Bengaluru",
            "domain": "Programming",
            "date": "Mar 10, 2024",
            "fee": "₹500"
        },
        "Pratibha Karanji": {
            "description": "Karnataka's state-level talent search competition for students covering arts, culture, and academics.",
            "location": "Mysuru",
            "domain": "Cultural",
            "date": "Dec 15, 2024",
            "fee": "Free"
        },
        "Young Scientist Fair": {
            "description": "Exhibition for young science enthusiasts to display their projects and innovations.",
            "location": "Mangaluru",
            "domain": "Science",
            "date": "Jan 25, 2024",
            "fee": "₹250"
        },
        "Robotic Workshop for Beginners": {
            "description": "Introductory hands-on workshop for students to learn basics of robotics.",
            "location": "Bengaluru",
            "domain": "Robotics",
            "date": "Apr 5, 2024",
            "fee": "₹1,000"
        },
        "Mathematics Olympiad": {
            "description": "State-level mathematics competition for school students.",
            "location": "Hubballi",
            "domain": "Mathematics",
            "date": "Feb 18, 2024",
            "fee": "₹300"
        },
        "Junior Hackathon": {
            "description": "A fun coding event designed for young students to solve simple programming challenges.",
            "location": "Bengaluru",
            "domain": "Programming",
            "date": "May 12, 2024",
            "fee": "₹500"
        },
        "Science Model Exhibition": {
            "description": "Platform for students to showcase their science models and innovations.",
            "location": "Belagavi",
            "domain": "Science",
            "date": "Mar 22, 2024",
            "fee": "₹200"
        },
        "Design Thinking Workshop": {
            "description": "Interactive workshop teaching young students the basics of design thinking.",
            "location": "Bengaluru",
            "domain": "Design",
            "date": "Jun 8, 2024",
            "fee": "₹800"
        },
        "Young Artists Showcase": {
            "description": "Art exhibition and competition for young artists across Karnataka.",
            "location": "Mysuru",
            "domain": "Art",
            "date": "Apr 15, 2024",
            "fee": "₹250"
        }
    }
    
    # Create the JSON files
    try:
        with open("events_10plus.json", "w") as file:
            json.dump(events_10plus, file, indent=4)
        
        with open("events_junior.json", "w") as file:
            json.dump(events_junior, file, indent=4)
            
        print("✅ Sample event data files created successfully.")
    except:
        print("❌ Error creating sample event data files.")


if __name__ == "__main__":
    # Create sample data files if needed
    create_sample_data()
    
    # Display welcome message
    print("\n🎉 Welcome to Zynk! Discover events and hackathons based on your interests and expertise.")
    
    while True:
        # Get student grade first
        try:
            grade = int(input("\n📚 What grade/class are you in? (Enter a number): "))
            if grade <= 0:
                print("⚠️ Please enter a valid grade greater than 0.")
                continue
        except ValueError:
            print("⚠️ Please enter a valid number for your grade.")
            continue
            
        # Load appropriate event data based on grade
        event_data = load_event_data(grade)
        
        if not event_data:
            print("❌ No event data available. Please try again later.")
            break
            
        # Display available domains based on grade
        if grade >= 10:
            print("\n🌍 Available Domains for Grade 10+ students: AI, Blockchain, Web3, Cybersecurity, Technology, DevOps\n")
            domain_suggestion = "AI, Blockchain, Web3, etc."
        else:
            print("\n🌍 Available Domains for Junior students: Science, Programming, Robotics, Mathematics, Cultural, Art, Design\n")
            domain_suggestion = "Science, Programming, Cultural, etc."
            
        # User input
        user_query = input(f"\n🔍 Enter a domain (e.g., {domain_suggestion}): ").lower().strip()
        location = input("📍 Enter a location in Karnataka (e.g., Bengaluru, Mysuru, etc.): ").lower().strip()

        # Get recommendations
        recommended_events = recommend_events(grade, user_query, location, event_data)

        # Display recommendations
        if recommended_events:
            print("\n✅ Recommended Events Based on Your Query:\n")
            
            # Highlight the top recommended event
            top_event = recommended_events[0]
            print(f"🏆 **Top Recommended Event:**")
            print(f"🔹 **{top_event['event']}**")
            print(f"📍 Location: {top_event['location']}")
            print(f"🏷️ Domain: {top_event['domain']}")
            print(f"📅 Date: {top_event['date']}")
            print(f"💰 Fee: {top_event['fee']}")
            print(f"⭐ Relevance Score: {top_event['score']:.3f}\n")

            # Show remaining events
            for rec in recommended_events[1:]:
                print(f"🔹 {rec['event']}")
                print(f"📍 Location: {rec['location']}")
                print(f"🏷️ Domain: {rec['domain']}")
                print(f"📅 Date: {rec['date']}")
                print(f"💰 Fee: {rec['fee']}")
                print(f"⭐ Relevance Score: {rec['score']:.3f}\n")
            
            # Save search history
            save_search_history(grade, user_query, location)

        else:
            print("\n❌ No events to recommend based on your query.")

        # Offer retry option
        retry = input("\n🔄 Would you like to search again with a different domain or location? (yes/no): ").strip().lower()
        if retry != "yes":
            print("\n👋 Thank you for using Zynk! Have a great day!\n")
            break