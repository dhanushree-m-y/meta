import React from 'react';
import { Mail, Phone, HelpCircle, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">About VidyaSetu</h3>
            <p className="text-gray-300 leading-relaxed">
              VidyaSetu is an AI-powered education platform designed specifically for rural 
              Kannada-speaking students. Our mission is to make quality education accessible 
              to every child regardless of location or connectivity challenges.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-teal-400" />
                <a href="mailto:info@vidyasetu.org" className="hover:text-white transition">
                  info@vidyasetu.org
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-teal-400" />
                <a href="tel:08012345678" className="hover:text-white transition">
                  080-1234-5678
                </a>
              </li>
              <li className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-3 text-teal-400" />
                <a href="mailto:support@vidyasetu.org" className="hover:text-white transition">
                  support@vidyasetu.org
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">Partners</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white transition cursor-pointer">
                Karnataka State Education Department
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Microsoft Azure
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Rural Education Foundation
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Digital Karnataka Initiative
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-500 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-500 transition"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-500 transition"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-500 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            
            <div className="mt-6">
              <p className="text-gray-300 text-sm">Subscribe to our newsletter:</p>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 w-full"
                />
                <button className="bg-teal-500 text-white px-4 py-2 rounded-r-md hover:bg-teal-600 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>© 2025 VidyaSetu Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;