import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand Name */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-2xl">VidyaSetu</span>
            <span className="hidden sm:flex ml-2 text-xs bg-gray-800 text-teal-400 px-2 py-1 rounded-full">
              ವಿದ್ಯಾಸೇತು
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="font-medium text-gray-300 hover:text-white transition">Home</Link>
            <Link to="/dashboard" className="font-medium text-gray-300 hover:text-white transition">Dashboard</Link>
            <Link to="/materials" className="font-medium text-gray-300 hover:text-white transition">Materials</Link>
            <Link to="/quizapp" className="font-medium text-gray-300 hover:text-white transition">AI Quiz</Link>
            <Link to="/resourcecenter" className="font-medium text-gray-300 hover:text-white transition">Tools</Link>
            <Link to="/communityforum" className="font-medium text-gray-300 hover:text-white transition">Community</Link>
            <Link to="/events" className="font-medium text-gray-300 hover:text-white transition">Events</Link>
            <Link to="/game" className="font-medium text-gray-300 hover:text-white transition">Leaderboard</Link>
          </div>

          {/* Login/Register Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-gray-800 text-teal-400 px-4 py-2 rounded-md font-medium shadow-sm hover:bg-gray-700 transition btn-shine">
              Login
            </button>
            <button className="bg-teal-500 text-white px-4 py-2 rounded-md font-medium shadow-sm hover:bg-teal-600 transition btn-shine">
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="font-medium text-gray-300 hover:text-white transition">Home</Link>
              <Link to="/dashboard" className="font-medium text-gray-300 hover:text-white transition">Dashboard</Link>
              <Link to="/materials" className="font-medium text-gray-300 hover:text-white transition">Materials</Link>
              <Link to="/quizapp" className="font-medium text-gray-300 hover:text-white transition">AI Quiz</Link>
              <Link to="/resource-center" className="font-medium text-gray-300 hover:text-white transition">Tools</Link>
              <Link to="/community" className="font-medium text-gray-300 hover:text-white transition">Community</Link>
              <Link to="/game" className="font-medium text-gray-300 hover:text-white transition">Leaderboard</Link>

              <div className="flex space-x-4 pt-4">
  <Link to="/login">
    <button className="bg-gray-800 text-teal-400 px-4 py-2 rounded-md font-medium shadow-sm hover:bg-gray-700 transition btn-shine">
      Login
    </button>
  </Link>
  <Link to="/signup">
    <button className="bg-teal-500 text-white px-4 py-2 rounded-md font-medium shadow-sm hover:bg-teal-600 transition btn-shine">
      Register
    </button>
  </Link>
</div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;