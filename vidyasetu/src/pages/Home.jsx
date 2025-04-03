import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import girl from "../assets/students/girl.png";
import girl2 from "../assets/students/girl2.png";
import teacher from "../assets/students/teacher.png";
import plant from "../assets/resources/plant.png"
import aryabhatta from "../assets/resources/aryabhatta.png"
import math from "../assets/resources/math.png"
import ChatBot from '../components/Chatbot';

const Home = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [activeLanguage, setActiveLanguage] = React.useState('english'); // Default language
  
  // Multilingual content
  const languages = {
    english: {
      slide1: {
        title: "Education for Everyone - Without Barriers",
        subtitle: "Education for Everyone - Without Barriers",
        description: "VidyaSetu bridges the gap between rural students and quality education through AI-powered learning tools in multiple languages."
      },
      slide2: {
        title: "It's Never Too Late to Learn",
        subtitle: "It's Never Too Late to Learn",
        description: "Our personalized learning paths adapt to your schedule and pace, making education accessible to students of all backgrounds."
      },
      slide3: {
        title: "Language Should Never Be a Barrier",
        subtitle: "Language Should Never Be a Barrier",
        description: "Our AI-powered tools translate complex academic concepts into simple language, making quality education truly accessible."
      },
      buttons: {
        start: "Start Learning Now",
        learnMore: "Learn More",
        discover: "Discover Your Path",
        howItWorks: "How It Works",
        tryTools: "Try Translation Tools",
        viewDemo: "View Demo"
      }
    },
    hindi: {
      slide1: {
        title: "सभी के लिए शिक्षा - बिना किसी बाधा के",
        subtitle: "Education for Everyone - Without Barriers",
        description: "विद्यासेतु ग्रामीण छात्रों और गुणवत्तापूर्ण शिक्षा के बीच की दूरी को कई भाषाओं में AI-संचालित सीखने के उपकरणों के माध्यम से पाटता है।"
      },
      slide2: {
        title: "सीखने के लिए कभी भी देर नहीं होती",
        subtitle: "It's Never Too Late to Learn",
        description: "हमारे व्यक्तिगत शिक्षण पथ आपके कार्यक्रम और गति के अनुसार अनुकूलित होते हैं, जिससे सभी पृष्ठभूमि के छात्रों के लिए शिक्षा सुलभ हो जाती है।"
      },
      slide3: {
        title: "भाषा कभी भी बाधा नहीं होनी चाहिए",
        subtitle: "Language Should Never Be a Barrier",
        description: "हमारे AI-संचालित उपकरण जटिल शैक्षिक अवधारणाओं को सरल भाषा में अनुवाद करते हैं, जिससे गुणवत्तापूर्ण शिक्षा वास्तव में सुलभ हो जाती है।"
      },
      buttons: {
        start: "अभी सीखना शुरू करें",
        learnMore: "और जानें",
        discover: "अपना रास्ता खोजें",
        howItWorks: "यह कैसे काम करता है",
        tryTools: "अनुवाद उपकरण आज़माएं",
        viewDemo: "डेमो देखें"
      }
    },
    kannada: {
      slide1: {
        title: "ಎಲ್ಲರಿಗೂ ಶಿಕ್ಷಣ - ಯಾವುದೇ ಅಡೆತಡೆಗಳಿಲ್ಲದೆ",
        subtitle: "Education for Everyone - Without Barriers",
        description: "ವಿದ್ಯಾಸೇತು ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣದ ನಡುವಿನ ಅಂತರವನ್ನು ಹಲವಾರು ಭಾಷೆಗಳಲ್ಲಿ AI-ಆಧಾರಿತ ಕಲಿಕೆಯ ಸಾಧನಗಳ ಮೂಲಕ ಸೇತುವೆಯಾಗುತ್ತದೆ."
      },
      slide2: {
        title: "ಎಂದಿಗೂ ಕಲಿಯಲು ತಡವಾಗುವುದಿಲ್ಲ",
        subtitle: "It's Never Too Late to Learn",
        description: "ನಮ್ಮ ವೈಯಕ್ತಿಕ ಕಲಿಕೆಯ ಮಾರ್ಗಗಳು ನಿಮ್ಮ ವೇಳಾಪಟ್ಟಿ ಮತ್ತು ವೇಗಕ್ಕೆ ಹೊಂದಿಕೊಳ್ಳುತ್ತವೆ, ಎಲ್ಲಾ ಹಿನ್ನೆಲೆಯ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಶಿಕ್ಷಣವನ್ನು ಪ್ರವೇಶಿಸುವಂತೆ ಮಾಡುತ್ತದೆ."
      },
      slide3: {
        title: "ಭಾಷೆ ಅಡ್ಡಿಯಾಗಬಾರದು",
        subtitle: "Language Should Never Be a Barrier",
        description: "ನಮ್ಮ AI-ಆಧಾರಿತ ಉಪಕರಣಗಳು ಸಂಕೀರ್ಣ ಶೈಕ್ಷಣಿಕ ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಸರಳ ಭಾಷೆಗೆ ಅನುವಾದಿಸುತ್ತವೆ, ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣವನ್ನು ನಿಜವಾಗಿಯೂ ಲಭ್ಯವಾಗುವಂತೆ ಮಾಡುತ್ತವೆ."
      },
      buttons: {
        start: "ಈಗ ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಿ",
        learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
        discover: "ನಿಮ್ಮ ಮಾರ್ಗವನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ",
        howItWorks: "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
        tryTools: "ಅನುವಾದ ಉಪಕರಣಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ",
        viewDemo: "ಡೆಮೋ ವೀಕ್ಷಿಸಿ"
      }
    },
    bengali: {
      slide1: {
        title: "সবার জন্য শিক্ষা - বাধা ছাড়াই",
        subtitle: "Education for Everyone - Without Barriers",
        description: "বিদ্যাসেতু গ্রামীণ ছাত্রদের এবং মানসম্পন্ন শিক্ষার মধ্যে দূরত্ব কমায় একাধিক ভাষায় AI-চালিত শিক্ষার সরঞ্জামগুলির মাধ্যমে।"
      },
      slide2: {
        title: "শেখার জন্য কখনো দেরি হয় না",
        subtitle: "It's Never Too Late to Learn",
        description: "আমাদের ব্যক্তিগতকৃত শিক্ষার পথগুলি আপনার সময়সূচী এবং গতির সাথে মানিয়ে নেয়, সমস্ত পটভূমির শিক্ষার্থীদের জন্য শিক্ষাকে অ্যাক্সেসযোগ্য করে তোলে।"
      },
      slide3: {
        title: "ভাষা কখনো বাধা হওয়া উচিত নয়",
        subtitle: "Language Should Never Be a Barrier",
        description: "আমাদের AI-চালিত সরঞ্জামগুলি জটিল শিক্ষামূলক ধারণাগুলিকে সহজ ভাষায় অনুবাদ করে, মানসম্পন্ন শিক্ষাকে সত্যিই অ্যাক্সেসযোগ্য করে তোলে।"
      },
      buttons: {
        start: "এখনই শেখা শুরু করুন",
        learnMore: "আরও জানুন",
        discover: "আপনার পথ আবিষ্কার করুন",
        howItWorks: "এটি কীভাবে কাজ করে",
        tryTools: "অনুবাদ টুল ব্যবহার করুন",
        viewDemo: "ডেমো দেখুন"
      }
    }
  };
  
  React.useEffect(() => {
    // Auto rotate carousel every 5 seconds
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide >= 2 ? 0 : prevSlide + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update carousel position when activeSlide changes
  React.useEffect(() => {
    const carousel = document.getElementById('hero-carousel');
    if (carousel) {
      carousel.style.transform = `translateX(-${activeSlide * 100}%)`;
    }
  }, [activeSlide]);
  
  return (
    <div className="font-sans bg-gray-900 text-gray-100">
      <Navbar />
      
      {/* Hero section carousel with dark gradient background */}
      <div className="relative h-screen md:h-96 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        {/* Background image layer */}
        <div className="absolute inset-0 overflow-hidden">
          {activeSlide === 0 && (
            <img 
              src={girl} 
              alt="Rural education" 
              className="w-full h-full object-cover opacity-50"
            />
          )}
          {activeSlide === 1 && (
            <img 
              src={girl2}
              alt="Students learning" 
              className="w-full h-full object-cover opacity-50"
            />
          )}
          {activeSlide === 2 && (
            <img 
              src={teacher}
              alt="Language education" 
              className="w-full h-full object-cover opacity-50"
            />
          )}
        </div>
        
        {/* Language selector */}
        <div className="absolute top-4 right-4 z-30">
          <select 
            value={activeLanguage}
            onChange={(e) => setActiveLanguage(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="english">English</option>
            <option value="hindi">हिंदी (Hindi)</option>
            <option value="kannada">ಕನ್ನಡ (Kannada)</option>
            <option value="bengali">বাংলা (Bengali)</option>
          </select>
        </div>
        
        {/* Carousel container */}
        <div className="container mx-auto px-4 h-full relative z-10">
          <div className="carousel-container h-full">
            <div className="flex h-full transition-transform duration-700 ease-in-out transform" 
                id="hero-carousel"
                style={{transform: `translateX(-${activeSlide * 100}%)`}}>
              
              {/* Slide 1 */}
              <div className="min-w-full h-full flex flex-col justify-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {languages[activeLanguage].slide1.title}
                </h1>
                <h2 className="text-2xl md:text-3xl font-medium mb-6">
                  {languages[activeLanguage].slide1.subtitle}
                </h2>
                <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-300">
                  {languages[activeLanguage].slide1.description}
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="bg-teal-500 text-gray-900 px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-teal-400 transition btn-shine">
                    {languages[activeLanguage].buttons.start}
                  </button>
                  <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-white hover:text-gray-900 transition">
                    {languages[activeLanguage].buttons.learnMore}
                  </button>
                </div>
              </div>
              
              {/* Slide 2 */}
              <div className="min-w-full h-full flex flex-col justify-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {languages[activeLanguage].slide2.title}
                </h1>
                <h2 className="text-2xl md:text-3xl font-medium mb-6">
                  {languages[activeLanguage].slide2.subtitle}
                </h2>
                <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-300">
                  {languages[activeLanguage].slide2.description}
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="bg-teal-500 text-gray-900 px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-teal-400 transition btn-shine">
                    {languages[activeLanguage].buttons.discover}
                  </button>
                  <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-white hover:text-gray-900 transition">
                    {languages[activeLanguage].buttons.howItWorks}
                  </button>
                </div>
              </div>
              
              {/* Slide 3 */}
              <div className="min-w-full h-full flex flex-col justify-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {languages[activeLanguage].slide3.title}
                </h1>
                <h2 className="text-2xl md:text-3xl font-medium mb-6">
                  {languages[activeLanguage].slide3.subtitle}
                </h2>
                <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-300">
                  {languages[activeLanguage].slide3.description}
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="bg-teal-500 text-gray-900 px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-teal-400 transition btn-shine">
                    {languages[activeLanguage].buttons.tryTools}
                  </button>
                  <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-white hover:text-gray-900 transition">
                    {languages[activeLanguage].buttons.viewDemo}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Carousel indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-20">
          {[0, 1, 2].map((index) => (
            <button 
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeSlide === index 
                  ? "bg-white opacity-100 scale-125" 
                  : "bg-white opacity-60 hover:opacity-80"
              }`}
              id={`slide-${index}`}
            />
          ))}
        </div>
        
        {/* Arrow navigation */}
        <button 
          onClick={() => setActiveSlide((prev) => (prev <= 0 ? 2 : prev - 1))}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full z-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={() => setActiveSlide((prev) => (prev >= 2 ? 0 : prev + 1))}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 rounded-full z-20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Features section */}
      <div className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Our Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-700 rounded-xl shadow-lg p-6 hover-card-lift">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">
                AI-Powered Learning
              </h3>
              <p className="text-gray-300 text-center">
                Our intelligent tutoring system adapts to your learning style and pace, 
                providing personalized guidance in multiple languages.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-700 rounded-xl shadow-lg p-6 hover-card-lift">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">
                Textbook Scanner
              </h3>
              <p className="text-gray-300 text-center">
                Take a photo of any textbook page and get instant explanations, 
                translations, and practice questions in your language.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-700 rounded-xl shadow-lg p-6 hover-card-lift">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">
                Work Offline
              </h3>
              <p className="text-gray-300 text-center">
                Download learning materials to use when you don't have internet access. 
                Your progress syncs when you reconnect.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-700 rounded-xl shadow-lg p-6 hover-card-lift">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-yellow-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">
                Community Support
              </h3>
              <p className="text-gray-300 text-center">
                Connect with other students, teachers, and mentors from similar backgrounds 
                who understand your unique challenges.
              </p>
            </div>
          </div>
        </div>
      </div>
   
      {/* Stats Section */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-gray-800 rounded-lg shadow-sm">
              <h3 className="text-4xl font-bold text-white mb-2">25,000+</h3>
              <p className="text-teal-400 font-medium">Rural Students Supported</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-sm">
              <h3 className="text-4xl font-bold text-white mb-2">15</h3>
              <p className="text-teal-400 font-medium">Districts Reached</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-sm">
              <h3 className="text-4xl font-bold text-white mb-2">120,000+</h3>
              <p className="text-teal-400 font-medium">Hours of Learning Delivered</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-sm">
              <h3 className="text-4xl font-bold text-white mb-2">2.5M+</h3>
              <p className="text-teal-400 font-medium">Quiz Questions Answered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Story 1 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 shadow-lg transform transition hover:scale-105">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img src="/api/placeholder/300/200" alt="Student Kavitha" className="w-full object-cover" />
              </div>
              <p className="italic mb-6 text-gray-300 leading-relaxed">
                "VidyaSetu helped me prepare for my science exams when I couldn't understand 
                the textbook. The explanations in Kannada made everything clear."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mr-4 text-lg font-bold">
                  K
                </div>
                <div>
                  <p className="font-semibold text-lg">Kavitha</p>
                  <p className="text-sm text-gray-400">Grade 10, Ramanagara District</p>
                </div>
              </div>
            </div>

          {/* Story 2 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 shadow-lg transform transition hover:scale-105">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img src="/api/placeholder/300/200" alt="Student Rahul" className="w-full object-cover" />
              </div>
              <p className="italic mb-6 text-gray-300 leading-relaxed">
                "I never thought I could understand algebra, but the interactive lessons and Hindi explanations changed everything. Now I'm the top student in my class."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4 text-lg font-bold">
                  R
                </div>
                <div>
                  <p className="font-semibold text-lg">Rahul</p>
                  <p className="text-sm text-gray-400">Grade 8, Barabanki District</p>
                </div>
              </div>
            </div>

            {/* Story 3 */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 shadow-lg transform transition hover:scale-105">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img src="/api/placeholder/300/200" alt="Teacher Priya" className="w-full object-cover" />
              </div>
              <p className="italic mb-6 text-gray-300 leading-relaxed">
                "As a rural school teacher, VidyaSetu has been invaluable. I can now provide my students with high-quality learning materials in Bengali that were previously inaccessible."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mr-4 text-lg font-bold">
                  P
                </div>
                <div>
                  <p className="font-semibold text-lg">Priya Sen</p>
                  <p className="text-sm text-gray-400">Teacher, Murshidabad District</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Educational Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Resource 1 */}
            <div className="bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-48 bg-gray-600 flex items-center justify-center">
                <img src={plant} alt="Science resources" className="h-40 w-auto object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Science Learning</h3>
                <p className="text-gray-300 mb-4">
                  Interactive biology, chemistry, and physics materials with visual explanations
                  in multiple languages.
                </p>
                <button className="bg-teal-500 hover:bg-teal-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition w-full">
                  Explore Science
                </button>
              </div>
            </div>
            
            {/* Resource 2 */}
            <div className="bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-48 bg-gray-600 flex items-center justify-center">
                <img src={math} alt="Math resources" className="h-40 w-auto object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Mathematics</h3>
                <p className="text-gray-300 mb-4">
                  Simplified math concepts from basic arithmetic to advanced algebra with
                  step-by-step explanations.
                </p>
                <button className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-lg transition w-full">
                  Master Math
                </button>
              </div>
            </div>
            
            {/* Resource 3 */}
            <div className="bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-48 bg-gray-600 flex items-center justify-center">
                <img src={aryabhatta} alt="History resources" className="h-40 w-auto object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">History & Culture</h3>
                <p className="text-gray-300 mb-4">
                  Learn about India's rich history, cultural heritage, and the stories of great
                  scientists and leaders.
                </p>
                <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg transition w-full">
                  Discover History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-teal-600 to-teal-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students across rural India who are breaking educational barriers
            with VidyaSetu's AI-powered learning platform.
          </p>
          <button className="bg-white text-teal-600 px-8 py-4 rounded-lg text-xl font-bold shadow-lg hover:bg-gray-100 transition mx-2 mb-4 md:mb-0">
            Start Free Trial
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-xl font-bold shadow-lg hover:bg-white hover:text-teal-600 transition mx-2">
            Watch Demo
          </button>
        </div>
      </div>

      {/* Chatbot */}
      <div className="fixed bottom-4 right-4 z-50">
        <ChatBot />
      </div>

      <Footer />
    </div>
  );
};

export default Home;