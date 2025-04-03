import React, { useState } from 'react';
import math from "../assets/resources/math.png"
import math2 from "../assets/resources/math2.png"
import grammar from "../assets/resources/grammar.png"
import history from "../assets/resources/history.png"
import chem from "../assets/resources/chemistry.png"
import python from "../assets/resources/python.png"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatBot from '../components/Chatbot';

const StudyMaterials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');

  const subjects = ['All', 'Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer Science'];
  const grades = ['All', 'Grade 1-5', 'Grade 6-8', 'Grade 9-10', 'Grade 11-12'];

  const studyMaterials = [
    {
      id: 1,
      title: 'Algebra Fundamentals',
      subject: 'Mathematics',
      grade: 'Grade 9-10',
      type: 'Notes',
      author: 'Prof. Sharma',
      downloads: 2345,
      thumbnail: math,
      date: '15 Feb 2025'
    },
    {
      id: 2,
      title: 'Chemistry Revision Guide',
      subject: 'Science',
      grade: 'Grade 11-12',
      type: 'PDF',
      author: 'Dr. Patel',
      downloads: 1872,
      thumbnail: chem,
      date: '10 Feb 2025'
    },
    {
      id: 3,
      title: 'English Grammar Workbook',
      subject: 'English',
      grade: 'Grade 6-8',
      type: 'Workbook',
      author: 'Mrs. Gupta',
      downloads: 3150,
      thumbnail: grammar,
      date: '28 Jan 2025'
    },
    {
      id: 4,
      title: 'Physics Formula Sheet',
      subject: 'Science',
      grade: 'Grade 11-12',
      type: 'Cheatsheet',
      author: 'Prof. Verma',
      downloads: 4215,
      thumbnail: math2,
      date: '05 Feb 2025'
    },
    {
      id: 5,
      title: 'Indian History Timeline',
      subject: 'Social Studies',
      grade: 'Grade 9-10',
      type: 'Infographic',
      author: 'Dr. Sen',
      downloads: 1456,
      thumbnail: history,
      date: '22 Jan 2025'
    },
    {
      id: 6,
      title: 'Python Programming Basics',
      subject: 'Computer Science',
      grade: 'Grade 9-10',
      type: 'Tutorial',
      author: 'Mr. Kumar',
      downloads: 2789,
      thumbnail: python,
      date: '12 Feb 2025'
    },
    {
      id: 7,
      title: 'Hindi Vyakaran Notes',
      subject: 'Hindi',
      grade: 'Grade 6-8',
      type: 'Notes',
      author: 'Mrs. Sharma',
      downloads: 1234,
      thumbnail: '/api/placeholder/240/135',
      date: '08 Feb 2025'
    },
    {
      id: 8,
      title: 'Trigonometry Practice Problems',
      subject: 'Mathematics',
      grade: 'Grade 11-12',
      type: 'Worksheet',
      author: 'Dr. Iyer',
      downloads: 2567,
      thumbnail: math2,
      date: '01 Feb 2025'
    }
  ];

  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        material.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || material.subject === selectedSubject;
    const matchesGrade = selectedGrade === 'All' || material.grade === selectedGrade;
    
    return matchesSearch && matchesSubject && matchesGrade;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
     <Navbar/>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Study Materials Library</h1>
          <p className="text-xl mb-8 text-gray-400">Access high-quality learning resources created by top educators across India</p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg flex">
            <input
              type="text"
              placeholder="Search by title, subject, or author..."
              className="flex-grow px-6 py-4 bg-gray-800 text-white focus:outline-none placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-4 font-medium">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="col-span-1">
            <label className="block text-gray-300 font-medium mb-2">Filter by Subject</label>
            <select 
              className="w-full p-3 bg-gray-800 border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-teal-500"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map(subject => (
                <option key={subject} value={subject} className="bg-gray-800">{subject}</option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-300 font-medium mb-2">Filter by Grade</label>
            <select 
              className="w-full p-3 bg-gray-800 border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-teal-500"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
            >
              {grades.map(grade => (
                <option key={grade} value={grade} className="bg-gray-800">{grade}</option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-300 font-medium mb-2">Sort By</label>
            <select className="w-full p-3 bg-gray-800 border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-teal-500">
              <option className="bg-gray-800">Most Recent</option>
              <option className="bg-gray-800">Most Popular</option>
              <option className="bg-gray-800">Title (A-Z)</option>
              <option className="bg-gray-800">Title (Z-A)</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-300 font-medium mb-2">Material Type</label>
            <select className="w-full p-3 bg-gray-800 border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-teal-500">
              <option className="bg-gray-800">All Types</option>
              <option className="bg-gray-800">Notes</option>
              <option className="bg-gray-800">PDFs</option>
              <option className="bg-gray-800">Worksheets</option>
              <option className="bg-gray-800">Infographics</option>
              <option className="bg-gray-800">Practice Tests</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400 font-medium">Showing {filteredMaterials.length} of {studyMaterials.length} materials</p>
        </div>

        {/* Study Materials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMaterials.map(material => (
            <div key={material.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img 
                src={material.thumbnail} 
                alt={material.title} 
                className="w-full h-40 object-cover object-center"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-teal-400 bg-opacity-20 text-teal-400 text-xs px-2 py-1 rounded font-semibold">{material.subject}</span>
                  <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded font-semibold">{material.type}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{material.title}</h3>
                <p className="text-gray-400 mb-2">{material.grade}</p>
                <p className="text-gray-500 text-sm mb-3">By {material.author}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{material.downloads} downloads</span>
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium">
            Load More Materials
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">Why Use VidyaSetu's Study Materials?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-teal-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Expert-Created Content</h3>
              <p className="text-gray-400">All materials are created by experienced educators and subject experts from across India.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Aligned with Curriculum</h3>
              <p className="text-gray-400">Materials follow CBSE, ICSE, and state board curricula to ensure relevance to your studies.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-indigo-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-0H10a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path>
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Diverse Formats</h3>
              <p className="text-gray-400">Access notes, practice tests, worksheets, infographics, and more to suit your learning style.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contribution CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Are You an Educator?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-400">Share your knowledge and expertise with students across India. Contribute your study materials to our growing library.</p>
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-bold text-lg">
            Become a Contributor
          </button>
        </div>
      </div>
      <ChatBot/>
     <Footer/>
    </div>
  );
};

export default StudyMaterials;