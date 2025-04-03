import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import girl from "../../assets/students/girl.png";
import girl2 from "../../assets/students/girl2.png";
import team from "../../assets/students/team.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    district: '',
    grade: '',
    school: '',
    villageOrTown: '',
    taluk: '',
    isRural: true,
    transportMode: '',
    distanceToSchool: '',
    hasInternet: false,
    internetAccessType: '',
    familyOccupation: '',
    agreeTerms: false
  });
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3; // Updated to 3 steps
  
  // Carousel content
  const carouselItems = [
    {
      image: girl,
      title: "ಯಶಸ್ವಿ ಕಥೆಗಳು",
      subtitle: "Success Stories",
      description: "Join over 25,000 rural students across 15 districts who have improved their educational outcomes with VidyaSetu."
    },
    {
      image:girl2,
      title: "ಗುಣಮಟ್ಟದ ಸಂಪನ್ಮೂಲಗಳು",
      subtitle: "Quality Resources",
      description: "Access thousands of educational resources in Kannada, specially designed for rural students."
    },
    {
      image: team,
      title: "ಆಫ್‌ಲೈನ್ ಅಧ್ಯಯನ",
      subtitle: "Offline Learning",
      description: "Download materials and continue learning even without internet, perfect for rural connectivity challenges."
    }
  ];
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', formData);
    // Handle signup logic here
  };
  
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gradient-to-br from-indigo-50 via-purple-50 to-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
            {/* Image Carousel - Left Side */}
            <div className="md:w-1/2 relative bg-indigo-900 hidden md:block">
              {/* Carousel */}
              <div className="relative h-full">
                {carouselItems.map((item, index) => (
                  <div 
                    key={index} 
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-indigo-900/70 to-transparent z-10"></div>
                    <img src={item.image} alt={item.subtitle} className="h-full w-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                      <h2 className="text-3xl font-bold mb-1">{item.title}</h2>
                      <p className="text-xl mb-4">{item.subtitle}</p>
                      <p className="text-gray-200">{item.description}</p>
                    </div>
                  </div>
                ))}
                
                {/* Carousel Indicators */}
                <div className="absolute bottom-4 right-4 flex space-x-2 z-30">
                  {carouselItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-yellow-400' : 'bg-white/50'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Signup Form - Right Side */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-indigo-900 mb-1">ನೋಂದಣಿ ಮಾಡಿ</h1>
                <p className="text-xl text-gray-600">Create Your VidyaSetu Account</p>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
              
              <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                        placeholder="ನಿಮ್ಮ ಹೆಸರು / Your Full Name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                        placeholder="yourname@example.com"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-105"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="district" className="block text-gray-700 font-medium mb-2">District</label>
                      <select
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                        required
                      >
                        <option value="">Select your district</option>
                        <option value="Ramanagara">Ramanagara</option>
                        <option value="Mandya">Mandya</option>
                        <option value="Chitradurga">Chitradurga</option>
                        <option value="Mysuru">Mysuru</option>
                        <option value="Tumakuru">Tumakuru</option>
                        <option value="Hassan">Hassan</option>
                        <option value="Bengaluru Rural">Bengaluru Rural</option>
                        <option value="Kolar">Kolar</option>
                        <option value="Chikkaballapura">Chikkaballapura</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="taluk" className="block text-gray-700 font-medium mb-2">Taluk</label>
                      <input
                        type="text"
                        id="taluk"
                        name="taluk"
                        value={formData.taluk}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                        placeholder="ತಾಲೂಕು / Taluk Name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="villageOrTown" className="block text-gray-700 font-medium mb-2">Village/Town</label>
                      <input
                        type="text"
                        id="villageOrTown"
                        name="villageOrTown"
                        value={formData.villageOrTown}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                        placeholder="ಹಳ್ಳಿ/ಪಟ್ಟಣ / Village or Town"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="isRural" className="block text-gray-700 font-medium mb-2">Location Type</label>
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="isRuralYes"
                            name="isRural"
                            checked={formData.isRural === true}
                            onChange={() => setFormData({...formData, isRural: true})}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <label htmlFor="isRuralYes" className="ml-2 text-gray-700">
                            Rural (ಗ್ರಾಮೀಣ)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="isRuralNo"
                            name="isRural"
                            checked={formData.isRural === false}
                            onChange={() => setFormData({...formData, isRural: false})}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <label htmlFor="isRuralNo" className="ml-2 text-gray-700">
                            Urban (ನಗರ)
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="sm:w-1/3 bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="sm:w-2/3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-105"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="grade" className="block text-gray-700 font-medium mb-2">Grade</label>
                      <select
                        id="grade"
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                        required
                      >
                        <option value="">Select your grade</option>
                        <option value="6">Grade 6</option>
                        <option value="7">Grade 7</option>
                        <option value="8">Grade 8</option>
                        <option value="9">Grade 9</option>
                        <option value="10">Grade 10</option>
                        <option value="11">Grade 11</option>
                        <option value="12">Grade 12</option>
                        <option value="teacher">Teacher</option>
                        <option value="parent">Parent</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="school" className="block text-gray-700 font-medium mb-2">School Name</label>
                      <input
                        type="text"
                        id="school"
                        name="school"
                        value={formData.school}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                        placeholder="ಶಾಲೆ ಹೆಸರು / School Name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="distanceToSchool" className="block text-gray-700 font-medium mb-2">Distance to School (km)</label>
                      <input
                        type="number"
                        id="distanceToSchool"
                        name="distanceToSchool"
                        value={formData.distanceToSchool}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                        placeholder="ಶಾಲೆಯ ದೂರ / Distance in kilometers"
                        min="0"
                        step="0.5"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="transportMode" className="block text-gray-700 font-medium mb-2">Mode of Transport to School</label>
                      <select
                        id="transportMode"
                        name="transportMode"
                        value={formData.transportMode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                      >
                        <option value="">ಶಾಲೆಗೆ ಹೋಗುವ ವಿಧಾನ / Select transport mode</option>
                        <option value="walking">Walking (ನಡೆಯುವುದರ ಮೂಲಕ)</option>
                        <option value="bicycle">Bicycle (ಸೈಕಲ್)</option>
                        <option value="publicBus">Public Bus (ಸಾರ್ವಜನಿಕ ಬಸ್)</option>
                        <option value="schoolBus">School Bus (ಶಾಲಾ ಬಸ್)</option>
                        <option value="autoRickshaw">Auto-rickshaw (ಆಟೋ)</option>
                        <option value="other">Other (ಇತರೆ)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="hasInternet" className="block text-gray-700 font-medium mb-2">Internet Access at Home</label>
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="hasInternetYes"
                            name="hasInternet"
                            checked={formData.hasInternet === true}
                            onChange={() => setFormData({...formData, hasInternet: true})}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <label htmlFor="hasInternetYes" className="ml-2 text-gray-700">
                            Yes (ಹೌದು)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="hasInternetNo"
                            name="hasInternet"
                            checked={formData.hasInternet === false}
                            onChange={() => setFormData({...formData, hasInternet: false})}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          />
                          <label htmlFor="hasInternetNo" className="ml-2 text-gray-700">
                            No (ಇಲ್ಲ)
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {formData.hasInternet && (
                      <div>
                        <label htmlFor="internetAccessType" className="block text-gray-700 font-medium mb-2">Type of Internet Access</label>
                        <select
                          id="internetAccessType"
                          name="internetAccessType"
                          value={formData.internetAccessType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                        >
                          <option value="">ಇಂಟರ್ನೆಟ್ ಪ್ರವೇಶದ ಪ್ರಕಾರ / Select internet type</option>
                          <option value="mobileData">Mobile Data (ಮೊಬೈಲ್ ಡೇಟಾ)</option>
                          <option value="broadband">Broadband (ಬ್ರಾಡ್‌ಬ್ಯಾಂಡ್)</option>
                          <option value="dialup">Dial-up (ಡಯಲ್-ಅಪ್)</option>
                          <option value="satellite">Satellite (ಉಪಗ್ರಹ)</option>
                          <option value="other">Other (ಇತರೆ)</option>
                        </select>
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="familyOccupation" className="block text-gray-700 font-medium mb-2">Family's Primary Occupation</label>
                      <select
                        id="familyOccupation"
                        name="familyOccupation"
                        value={formData.familyOccupation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                      >
                        <option value="">ಕುಟುಂಬದ ಪ್ರಾಥಮಿಕ ಉದ್ಯೋಗ / Select occupation</option>
                        <option value="farming">Farming/Agriculture (ಕೃಷಿ)</option>
                        <option value="laborWork">Labor Work (ಕೂಲಿ ಕೆಲಸ)</option>
                        <option value="government">Government Service (ಸರ್ಕಾರಿ ಸೇವೆ)</option>
                        <option value="business">Small Business (ಸಣ್ಣ ವ್ಯಾಪಾರ)</option>
                        <option value="teaching">Teaching (ಶಿಕ್ಷಣ)</option>
                        <option value="other">Other (ಇತರೆ)</option>
                      </select>
                    </div>
                    
                    <div className="flex items-start mt-4">
                      <div className="flex items-center h-5">
                        <input
                          id="agreeTerms"
                          name="agreeTerms"
                          type="checkbox"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="agreeTerms" className="text-gray-600">
                          I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-800">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-800">Privacy Policy</a>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="sm:w-1/3 bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="sm:w-2/3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-105"
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                )}
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;