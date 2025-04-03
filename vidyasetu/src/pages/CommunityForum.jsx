import React, { useState } from 'react';
import ChatBot from '../components/Chatbot';
import Footer from '../components/Footer';
const CommunityForum = () => {
  const [activeTab, setActiveTab] = useState('categories');
  
  const categories = [
    'Mathematics Help',
    'Science Corner',
    'Language & Literature',
    'General Studies',
    'Exam Preparation',
    'Technical Support',
   
  ];
  
  const topQuestions = [
    { title: 'How do I solve quadratic equations efficiently?', answers: 5, activity: 'Yesterday' },
    { title: 'What are the key events of Karnataka\'s unification?', answers: 8, activity: '3 days ago' },
    { title: 'Tips for English grammar improvement?', answers: 12, activity: '1 week ago' }
  ];
  
  const studyGroups = [
    { name: 'Math Problem Solvers', members: 8 },
    { name: 'Science Exploration Team', members: 6 },
    { name: 'English Practice Group', members: 11 }
  ];
  
  const recentQuestions = [
    'Calculate the area of an equilateral triangle with side 6cm',
    'Explain the difference between weather and climate',
    'Name the major rivers of Karnataka and their origins'
  ];
  
  const topContributors = [
    { name: 'Ramesh K.', questions: 85 },
    { name: 'Sushma T.', questions: 67 },
    { name: 'Arun M.', questions: 54 }
  ];

  // New color scheme based on https://coolors.co/palette/7400b8-6930c3-5e60ce-5390d9-4ea8de-48bfe3-56cfe1-64dfdf-72efdd-80ffdb
  const colors = {
    darkPurple: '#7400B8',
    purple: '#6930C3',
    indigo: '#5E60CE',
    blue: '#5390D9',
    lightBlue: '#4EA8DE',
    skyBlue: '#48BFE3',
    cyan: '#56CFE1',
    teal: '#64DFDF',
    mint: '#72EFDD',
    paleGreen: '#80FFDB',
    darkBg: '#1F1F1F',
    mediumBg: '#2A2A2A',
    lightBg: '#363636'
  };

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: colors.darkBg, color: '#F5F5F5' }}>
      <header className="mb-6">
        <h1 className="text-3xl font-bold" style={{ 
          background: `linear-gradient(to right, ${colors.purple}, ${colors.teal})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          VidyaSetu Community Forum
        </h1>
        <p className="mt-2">Connect, learn, and grow with students and educators across Karnataka</p>
      </header>
      
      <nav className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab('categories')}
            className="px-4 py-2 rounded"
            style={{ 
              backgroundColor: activeTab === 'categories' ? colors.purple : colors.mediumBg,
              color: activeTab === 'categories' ? 'white' : '#F5F5F5'
            }}
          >
            Forum Categories
          </button>
          <button 
            onClick={() => setActiveTab('questions')}
            className="px-4 py-2 rounded"
            style={{ 
              backgroundColor: activeTab === 'questions' ? colors.indigo : colors.mediumBg,
              color: activeTab === 'questions' ? 'white' : '#F5F5F5'
            }}
          >
            Q&A Section
          </button>
          <button 
            onClick={() => setActiveTab('studyBuddy')}
            className="px-4 py-2 rounded"
            style={{ 
              backgroundColor: activeTab === 'studyBuddy' ? colors.blue : colors.mediumBg,
              color: activeTab === 'studyBuddy' ? 'white' : '#F5F5F5'
            }}
          >
            Peer-to-Peer Help
          </button>
          <button 
            onClick={() => setActiveTab('discussions')}
            className="px-4 py-2 rounded"
            style={{ 
              backgroundColor: activeTab === 'discussions' ? colors.lightBlue : colors.mediumBg,
              color: activeTab === 'discussions' ? 'white' : '#F5F5F5'
            }}
          >
            Teacher Discussions
          </button>
       
        </div>
      </nav>
      
      <main className="rounded-lg p-4" style={{ backgroundColor: colors.mediumBg }}>
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold" style={{ color: colors.purple }}>Forum Categories</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 rounded text-white" style={{ backgroundColor: colors.purple }}>Create New Topic</button>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search Forums" 
                    className="px-4 py-2 rounded focus:outline-none"
                    style={{ backgroundColor: colors.lightBg }}
                  />
                  <svg className="w-5 h-5 absolute right-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg hover:opacity-90 transition cursor-pointer"
                  style={{ 
                    backgroundColor: [colors.purple, colors.indigo, colors.blue, colors.lightBlue, 
                                     colors.skyBlue, colors.cyan, colors.teal, colors.mint][index % 8]
                  }}
                >
                  <h3 className="font-medium text-white">{category}</h3>
                  <p className="text-sm mt-2 text-white opacity-90">Join discussions on {category.toLowerCase()}</p>
                  <div className="mt-3 text-xs text-white opacity-80">
                    {Math.floor(Math.random() * 100) + 10} topics • {Math.floor(Math.random() * 1000) + 100} posts
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'questions' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: colors.indigo }}>Question & Answer Section</h2>
            
            <div className="p-4 rounded-lg" style={{ backgroundColor: colors.lightBg }}>
              <h3 className="font-medium mb-3">Ask a Question</h3>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Question Title" 
                  className="w-full px-4 py-2 rounded focus:outline-none focus:ring-2"
                  style={{ backgroundColor: colors.darkBg, focusRing: colors.indigo }}
                />
                <textarea 
                  placeholder="Question Details" 
                  className="w-full px-4 py-2 rounded focus:outline-none focus:ring-2 h-24"
                  style={{ backgroundColor: colors.darkBg, focusRing: colors.indigo }}
                ></textarea>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 rounded text-sm flex items-center" style={{ backgroundColor: colors.darkBg }}>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Add Image
                  </button>
                  <button className="px-3 py-1 rounded text-sm flex items-center" style={{ backgroundColor: colors.darkBg }}>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Add Tags
                  </button>
                  <button className="px-4 py-1 rounded text-sm ml-auto text-white" style={{ backgroundColor: colors.indigo }}>
                    Post Question
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Top Questions</h3>
                <button className="text-sm hover:opacity-80" style={{ color: colors.indigo }}>Browse All Questions</button>
              </div>
              <div className="space-y-3">
                {topQuestions.map((question, index) => (
                  <div 
                    key={index} 
                    className="p-3 rounded-lg hover:opacity-90 transition cursor-pointer" 
                    style={{ backgroundColor: colors.lightBg }}
                  >
                    <h4 className="font-medium" style={{ color: colors.indigo }}>{question.title}</h4>
                    <div className="flex text-sm text-gray-400 mt-2">
                      <span>{question.answers} answers</span>
                      <span className="mx-2">•</span>
                      <span>Last activity: {question.activity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'studyBuddy' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: colors.blue }}>Peer-to-Peer Help</h2>
            
            <div className="p-4 rounded-lg" style={{ backgroundColor: colors.lightBg }}>
              <h3 className="font-medium mb-3">Find a Study Buddy</h3>
              <p className="text-sm mb-4">Connect with peers who are studying the same subjects</p>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">Your Skills:</label>
                  <select 
                    className="w-full px-4 py-2 rounded focus:outline-none focus:ring-2"
                    style={{ backgroundColor: colors.darkBg, focusRing: colors.blue }}
                  >
                    <option>Select Subjects</option>
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>Social Studies</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm mb-1">Need Help With:</label>
                  <select 
                    className="w-full px-4 py-2 rounded focus:outline-none focus:ring-2"
                    style={{ backgroundColor: colors.darkBg, focusRing: colors.blue }}
                  >
                    <option>Select Subjects</option>
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>Social Studies</option>
                  </select>
                </div>
                
                <div className="flex space-x-2">
                  <button className="px-4 py-2 rounded text-white" style={{ backgroundColor: colors.blue }}>Find Matches</button>
                  <button className="px-4 py-2 rounded text-white" style={{ backgroundColor: colors.teal }}>Create Study Group</button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Active Study Groups:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {studyGroups.map((group, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: [colors.blue, colors.lightBlue, colors.skyBlue][index % 3] }}
                  >
                    <h4 className="font-medium text-white">{group.name}</h4>
                    <p className="text-sm mt-1 text-white opacity-80">{group.members} members</p>
                    <button 
                      className="mt-3 px-3 py-1 rounded text-sm"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      Join Group
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-center">
                <button className="px-4 py-2 rounded mr-2 text-white" style={{ backgroundColor: colors.blue }}>
                  Join a Group
                </button>
                <button className="px-4 py-2 rounded" style={{ backgroundColor: colors.lightBg }}>
                  Schedule Study Session
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'discussions' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold" style={{ color: colors.lightBlue }}>Teacher-Moderated Discussions</h2>
            
            <div className="p-4 rounded-lg" style={{ backgroundColor: colors.lightBg }}>
              <div className="p-px rounded-lg" style={{ 
                background: `linear-gradient(to right, ${colors.lightBlue}, ${colors.cyan})`,
              }}>
                <div className="p-4 rounded-lg" style={{ backgroundColor: colors.darkBg }}>
                  <h3 className="font-bold text-lg">This Week's Topic:</h3>
                  <p className="font-medium" style={{ color: colors.lightBlue }}>"Preparing for Science Board Exams: Practical Tips"</p>
                  <p className="text-sm mt-1">Moderated by: Mr. Venkatesh, Science Teacher</p>
                  
                  <h4 className="font-medium mt-4 mb-2">Join the discussion to:</h4>
                  <ul className="space-y-1 text-sm list-disc list-inside">
                    <li>Get expert advice on focusing your studies</li>
                    <li>Learn effective memory techniques</li>
                    <li>Understand commonly tested concepts</li>
                    <li>Practice with sample questions</li>
                  </ul>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="px-4 py-2 rounded text-white" style={{ backgroundColor: colors.lightBlue }}>
                      Join Discussion
                    </button>
                    <button className="px-4 py-2 rounded" style={{ backgroundColor: colors.lightBg }}>
                      View Archive
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
       
        
      </main>
      
      <ChatBot/>
      <Footer/>
    </div>
  );
};

export default CommunityForum;