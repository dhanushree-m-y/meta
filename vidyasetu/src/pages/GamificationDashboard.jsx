import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ChatBot from '../components/Chatbot';

const GamificationDashboard = () => {
  // Sample data - in a real app, this would come from an API
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: "Aditya Sharma", 
      avatar: "/api/placeholder/40/40",
      points: 2450, 
      streak: 15,
      level: 8,
      badges: ["Quick Learner", "Math Wizard", "10-Day Streak", "First Quiz Perfect"]
    },
    { 
      id: 2, 
      name: "Kavitha B", 
      avatar: "/api/placeholder/40/40",
      points: 3120, 
      streak: 21,
      level: 10,
      badges: ["Science Champion", "Class Topper", "20-Day Streak", "100 Questions Answered"]
    },
    { 
      id: 3, 
      name: "Rahul M", 
      avatar: "/api/placeholder/40/40",
      points: 1980, 
      streak: 8,
      level: 6,
      badges: ["History Buff", "Creative Writer", "5-Day Streak"]
    },
    { 
      id: 4, 
      name: "Priya Desai", 
      avatar: "/api/placeholder/40/40",
      points: 2740, 
      streak: 18,
      level: 9,
      badges: ["Language Expert", "Perfect Attendance", "15-Day Streak", "First Quiz Perfect"]
    },
    { 
      id: 5, 
      name: "Suresh Kumar", 
      avatar: "/api/placeholder/40/40",
      points: 1650, 
      streak: 5,
      level: 5,
      badges: ["Quick Learner", "Team Player", "5-Day Streak"]
    }
  ]);

  // Sample available badges
  const availableBadges = [
    { name: "Quick Learner", icon: "🚀", description: "Complete 5 lessons in a single day" },
    { name: "Math Wizard", icon: "🧮", description: "Score 95% or higher on 3 math quizzes" },
    { name: "Science Champion", icon: "🔬", description: "Complete all science modules with distinction" },
    { name: "History Buff", icon: "📜", description: "Answer 50 history questions correctly" },
    { name: "Language Expert", icon: "🔤", description: "Achieve perfect scores in 3 language tests" },
    { name: "Creative Writer", icon: "✍️", description: "Submit 5 essays rated 'Excellent'" },
    { name: "Team Player", icon: "👥", description: "Help 10 classmates in the forums" },
    { name: "Class Topper", icon: "🏆", description: "Rank #1 in your class for a week" },
    { name: "Perfect Attendance", icon: "📅", description: "Log in every school day for a month" },
    { name: "5-Day Streak", icon: "🔥", description: "Study for 5 consecutive days" },
    { name: "10-Day Streak", icon: "🔥", description: "Study for 10 consecutive days" },
    { name: "15-Day Streak", icon: "🔥", description: "Study for 15 consecutive days" },
    { name: "20-Day Streak", icon: "🔥", description: "Study for 20 consecutive days" },
    { name: "First Quiz Perfect", icon: "💯", description: "Score 100% on your first quiz" },
    { name: "100 Questions Answered", icon: "❓", description: "Answer 100 practice questions" }
  ];

  const [activeTab, setActiveTab] = useState('leaderboard');

  // Calculate level progress (for progress bar)
  const calculateProgress = (level) => {
    // Simple formula: random progress between 10%-90% for demo purposes
    return Math.floor(Math.random() * 80) + 10;
  };

  // Get badge details by name
  const getBadgeDetails = (badgeName) => {
    return availableBadges.find(badge => badge.name === badgeName) || { 
      name: badgeName, 
      icon: "🏅", 
      description: "Complete special challenges" 
    };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <Navbar/>
     

      {/* Student Profile Summary */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center text-3xl font-bold">
                {students[1].level}
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <div>
                  <h2 className="text-xl font-bold">{students[1].name}</h2>
                  <p className="text-teal-400">Level {students[1].level} Scholar</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="bg-teal-500 px-3 py-1 rounded-full text-sm font-semibold">
                    {students[1].points} Points
                  </span>
                  <span className="ml-2 bg-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                    🔥 {students[1].streak} Day Streak
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-1">Next Level: {calculateProgress(students[1].level)}% Complete</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-teal-500 h-2.5 rounded-full" 
                    style={{ width: `${calculateProgress(students[1].level)}%` }}>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {students[1].badges.slice(0, 4).map((badge, index) => {
                  const badgeDetails = getBadgeDetails(badge);
                  return (
                    <span 
                      key={index} 
                      className="bg-gray-700 px-2 py-1 rounded text-xs flex items-center" 
                      title={badgeDetails.description}
                    >
                      <span className="mr-1">{badgeDetails.icon}</span> {badge}
                    </span>
                  );
                })}
                {students[1].badges.length > 4 && (
                  <span className="bg-gray-700 px-2 py-1 rounded text-xs">
                    +{students[1].badges.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'leaderboard'
                ? 'text-teal-400 border-b-2 border-teal-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('leaderboard')}
          >
            Leaderboard
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'badges'
                ? 'text-teal-400 border-b-2 border-teal-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('badges')}
          >
            Badges
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'challenges'
                ? 'text-teal-400 border-b-2 border-teal-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('challenges')}
          >
            Challenges
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'leaderboard' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Class Leaderboard</h2>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="px-4 py-3 text-left">Rank</th>
                    <th className="px-4 py-3 text-left">Student</th>
                    <th className="px-4 py-3 text-right">Level</th>
                    <th className="px-4 py-3 text-right">Points</th>
                    <th className="px-4 py-3 text-right">Streak</th>
                  </tr>
                </thead>
                <tbody>
                  {students
                    .sort((a, b) => b.points - a.points)
                    .map((student, index) => (
                      <tr 
                        key={student.id} 
                        className={`border-t border-gray-700 ${index === 1 ? 'bg-gray-700 bg-opacity-30' : ''}`}
                      >
                        <td className="px-4 py-3">
                          {index === 0 ? (
                            <span className="text-yellow-400 font-bold">🥇 1st</span>
                          ) : index === 1 ? (
                            <span className="text-gray-400 font-bold">🥈 2nd</span>
                          ) : index === 2 ? (
                            <span className="text-yellow-700 font-bold">🥉 3rd</span>
                          ) : (
                            <span className="text-gray-400">{index + 1}th</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <img 
                              src={student.avatar} 
                              alt={student.name} 
                              className="w-8 h-8 rounded-full mr-3" 
                            />
                            <span>{student.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="bg-gray-700 px-2 py-1 rounded-full text-xs">
                            Lvl {student.level}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-teal-400">
                          {student.points}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-orange-400">🔥 {student.streak}</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Badges</h2>
              <span className="text-sm text-gray-400">
                {students[1].badges.length} of {availableBadges.length} badges earned
              </span>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-3 text-teal-400">Earned Badges</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {students[1].badges.map((badge, index) => {
                  const badgeDetails = getBadgeDetails(badge);
                  return (
                    <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center mb-2">
                        <span className="text-3xl mr-3">{badgeDetails.icon}</span>
                        <span className="font-medium">{badge}</span>
                      </div>
                      <p className="text-sm text-gray-400">{badgeDetails.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 text-gray-400">Badges to Earn</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableBadges
                  .filter(badge => !students[1].badges.includes(badge.name))
                  .map((badge, index) => (
                    <div key={index} className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700 opacity-60">
                      <div className="flex items-center mb-2">
                        <span className="text-3xl mr-3 grayscale">{badge.icon}</span>
                        <span className="font-medium">{badge.name}</span>
                      </div>
                      <p className="text-sm text-gray-400">{badge.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Weekly Challenges</h2>
            
            <div className="bg-gradient-to-br from-teal-900 to-teal-800 rounded-lg p-4 mb-6 border border-teal-700">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wide bg-teal-700 px-2 py-1 rounded">Active Challenge</span>
                  <h3 className="text-lg font-bold mt-2">Science Week Special</h3>
                  <p className="text-sm text-gray-300 mt-1">Complete all science quizzes with 90% or higher</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-300">300</div>
                  <div className="text-xs text-teal-300">bonus points</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress: 2/5 quizzes completed</span>
                  <span>40%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-teal-400 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div className="mt-4 text-right">
                <button className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded text-sm font-medium">
                  Go to Science Quizzes
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">Daily Login</h3>
                    <p className="text-sm text-gray-400 mt-1">Log in for 7 consecutive days</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-teal-400">50</div>
                    <div className="text-xs text-gray-400">points / day</div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <div 
                        key={day} 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                          day <= students[1].streak % 7 ? 'bg-teal-500' : 'bg-gray-700'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <button className="text-teal-400 text-sm">Claim</button>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">Math Challenge</h3>
                    <p className="text-sm text-gray-400 mt-1">Complete 20 algebra problems</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-teal-400">200</div>
                    <div className="text-xs text-gray-400">points</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress: 8/20 problems</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">Help a Friend</h3>
                    <p className="text-sm text-gray-400 mt-1">Answer 5 questions in the forums</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-teal-400">150</div>
                    <div className="text-xs text-gray-400">points</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress: 2/5 questions</span>
                    <span>40%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">Language Master</h3>
                    <p className="text-sm text-gray-400 mt-1">Learn 50 new Kannada words</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-teal-400">250</div>
                    <div className="text-xs text-gray-400">points</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress: 32/50 words</span>
                    <span>64%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '64%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ChatBot/>
      <Footer/>
    </div>
  );
};

export default GamificationDashboard;