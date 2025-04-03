import React, { useState } from 'react';
import map from "../assets/Map/map.jpg"
import htmd from "../assets/FeaturedEvents/htmd.png"
import web3 from "../assets/FeaturedEvents/web3.png"
import ai from "../assets/FeaturedEvents/AIcamp.png"
import science from "../assets/FeaturedEvents/science1.png"
import career from "../assets/FeaturedEvents/career.jpeg"
import peer from "../assets/FeaturedEvents/peer.png"
import teacher from "../assets/FeaturedEvents/teacher.png"
import maths from "../assets/FeaturedEvents/maths.png"
import coder from "../assets/FeaturedEvents/coder.png"
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ChatBot from '../components/Chatbot';
// Component for event cards with image support

const EventCard = ({ title, date, location, distance, description, imageSrc, registrationRequired, buttons, offlineAccess, transportSubsidy }) => {
  return (
    <div className="border border-gray-700 rounded-lg p-4 bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
      {imageSrc && (
        <div className="mb-3 relative">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-40 object-cover rounded-lg"
          />
          {offlineAccess && (
            <div className="absolute top-2 left-2 bg-teal-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
              Offline Access
            </div>
          )}
          {transportSubsidy && (
            <div className="absolute top-2 right-2 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Travel Support
            </div>
          )}
        </div>
      )}
      <h3 className="font-bold text-white">{title}</h3>
      {date && <p className="text-gray-300"><span className="font-medium text-teal-400">Date:</span> {date}</p>}
      {location && <p className="text-gray-300"><span className="font-medium text-teal-400">Location:</span> {location}</p>}
      {distance && <p className="text-gray-300"><span className="font-medium text-teal-400">Distance:</span> {distance}</p>}
      {registrationRequired && <p className="text-sm text-teal-400 font-medium">Registration required</p>}
      {description && <p className="mt-2 text-gray-400">{description}</p>}
      
      {buttons && buttons.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {buttons.map((button, index) => (
            <button 
              key={index}
              className={`${button.primary 
                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700' 
                : 'bg-gradient-to-r from-teal-400 to-teal-500 text-gray-900 hover:from-teal-500 hover:to-teal-600'} 
                px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all`}
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const CalendarView = ({ viewMode, setViewMode }) => {
  return (
    <div className="mb-6 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-white">Calendar View</h2>
        <div className="flex space-x-2">
          {['Monthly', 'Weekly', 'Daily'].map(mode => (
            <button 
              key={mode}
              className={`px-3 py-1 rounded-full ${viewMode === mode 
                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white' 
                : 'bg-gray-700 text-gray-300'} transition-all`}
              onClick={() => setViewMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
      <div className="text-center font-medium text-teal-400">March 2025</div>
      
      <div className="mt-4 rounded-lg overflow-hidden border border-gray-700">
        <img 
          src={map}
          alt="Event map" 
          className="w-full h-64 object-cover"
        />
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-3 flex justify-between items-center">
          <span>Events near Bangalore</span>
          <button className="px-3 py-1 bg-teal-400 text-gray-900 rounded-full text-sm font-medium">View full map</button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        {['Today', 'Tomorrow', 'This weekend', 'Next weekend', 'Choose date', 'All upcoming'].map(option => (
          <button key={option} className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white p-3 rounded-lg flex justify-between items-center transition-all">
            <span>{option}</span>
            <span>→</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const FilterSection = ({ filters, handleFilterChange }) => {
  return (
    <div className="mb-6 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg shadow">
      <h2 className="font-semibold mb-2 text-white">Filter Events:</h2>
      <div className="flex flex-wrap gap-3">
        {[
          { id: 'competitions', label: 'Competitions' },
          { id: 'scholarships', label: 'Scholarships' },
          { id: 'workshops', label: 'Workshops' },
          { id: 'localEvents', label: 'Local Events' },
          { id: 'webinars', label: 'Webinars' },
          { id: 'offlineAccess', label: 'Offline Access' },
          { id: 'lowBandwidth', label: 'Low Bandwidth' },
          { id: 'transportSupport', label: 'Transport Support' },
          { id: 'vernacularLanguage', label: 'Local Language' }
        ].map(filter => (
          <label key={filter.id} className="flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded-full border border-gray-600 hover:border-teal-400 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={filters[filter.id]}
              onChange={() => handleFilterChange(filter.id)}
              className="h-4 w-4 text-teal-500"
            />
            <span className="text-gray-300">{filter.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const FeaturedEvents = () => {
  return (
    <div className="mb-6 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3 text-white">Featured Conferences</h2>
      
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {[
          {
            title: "HTMD Conference India 2024",
            date: "Dec 07, 2024",
            time: "9:00 AM - 5:00 PM",
            location: "Microsoft Reactor, Lavelle Road",
            attendees: "1200 attending",
            price: "₹299",
            image: htmd,
            tags: ["Technology", "Innovation", "AI"],
            transportSupport: true,
            scholarshipAvailable: true
          },
          {
            title: "Web 3 Conference",
            date: "Dec 07, 2024",
            time: "9:00 AM - 5:00 PM",
            location: "Microsoft Reactor, Lavelle Road",
            attendees: "1200 attending",
            price: "₹299",
            image: web3,
            tags: ["Technology", "Innovation", "AI"],
            transportSupport: false,
            scholarshipAvailable: true
          },
          {
            title: "AI, LLMs, ML Data Meetup",
            date: "Dec 07, 2024",
            time: "9:00 AM - 5:00 PM",
            location: "Microsoft Reactor, Lavelle Road",
            attendees: "1200 attending",
            price: "₹299",
            image: ai,
            tags: ["Technology", "Innovation", "AI"],
            transportSupport: true,
            scholarshipAvailable: false
          }
        ].map((event, index) => (
          <div key={index} className="min-w-72 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all bg-gray-800">
            <div className="relative">
              <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
              <div className="absolute top-2 left-2 bg-gray-700/90 rounded-full px-2 py-1 text-xs text-white font-medium">Conference</div>
              <div className="absolute top-2 right-2 bg-teal-400 rounded-full px-2 py-1 text-xs text-gray-900 font-medium flex items-center">
                <span className="mr-1">★</span> 4.8
              </div>
              {event.transportSupport && (
                <div className="absolute bottom-2 left-2 bg-teal-500 text-white rounded-full px-2 py-1 text-xs font-medium">
                  Transport Support
                </div>
              )}
              {event.scholarshipAvailable && (
                <div className="absolute bottom-2 right-2 bg-teal-400 text-gray-900 rounded-full px-2 py-1 text-xs font-medium">
                  Scholarships
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-bold text-lg text-white">{event.title}</h3>
              <div className="flex items-center space-x-1 text-sm mt-2">
                <span className="text-teal-400">📅</span>
                <span className="text-gray-300">{event.date}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm mt-1">
                <span className="text-teal-400">⏰</span>
                <span className="text-gray-300">{event.time}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm mt-1">
                <span className="text-teal-400">📍</span>
                <span className="text-gray-300">{event.location}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm mt-1">
                <span className="text-teal-400">👥</span>
                <span className="text-gray-300">{event.attendees}</span>
              </div>
              <div className="flex gap-2 mt-2">
                {event.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-gray-700 text-teal-400 px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-teal-400">{event.price}</span>
                <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-3 py-1 rounded-full shadow-sm transition-all">Register Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for upcoming hackathons
const UpcomingHackathons = () => {
  return (
    <div className="mb-6 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3 text-white">Upcoming Hackathons</h2>
      <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative">
            <img 
              src={career}
              alt="Digital Innovation Challenge" 
              className="rounded-lg w-full md:w-full h-40 object-cover"
            />
            <div className="absolute top-2 left-2 bg-teal-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
              Offline Access
            </div>
            <div className="absolute bottom-2 right-2 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Transport Support
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white">Digital Innovation Challenge 2025</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-gray-300"><span className="font-medium text-teal-400">Date:</span> March 15-16, 2025</p>
                <p className="text-gray-300"><span className="font-medium text-teal-400">Location:</span> Online (Low bandwidth options available)</p>
                <p className="text-gray-300"><span className="font-medium text-teal-400">Registration Deadline:</span> March 10, 2025</p>
                
                <div className="mt-3">
                  <h4 className="font-medium text-white">Skills Required:</h4>
                  <ul className="list-disc ml-5 text-gray-300">
                    <li>Basic programming knowledge</li>
                    <li>Problem-solving skills</li>
                    <li>Creativity</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-white">Preparation Resources:</h4>
                <ul className="list-disc ml-5 text-gray-300">
                  <li>Intro to Coding (Beginner-Friendly)</li>
                  <li>Problem Solving Techniques</li>
                  <li>Team Collaboration Guide</li>
                </ul>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-3 py-1 rounded-full shadow-sm transition-all">Register Now</button>
                  <button className="bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-gray-900 px-3 py-1 rounded-full shadow-sm transition-all">Add to Calendar</button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full shadow-sm transition-all">Download Materials</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Rural Student Resources Component
const RuralStudentResources = () => {
  return (
    <div className="mb-6 bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-lg shadow text-white">
      <h2 className="text-xl font-semibold mb-3">Resources for Rural Students</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-gray-700">
          <div className="bg-teal-400 text-gray-900 w-12 h-12 rounded-full flex items-center justify-center mb-3 font-bold text-2xl">
            📱
          </div>
          <h3 className="font-bold text-lg mb-2">Offline Access</h3>
          <p className="text-gray-300 mb-2">Download events and materials for offline access. Look for the "Offline Access" badge on events.</p>
          <button className="bg-teal-400 hover:bg-teal-300 text-gray-900 px-3 py-1 rounded-full text-sm font-medium mt-2 transition-colors">
            How to Download
          </button>
        </div>
        
        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-gray-700">
          <div className="bg-teal-400 text-gray-900 w-12 h-12 rounded-full flex items-center justify-center mb-3 font-bold text-2xl">
            🚌
          </div>
          <h3 className="font-bold text-lg mb-2">Transport Support</h3>
          <p className="text-gray-300 mb-2">Apply for transport subsidies for events with the "Transport Support" badge. Covers up to 80% of travel costs.</p>
          <button className="bg-teal-400 hover:bg-teal-300 text-gray-900 px-3 py-1 rounded-full text-sm font-medium mt-2 transition-colors">
            Apply Now
          </button>
        </div>
        
        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-gray-700">
          <div className="bg-teal-400 text-gray-900 w-12 h-12 rounded-full flex items-center justify-center mb-3 font-bold text-2xl">
            🔄
          </div>
          <h3 className="font-bold text-lg mb-2">Low Bandwidth Mode</h3>
          <p className="text-gray-300 mb-2">Enable low bandwidth mode for slower internet connections. Optimizes images and loads text content first.</p>
          <button className="bg-teal-400 hover:bg-teal-300 text-gray-900 px-3 py-1 rounded-full text-sm font-medium mt-2 transition-colors">
            Enable Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Peer Mentorship & Community Support
const PeerMentorship = () => {
  return (
    <div className="mb-6 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3 text-white">Peer Mentorship Program</h2>
      
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <img 
            src={peer}
            alt="Peer Mentorship" 
            className="rounded-lg w-full md:w-1/4 h-40 object-cover"
          />
          <div className="flex-1">
            <h3 className="font-bold text-white">Connect with Successful Rural Students</h3>
            <p className="text-gray-300 mt-2">Our peer mentorship program connects you with successful students from similar backgrounds who have overcome challenges similar to yours.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <h4 className="font-medium text-white">Benefits:</h4>
                <ul className="list-disc ml-5 text-gray-300">
                  <li>One-on-one guidance from experienced peers</li>
                  <li>Regular check-ins and support sessions</li>
                  <li>Help navigating educational opportunities</li>
                  <li>Available in multiple local languages</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-white">How It Works:</h4>
                <ol className="list-decimal ml-5 text-gray-300">
                  <li>Complete a short profile about your interests</li>
                  <li>Get matched with compatible mentors</li>
                  <li>Connect through text, voice, or in-person</li>
                  <li>Build a lasting relationship for success</li>
                </ol>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-4 py-2 rounded-full shadow-sm transition-all">
                Find a Mentor
              </button>
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-200 text-gray-900 px-4 py-2 rounded-full shadow-sm transition-all">
                Become a Mentor
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full shadow-sm transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Events component
const Events = () => {
  const [viewMode, setViewMode] = useState('Monthly');
  const [filters, setFilters] = useState({
    competitions: false,
    scholarships: false,
    workshops: false,
    localEvents: false,
    webinars: false,
    offlineAccess: false,
    lowBandwidth: false,
    transportSupport: false,
    vernacularLanguage: false
  });

  const handleFilterChange = (filter) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filter]: !prevFilters[filter]
    }));
  };

  return (
    
    <div className="max-w-6xl mx-auto p-4 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
     
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-lg text-white border border-gray-700">
        <h1 className="text-2xl font-bold">Educational Opportunities</h1>
        <div className="flex items-center mt-3 md:mt-0">
          <button className="bg-teal-400 hover:bg-teal-300 text-gray-900 px-4 py-2 rounded-full mr-2 font-medium shadow-sm transition-colors">
            Low Bandwidth Mode
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full font-medium shadow-sm transition-colors">
            Download App (5MB)
          </button>
        </div>
      </div>
      
      <CalendarView viewMode={viewMode} setViewMode={setViewMode} />
      <FilterSection filters={filters} handleFilterChange={handleFilterChange} />
      <RuralStudentResources />
      <UpcomingHackathons />
      <PeerMentorship />
      <FeaturedEvents />
     
      <div className="mb-6 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-3 text-white">All Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <EventCard 
            title="Coding Workshop for Beginners"
            date="March 8, 2025"
            location="Online"
            description="Learn the basics of programming in this beginner-friendly workshop."
            imageSrc={coder}
            offlineAccess={true}
            transportSubsidy={false}
            buttons={[
              { label: "Register", primary: true },
              { label: "Add to Calendar", primary: false }
            ]}
          />
          
          <EventCard 
            title="Mathematics Competition"
            date="March 14, 2025"
            location="Bangalore Urban"
            distance="25 km"
            description="Annual mathematics competition with scholarships for winners."
            imageSrc={maths}
            registrationRequired={true}
            offlineAccess={false}
            transportSubsidy={true}
            buttons={[
              { label: "Register", primary: true },
              { label: "View Details", primary: false },
              { label: "Apply for Transport", primary: false }
            ]}
          />
          
          <EventCard 
            title="Science Fair 2025"
            date="March 20, 2025"
            location="Mysuru"
            distance="42 km"
            description="Showcase your science projects and win prizes."
            imageSrc={science}
            registrationRequired={true}
            offlineAccess={true}
            transportSubsidy={true}
            buttons={[
              { label: "Register", primary: true },
              { label: "View on Map", primary: false },
              { label: "Apply for Transport", primary: false }
            ]}
          />
        </div>
        
        <div className="mt-4 flex justify-center">
          <button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-2 rounded-full shadow-sm transition-all">
            View All Events
          </button>
        </div>
      </div>
      <ChatBot/>
      <Footer/>
    </div>
  );
};

export default Events;