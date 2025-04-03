import React, { useState } from 'react';
import Footer from '../components/Footer';

const ResourceCenter = () => {
  
  const [activeTab, setActiveTab] = useState('offline');
  const [calculatorType, setCalculatorType] = useState('basic');
  
  const tabs = [
    { id: 'offline', label: 'Offline Materials', icon: '📚' },
    { id: 'videos', label: 'Video Tutorials', icon: '🎬' },
    { id: 'external', label: 'External Resources', icon: '🌐' },
    { id: 'tools', label: 'Academic Tools', icon: '🧮' }
  ];

  const renderCalculator = () => {
    if (calculatorType === 'basic') {
      return (
        <div className="bg-gray-800 rounded-lg shadow-sm p-4 flex flex-col">
          <div className="bg-gray-700 p-3 rounded-lg text-right mb-2 text-white">0</div>
          <div className="grid grid-cols-4 gap-2">
            {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
              <button key={btn} className="p-2 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-teal-500 transition-colors">
                {btn}
              </button>
            ))}
          </div>
        </div>
      );
    } else if (calculatorType === 'scientific') {
      return (
        <div className="bg-gray-800 rounded-lg shadow-sm p-4 h-64 flex items-center justify-center">
          <p className="text-gray-400">Scientific Calculator Placeholder</p>
        </div>
      );
    } else {
      return (
        <div className="bg-gray-800 rounded-lg shadow-sm p-4 h-64 flex items-center justify-center">
          <p className="text-gray-400">Graphing Calculator Placeholder</p>
        </div>
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Resource Center</h1>
        <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 shadow-sm">
          <span className="text-teal-400 mr-2">🔍</span>
          <input 
            type="text" 
            placeholder="Search resources..." 
            className="bg-transparent border-none outline-none text-sm text-gray-300"
          />
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto mb-8 pb-2 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-6 py-3 rounded-full font-medium mr-3 transition-all ${
              activeTab === tab.id 
                ? 'bg-teal-500 text-white shadow-md transform scale-105' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Offline Materials */}
      {activeTab === 'offline' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-5">
              <h2 className="text-2xl font-bold text-white">Offline Downloadable Materials</h2>
              <p className="text-gray-400">Download once, learn anytime - even without internet</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Download Packages</h3>
                  <span className="text-xs bg-teal-400 text-gray-900 px-3 py-1 rounded-full">Updated Weekly</span>
                </div>
                
                <ul className="space-y-4">
                  {[
                    { name: 'Mathematics Package', size: '45MB', icon: '🔢', color: 'bg-blue-600', progress: 75 },
                    { name: 'Science Package', size: '60MB', icon: '🧪', color: 'bg-green-600', progress: 60 },
                    { name: 'Social Studies Package', size: '35MB', icon: '🌍', color: 'bg-yellow-600', progress: 90 },
                    { name: 'Language Arts Package', size: '30MB', icon: '📝', color: 'bg-pink-600', progress: 80 }
                  ].map((pkg) => (
                    <li key={pkg.name} className="bg-gray-700 rounded-lg p-4 flex items-start gap-4 transition-transform hover:transform hover:scale-102">
                      <div className={`w-12 h-12 ${pkg.color} rounded-lg flex items-center justify-center text-white text-2xl`}>
                        {pkg.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-white">{pkg.name}</h4>
                          <span className="text-sm text-gray-400">{pkg.size}</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                          <div className={`h-2 rounded-full ${pkg.color}`} style={{ width: `${pkg.progress}%` }}></div>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-gray-400">Downloaded by 1.2k users</span>
                          <span className="text-xs text-gray-400">{pkg.progress}% popular</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <img 
                  src="/api/placeholder/500/300" 
                  alt="Students using offline materials" 
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                
                <div className="bg-gray-800 p-5 rounded-lg">
                  <div className="flex items-center mb-4">
                    <span className="text-amber-500 text-xl mr-2">💡</span>
                    <h3 className="text-lg font-semibold text-white">Did You Know?</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-4">All packages include interactive quizzes, solved examples, and practice problems that work completely offline!</p>
                  
                  <div className="bg-gray-700 p-4 rounded-lg shadow-sm mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Est. download time on 2G:</span>
                      <span className="font-medium text-white">3-5 minutes</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Storage required:</span>
                      <span className="font-medium text-white">45MB</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>Valid for:</span>
                      <span className="font-medium text-white">60 days</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors flex items-center justify-center">
                      <span className="mr-2">⬇️</span>
                      Download Now
                    </button>
                    <button className="flex-1 px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center">
                      <span className="mr-2">🌙</span>
                      Schedule Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    {/* Video Tutorials */}
{activeTab === 'videos' && (
  <div className="space-y-6 bg-gray-900 min-h-screen">
    <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-5">
        <h2 className="text-2xl font-bold text-white">Video Tutorial Library</h2>
        <p className="text-gray-400">Visual learning with multiple bandwidth options</p>
      </div>
      
      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="relative aspect-video bg-gray-700 rounded-lg overflow-hidden shadow-lg mb-3">
              <img 
                src="/api/placeholder/640/360" 
                alt="Video thumbnail" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-teal-500 bg-opacity-90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-teal-600 transition-all">
                  <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white font-bold">Introduction to Algebraic Equations</h3>
                <p className="text-gray-300 text-sm">Learn the fundamentals of solving equations</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-xs bg-teal-400 text-gray-900 px-2 py-1 rounded-full mr-2">Low Bandwidth</span>
                <span className="text-xs text-gray-400">15MB</span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600">Download</button>
                <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600">Watch Online</button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-5 rounded-lg">
            <div className="flex items-center mb-4">
              <span className="text-teal-400 text-xl mr-2">🎓</span>
              <h3 className="text-lg font-semibold text-white">Popular Videos</h3>
            </div>
            
            <ul className="space-y-3">
              {[
                { name: 'Basic Algebra', views: '2.4k', duration: '18:24' },
                { name: 'Geometry Concepts', views: '1.8k', duration: '22:10' },
                { name: 'Number Systems', views: '1.5k', duration: '15:42' },
                { name: 'Basic Physics', views: '3.1k', duration: '24:36' },
                { name: 'Human Body Systems', views: '2.7k', duration: '27:53' }
              ].map((video, idx) => (
                <li key={idx} className="bg-gray-700 p-3 rounded-lg shadow-md flex items-center gap-3 cursor-pointer hover:bg-gray-600 transition-colors">
                  <span className="text-teal-400 font-bold">{idx + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-white">{video.name}</p>
                    <div className="flex items-center text-xs text-gray-400">
                      <span className="mr-2">{video.views} views</span>
                      <span>{video.duration}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-yellow-900 bg-opacity-20 p-4 rounded-lg border border-yellow-800 mb-6 flex gap-4 items-center">
          <span className="text-yellow-500 text-2xl">📋</span>
          <div>
            <h4 className="font-medium text-yellow-300 mb-1">All videos include:</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span className="text-sm text-gray-300 flex items-center"><span className="text-yellow-500 mr-1">•</span> Kannada subtitles</span>
              <span className="text-sm text-gray-300 flex items-center"><span className="text-yellow-500 mr-1">•</span> Downloadable transcripts</span>
              <span className="text-sm text-gray-300 flex items-center"><span className="text-yellow-500 mr-1">•</span> Key point markers</span>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-4">Science Tutorials</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'Basic Physics', thumbnail: '/api/placeholder/320/180', duration: '20:45' },
            { name: 'Human Body Systems', thumbnail: '/api/placeholder/320/180', duration: '25:18' },
            { name: 'Plant Biology', thumbnail: '/api/placeholder/320/180', duration: '18:32' }
          ].map((video, idx) => (
            <div key={idx} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="relative">
                <img src={video.thumbnail} alt={video.name} className="w-full h-36 object-cover" />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-white mb-2">{video.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Low: 20MB | High: 50MB</span>
                  <button className="text-xs px-2 py-1 bg-teal-500 text-white rounded hover:bg-teal-600">
                    Watch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}
                    
     {/* External Resources */}
{activeTab === 'external' && (
  <div className="space-y-6 bg-gray-900 min-h-screen">
    <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-5">
        <h2 className="text-2xl font-bold text-white">External Educational Resources</h2>
        <p className="text-gray-400">Curated from the best educational sources</p>
      </div>
      
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                <span className="text-teal-400 text-xl">🏛️</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Government Resources</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Karnataka State Education Portal', desc: 'Official state curriculum and resources', bandwidth: 'Low' },
                { name: 'National Digital Library', desc: 'Extensive collection of books and materials', bandwidth: 'Medium' },
                { name: 'NCERT Digital Books', desc: 'Standard textbooks in digital format', bandwidth: 'Low' }
              ].map((resource, idx) => (
                <a 
                  key={idx} 
                  href="#"
                  className="block bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-teal-500 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-white">{resource.name}</h4>
                      <p className="text-sm text-gray-400 mt-1">{resource.desc}</p>
                    </div>
                    <span className="text-xs bg-teal-500 bg-opacity-20 text-teal-400 px-2 py-1 rounded-full">{resource.bandwidth}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                <span className="text-teal-400 text-xl">🌐</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Free Learning Websites</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Khan Academy', desc: 'Video lessons on various subjects', bandwidth: 'Medium', rating: 4.8 },
                { name: 'GeoGebra Math Tools', desc: 'Interactive math visualizations', bandwidth: 'Low', rating: 4.6 },
                { name: 'PhET Interactive Simulations', desc: 'Science and math simulations', bandwidth: 'Medium', rating: 4.7 }
              ].map((resource, idx) => (
                <a 
                  key={idx} 
                  href="#"
                  className="block bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-teal-500 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-white">{resource.name}</h4>
                      <p className="text-sm text-gray-400 mt-1">{resource.desc}</p>
                      <div className="flex items-center mt-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-yellow-400 text-xs">
                              {star <= Math.floor(resource.rating) ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">{resource.rating}/5</span>
                      </div>
                    </div>
                    <span className="text-xs bg-teal-500 bg-opacity-20 text-teal-400 px-2 py-1 rounded-full">{resource.bandwidth}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 opacity-50 rounded-lg"></div>
          <img 
            src="/api/placeholder/1200/200" 
            alt="Educational resources" 
            className="w-full h-40 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
            <h3 className="text-2xl font-bold mb-2 drop-shadow">Access Karnataka's Best Learning Resources</h3>
            <p className="mb-4 max-w-2xl drop-shadow text-gray-300">Curated collections of high-quality educational materials, optimized for low-bandwidth connections</p>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors">
                Browse All Resources
              </button>
              <button className="px-6 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg font-medium hover:bg-gray-600 transition-colors">
                Request New Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

      
     
{/* Academic Tools */}
{activeTab === 'tools' && (
  <div className="space-y-6 bg-gray-900 min-h-screen">
    <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-5">
        <h2 className="text-2xl font-bold text-white">Academic Tools</h2>
        <p className="text-gray-400">Powerful learning assistants that work offline</p>
      </div>
      
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Calculator</h3>
              <div className="flex rounded-lg overflow-hidden border border-gray-700">
                {[
                  { type: 'basic', label: 'Basic' },
                  { type: 'scientific', label: 'Scientific' },
                  { type: 'graphing', label: 'Graphing' }
                ].map((calc) => (
                  <button 
                    key={calc.type}
                    onClick={() => setCalculatorType(calc.type)}
                    className={`px-3 py-1 text-sm ${
                      calculatorType === calc.type 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {calc.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              {renderCalculator()}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Formula Solver</h3>
              <span className="text-xs bg-teal-500 bg-opacity-20 text-teal-400 px-2 py-1 rounded-full">Works Offline</span>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-3">Enter a formula or equation to solve:</p>
              <div className="flex gap-2 mb-3">
                <input 
                  type="text" 
                  placeholder="e.g., 2x + 5 = 15" 
                  className="flex-1 p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:border-teal-500"
                />
                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                  Solve
                </button>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-300">Result:</span>
                  <span className="text-xs text-gray-500">Step-by-step solution available</span>
                </div>
                <p className="text-center py-3 text-lg font-medium text-white">x = 5</p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium text-gray-300 mb-2">Recently Solved:</h4>
                <div className="space-y-2">
                  {['3x - 7 = 14', 'x² - 4 = 0', 'log₁₀(x) = 2', '5x + 2y = 10; 3x - y = 5'].map((formula, idx) => (
                    <div key={idx} className="bg-gray-700 px-3 py-2 rounded border border-gray-600 text-sm flex justify-between">
                      <span className="text-gray-300">{formula}</span>
                      <button className="text-teal-400 hover:text-teal-500">Solve again</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-4">Quick Tools</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { name: 'Graph Generator', icon: '📊', desc: 'Create visual data representations' },
            { name: 'Citation Tool', icon: '📑', desc: 'Generate proper academic citations' },
            { name: 'Note Organizer', icon: '📔', desc: 'Structure your study notes effectively' },
            { name: 'Study Schedule', icon: '⏱️', desc: 'Plan your study time efficiently' }
          ].map((tool, idx) => (
            <div key={idx} className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-teal-500 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-3 mx-auto">
                <span className="text-2xl text-teal-400">{tool.icon}</span>
              </div>
              <h4 className="font-medium text-white text-center mb-1">{tool.name}</h4>
              <p className="text-xs text-gray-400 text-center mb-3">{tool.desc}</p>
              <button className="w-full text-xs px-3 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors">
                Open Tool
              </button>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-teal-500 rounded-lg flex items-center justify-center text-white text-2xl">
              ✨
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">VidyaSetu AI Assistant</h3>
              <p className="text-gray-300 mb-3">Get personalized help with any academic question. Works in Kannada and English languages.</p>
              <div className="bg-gray-700 p-3 rounded-lg border border-gray-600 flex gap-2 mb-4">
                <input 
                  type="text" 
                  placeholder="Ask your academic question..."
                  className="flex-1 border-none outline-none text-sm bg-gray-700 text-white"
                />
                <button className="px-3 py-1 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600">
                  Ask AI
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">How do I solve quadratic equations?</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">Explain photosynthesis</span>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded-full text-gray-300">Who wrote Hamlet?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
      )}
      
      <Footer/>
    </div>
  );
};



export default ResourceCenter;