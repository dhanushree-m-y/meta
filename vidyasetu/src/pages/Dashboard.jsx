import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import plant2 from "../assets/resources/plant2.png"
import ChatBot from '../components/Chatbot';
const Dashboard = () => {
  // Sample student data - in a real application, this would come from an API or props
  const studentData = {
    name: "Ananya",
    streakDays: 12,
    weeklyProgress: [true, true, true, true, false, true, true],
    subjects: [
      { name: "Mathematics", progress: 78 },
      { name: "Science", progress: 65 },
      { name: "Social Studies", progress: 82 },
      { name: "Language", progress: 91 }
    ],
    recommendations: [
      { title: "Understanding Photosynthesis", reason: "Based on your recent biology quiz", thumbnail:"/api/placeholder/200/120" },
      { title: "Algebraic Equations Practice", reason: "To strengthen your math skills", thumbnail: "/api/placeholder/200/120" },
      { title: "Karnataka History Quiz", reason: "Prepare for your upcoming test", thumbnail: "/api/placeholder/200/120" }
    ],
    continueLearning: {
      title: "Triangles and Their Properties",
      progress: 65,
      thumbnail: "/api/placeholder/200/120"
    },
    recentActivity: [
      { activity: "Completed \"Basic Chemistry\" quiz with score 85%", timeAgo: "Yesterday" },
      { activity: "Viewed \"Indian Constitution\" materials", timeAgo: "2 days ago" },
      { activity: "Asked 3 questions about geometry", timeAgo: "3 days ago" },
      { activity: "Participated in \"Mathematics Challenge\" forum", timeAgo: "5 days ago" }
    ],
    badges: [
      { name: "Math Master", icon: "🥇", level: "Level 2" },
      { name: "Science Explorer", icon: "🧪", level: "" },
      { name: "Consistent Learner", icon: "📚", level: "" },
      { name: "Helpful Community Member", icon: "🌟", level: "" }
    ],
    points: 3450,
    percentile: 15,
    nextAchievement: {
      name: "Young Scientist",
      task: "Complete 5 more science quizzes",
      progress: 75
    },
    learningPath: {
      currentFocus: [
        "Algebraic Equations",
        "Cellular Biology",
        "Indian History Post-Independence"
      ],
      estimatedTime: "2 weeks"
    },
    weeklyGoals: [
      { goal: "Complete 5 Math practice quizzes", progress: [false, false, false, true, true] },
      { goal: "Study Science for 3 hours", progress: [false, true, true] },
      { goal: "Help 2 classmates in the community forum", progress: [true, true] },
      { goal: "Read one chapter of History", progress: [false] }
    ]
  };

  // Function to render progress bar
  const ProgressBar = ({ progress, color = "teal" }) => (
    <div className="w-full bg-gray-700 rounded-full h-3">
      <div 
        className={`bg-${color}-500 h-3 rounded-full`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

  // Function to render week streak indicators
  const WeekStreak = ({ days }) => {
    const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    return (
      <div className="flex space-x-2 justify-center mt-2">
        {dayLabels.map((day, index) => (
          <div 
            key={day}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
              ${days[index] 
                ? 'bg-teal-500 text-gray-900' 
                : 'bg-gray-700 text-gray-400'
              }`}
          >
            {day.charAt(0)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="font-sans bg-gray-900 text-gray-300 min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                ನಮಸ್ಕಾರ, {studentData.name}!
              </h1>
              <p className="text-lg text-gray-400">
                Welcome back to your learning journey. You've been studying consistently for {studentData.streakDays} days!
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-teal-500 text-gray-900 px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-teal-600 transition transform hover:scale-105">
                Continue Learning
              </button>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Progress Overview */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Your Learning Progress</h2>
              
              <div className="space-y-4">
                {studentData.subjects.map(subject => (
                  <div key={subject.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-white">{subject.name}</span>
                      <span className="text-gray-400">{subject.progress}% complete</span>
                    </div>
                    <ProgressBar progress={subject.progress} />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-teal-400">
                <p>
                  You're making excellent progress in Language! Consider spending more time on Science this week.
                </p>
              </div>
            </div>

            {/* Recommended Content */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Personalized For You</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {studentData.recommendations.map((item, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg overflow-hidden hover:scale-105 transition transform">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-32 object-cover opacity-80" />
                    <div className="p-4">
                      <h3 className="font-bold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.reason}</p>
                      <button className="mt-2 text-teal-400 font-semibold text-sm hover:text-teal-300 transition">
                        Start Learning
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 border border-gray-700 rounded-lg bg-gray-900">
                <h3 className="font-bold text-white mb-2">Continue Where You Left Off</h3>
                <div className="flex items-center">
                  <img src={studentData.continueLearning.thumbnail} alt={studentData.continueLearning.title} className="w-20 h-16 object-cover rounded mr-4" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-300">{studentData.continueLearning.title}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-teal-500 h-2 rounded-full"
                        style={{ width: `${studentData.continueLearning.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{studentData.continueLearning.progress}% complete</p>
                  </div>
                  <button className="bg-teal-500 text-gray-900 px-4 py-2 rounded font-medium hover:bg-teal-600 transition">
                    Resume
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
              
              <div className="space-y-4">
                {studentData.recentActivity.map((item, index) => (
                  <div key={index} className="flex items-start pb-4 border-b border-gray-700">
                    <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 mr-3"></div>
                    <div className="flex-1">
                      <p className="text-gray-300">{item.activity}</p>
                      <p className="text-sm text-gray-500">{item.timeAgo}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="mt-4 text-teal-400 font-semibold hover:text-teal-300 transition flex items-center">
                View All Activity
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Weekly Study Streak */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Weekly Study Streak</h2>
              <div className="flex items-center">
                <span className="text-yellow-500 text-2xl mr-2">🔥</span>
                <p className="text-gray-300">
                  You've maintained your streak for {studentData.streakDays} days! Keep going!
                </p>
              </div>
              <WeekStreak days={studentData.weeklyProgress} />
            </div>

            {/* Next Achievement */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Next Achievement</h2>
              <div className="mb-3">
                <p className="text-gray-300">
                  Complete 5 more science quizzes to earn your "{studentData.nextAchievement.name}" badge!
                </p>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-teal-500 h-3 rounded-full"
                  style={{ width: `${studentData.nextAchievement.progress}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-400 mt-1">Progress: {studentData.nextAchievement.progress}%</p>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg p-3 text-sm font-medium transition flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Scan Textbook
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-3 text-sm font-medium transition flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Generate Quiz
                </button>
                <button className="bg-pink-600 hover:bg-pink-700 text-white rounded-lg p-3 text-sm font-medium transition flex flex-col items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Ask AI Tutor
    </button>
    <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-3 text-sm font-medium transition flex flex-col items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Download Offline
    </button>
  </div>
</div>

{/* Achievement Showcase */}
<div className="bg-gray-800 rounded-xl shadow-lg p-6">
  <h2 className="text-xl font-bold text-white mb-4">Achievement Showcase</h2>
  <div className="space-y-3">
    {studentData.badges.map((badge, index) => (
      <div key={index} className="flex items-center">
        <span className="text-2xl mr-2">{badge.icon}</span>
        <span className="text-white font-medium">{badge.name}</span>
        {badge.level && (
          <span className="ml-2 text-xs bg-gray-700 text-teal-400 px-2 py-1 rounded">
            {badge.level}
          </span>
        )}
      </div>
    ))}
  </div>
  <div className="mt-4 bg-gray-900 rounded-lg p-3 text-center">
    <p className="text-white font-medium">Points: {studentData.points.toLocaleString()}</p>
    <p className="text-sm text-gray-400">
      You're in the top {studentData.percentile}% of active learners this month!
    </p>
  </div>
</div>

{/* Weekly Goals */}
<div className="bg-gray-800 rounded-xl shadow-lg p-6">
  <h2 className="text-xl font-bold text-white mb-4">Weekly Goals</h2>
  <div className="space-y-3">
    {studentData.weeklyGoals.map((goal, index) => (
      <div key={index} className="flex items-center">
        <div className="flex-1">
          <p className="text-white">{goal.goal}</p>
          <div className="flex mt-1">
            {goal.progress.map((completed, i) => (
              <div 
                key={i}
                className={`w-5 h-5 mr-1 rounded border ${completed 
                  ? 'bg-teal-500 border-teal-600 text-gray-900' 
                  : 'bg-gray-700 border-gray-600'}`}
              >
                {completed && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 m-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
  <div className="flex space-x-2 mt-4">
    <button className="flex-1 text-teal-400 border border-teal-500 px-3 py-2 rounded font-medium hover:bg-gray-700 transition text-sm">
      Adjust Goals
    </button>
    <button className="flex-1 bg-teal-500 text-gray-900 px-3 py-2 rounded font-medium hover:bg-teal-600 transition text-sm">
      Set New Goals
    </button>
  </div>
</div>

{/* Learning Path */}
<div className="bg-gray-800 rounded-xl shadow-lg p-6">
  <h2 className="text-xl font-bold text-white mb-4">Learning Path</h2>
  <div className="relative pb-4">
    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>
    <div className="relative flex items-center mb-4">
      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center z-10 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="bg-gray-900 rounded px-3 py-2 flex-1">
        <p className="text-sm text-gray-400">Past Milestones</p>
      </div>
    </div>
    <div className="relative flex items-center mb-4">
      <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center z-10 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="bg-gray-900 rounded px-3 py-2 flex-1">
        <p className="text-sm font-medium text-white">Current Focus</p>
        <div className="mt-2 space-y-1">
          {studentData.learningPath.currentFocus.map((focus, index) => (
            <p key={index} className="text-sm text-gray-400">• {focus}</p>
          ))}
        </div>
      </div>
    </div>
    <div className="relative flex items-center">
      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center z-10 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
      <div className="bg-gray-900 rounded px-3 py-2 flex-1">
        <p className="text-sm text-gray-400">Upcoming Goals</p>
      </div>
    </div>
  </div>
  <div className="mt-2 text-sm text-center text-teal-400">
    Estimated time to reach next milestone: {studentData.learningPath.estimatedTime}
  </div>
  <button className="w-full mt-4 text-teal-400 border border-teal-500 px-4 py-2 rounded font-medium hover:bg-gray-700 transition">
    View Detailed Path
  </button>
</div>
</div>
</div>
</div>
<ChatBot/>
<Footer />
</div>
);
};

export default Dashboard;