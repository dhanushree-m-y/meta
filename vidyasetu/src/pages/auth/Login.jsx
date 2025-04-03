import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import girl from "../../assets/students/girl.png";
import girl2 from "../../assets/students/girl2.png";
import team from "../../assets/students/team.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Carousel content
  const carouselItems = [
    {
      image: girl,
      title: "ಎಲ್ಲರಿಗೂ ಶಿಕ್ಷಣ",
      subtitle: "Education for Everyone",
      quote: "VidyaSetu helped me improve my math score from 65% to 89%.",
      author: "- Raju, Mandya District"
    },
    {
      image: girl2,
      title: "AI-ಆಧಾರಿತ ಕಲಿಕೆ",
      subtitle: "AI-Powered Learning",
      quote: "The explanations in Kannada made everything clear when I couldn't understand my textbook.",
      author: "- Kavitha, Ramanagara District"
    },
    {
      image: team,
      title: "ಯಾವುದೇ ಅಡೆತಡೆಗಳಿಲ್ಲದೆ",
      subtitle: "Learning Without Barriers",
      quote: "I can study even during power outages in our village with the offline materials.",
      author: "- Lakshmi, Chitradurga District"
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    // Handle login logic here
  };
  
  return (
    <div className="font-sans min-h-screen flex flex-col bg-gray-900 text-gray-300">
      <Navbar />
      
      <main className="flex-grow bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
            {/* Image Carousel - Left Side */}
            <div className="md:w-1/2 relative bg-gray-900 hidden md:block">
              <div className="relative h-full">
                {carouselItems.map((item, index) => (
                  <div 
                    key={index} 
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-transparent z-10"></div>
                    <img src={item.image} alt={item.subtitle} className="h-full w-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                      <h2 className="text-3xl font-bold mb-1">{item.title}</h2>
                      <p className="text-xl mb-6">{item.subtitle}</p>
                      <blockquote className="border-l-4 border-teal-500 pl-4 italic">
                        <p className="mb-2">{item.quote}</p>
                        <footer className="text-sm text-gray-400">{item.author}</footer>
                      </blockquote>
                    </div>
                  </div>
                ))}
                
                {/* Carousel Indicators */}
                <div className="absolute bottom-4 right-4 flex space-x-2 z-30">
                  {carouselItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-teal-500' : 'bg-white/30'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Login Form - Right Side */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white">ಪ್ರವೇಶಿಸಿ</h1>
                <p className="text-xl text-gray-400">Welcome Back to VidyaSetu!</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-gray-300 font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-900 text-white"
                      placeholder="yourname@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-gray-300 font-medium mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-900 text-white"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-teal-500 focus:ring-teal-500 border-gray-700 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-400">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <a href="#" className="text-teal-400 hover:text-teal-500 font-medium">
                      Forgot password?
                    </a>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:from-teal-600 hover:to-teal-700 transition transform hover:scale-105"
                >
                  Sign In
                </button>
                
                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-800 text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    className="flex justify-center items-center py-2.5 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800 hover:bg-gray-700 transition"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                  </button>
                  <button 
                    type="button"
                    className="flex justify-center items-center py-2.5 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800 hover:bg-gray-700 transition"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 48 48" fill="none">
                      <path d="M24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4ZM24 40C15.178 40 8 32.822 8 24C8 15.178 15.178 8 24 8C32.822 8 40 15.178 40 24C40 32.822 32.822 40 24 40Z" fill="#0866FF"/>
                      <path d="M27.707 17.293C26.525 16.11 24.768 15.999 23.472 16.999C22.176 18 21.999 19.761 21.999 21.5V23.999H19.999C19.448 23.999 19 24.447 19 24.999C19 25.551 19.448 25.999 19.999 25.999H21.999V32.999C21.999 33.551 22.448 33.999 22.999 33.999C23.55 33.999 23.999 33.551 23.999 32.999V25.999H26.999C27.55 25.999 27.999 25.551 27.999 24.999C27.999 24.447 27.55 23.999 26.999 23.999H23.999V21.5C23.999 20.5 24.055 19.499 24.707 18.707C25.359 17.915 26.317 17.999 26.999 17.999H27.999C28.55 17.999 28.999 17.551 28.999 16.999C28.999 16.447 28.55 15.999 27.999 15.999H26.999C27 15.999 27.086 15.996 27.707 17.293Z" fill="#0866FF"/>
                    </svg>
                    Facebook
                  </button>
                </div>
              </form>
              
              <div className="mt-8 text-center">
              
                <p className="text-gray-400">
                  Don't have an account yet?{' '}
                  <Link to="/signup" className="text-teal-400 hover:text-teal-500 font-semibold">
                    Sign up for free
                  </Link>
                </p>
              </div>
              
              {/* Mobile-only testimonial carousel */}
              <div className="mt-10 md:hidden">
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="italic text-gray-300 mb-2">"{carouselItems[currentSlide].quote}"</p>
                  <p className="text-sm text-gray-500">{carouselItems[currentSlide].author}</p>
                </div>
                
                <div className="flex justify-center space-x-2 mt-2">
                  {carouselItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-teal-500' : 'bg-gray-600'}`}
                      aria-label={`Go to slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;