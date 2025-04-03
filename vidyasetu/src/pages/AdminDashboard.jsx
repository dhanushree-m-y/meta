import React, { useState } from 'react';
import ChatBot from '../components/Chatbot';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, BarChart, Bar, ComposedChart, Area 
} from 'recharts';
import { 
  Users, Book, Target, Award, Video, Globe, 
  UserCheck, BookOpen, Trophy, MessageCircle 
} from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  // Comprehensive Data Sets
  const userGrowthData = [
    { month: 'Jan', totalUsers: 5000, newUsers: 1200, activeUsers: 3500, retentionRate: 70 },
    { month: 'Feb', totalUsers: 5800, newUsers: 1500, activeUsers: 4200, retentionRate: 75 },
    { month: 'Mar', totalUsers: 6500, newUsers: 1800, activeUsers: 4800, retentionRate: 80 }
  ];

  const subjectPerformanceData = [
    { subject: 'Mathematics', avgScore: 85, quizzesTaken: 5000, improvementRate: 15 },
    { subject: 'Science', avgScore: 78, quizzesTaken: 4500, improvementRate: 12 },
    { subject: 'Social Studies', avgScore: 72, quizzesTaken: 3800, improvementRate: 10 },
    { subject: 'Language', avgScore: 90, quizzesTaken: 6000, improvementRate: 18 }
  ];

  const userDistributionData = [
    { name: 'Grade 7-8', users: 1500, avgEngagement: 65 },
    { name: 'Grade 9-10', users: 2000, avgEngagement: 75 },
    { name: 'Grade 11-12', users: 1000, avgEngagement: 80 }
  ];

  const communityAnalyticsData = [
    { category: 'Forum Posts', count: 1200 },
    { category: 'Study Groups', count: 35 },
    { category: 'Peer Tutoring', count: 250 },
    { category: 'Teacher Interactions', count: 500 }
  ];

  const contentAnalyticsData = [
    { type: 'Video Tutorials', count: 120, views: 50000 },
    { type: 'Interactive Quizzes', count: 500, attempts: 75000 },
    { type: 'Study Materials', count: 250, downloads: 40000 },
    { type: 'Virtual Labs', count: 50, sessions: 15000 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
        <Navbar/>
      <h1 className="text-4xl font-bold mb-8 text-teal-400">VidyaSetu Advanced Analytics</h1>
      
      {/* Top-Level KPIs */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg flex items-center shadow-lg hover:bg-gray-700 transition">
          <Users className="text-teal-500 mr-4" size={48} />
          <div>
            <h3 className="text-gray-300 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-white">6,500</p>
            <p className="text-teal-400 text-sm">+38% this month</p>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg flex items-center shadow-lg hover:bg-gray-700 transition">
          <BookOpen className="text-teal-500 mr-4" size={48} />
          <div>
            <h3 className="text-gray-300 mb-2">Learning Hours</h3>
            <p className="text-3xl font-bold text-white">120,000+</p>
            <p className="text-teal-400 text-sm">Avg. 4.5 hrs/user</p>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg flex items-center shadow-lg hover:bg-gray-700 transition">
          <Trophy className="text-teal-500 mr-4" size={48} />
          <div>
            <h3 className="text-gray-300 mb-2">Quiz Completions</h3>
            <p className="text-3xl font-bold text-white">2.5M+</p>
            <p className="text-teal-400 text-sm">85% completion rate</p>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg flex items-center shadow-lg hover:bg-gray-700 transition">
          <Globe className="text-teal-500 mr-4" size={48} />
          <div>
            <h3 className="text-gray-300 mb-2">Districts Reached</h3>
            <p className="text-3xl font-bold text-white">15</p>
            <p className="text-teal-400 text-sm">3 new districts this quarter</p>
          </div>
        </div>
      </div>

      {/* Advanced Analytics Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* User Growth and Engagement */}
        <div className="bg-gray-800 p-6 rounded-lg col-span-2 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-teal-400">User Growth & Engagement</h2>
          <ComposedChart width={700} height={300} data={userGrowthData}>
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
            <Legend />
            <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
            <Line type="monotone" dataKey="totalUsers" stroke="#0088FE" name="Total Users" />
            <Line type="monotone" dataKey="activeUsers" stroke="#00C49F" name="Active Users" />
            <Area type="monotone" dataKey="retentionRate" stroke="#FFBB28" fill="#FFBB28" fillOpacity={0.3} name="Retention Rate" />
          </ComposedChart>
        </div>

        {/* Subject Performance */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-teal-400">Subject Performance</h2>
          <BarChart width={400} height={300} data={subjectPerformanceData}>
            <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
            <XAxis dataKey="subject" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
            <Bar dataKey="avgScore" fill="#0088FE" name="Avg Score" />
            <Bar dataKey="improvementRate" fill="#00C49F" name="Improvement %" />
          </BarChart>
        </div>

        {/* User Distribution */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-teal-400">User Distribution by Grade</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={userDistributionData}
              cx={200}
              cy={150}
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="users"
            >
              {userDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name, props) => [
                value, 
                `${props.payload.name} (Avg Engagement: ${props.payload.avgEngagement}%)`
              ]}
              contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} 
            />
            <Legend />
          </PieChart>
        </div>

        {/* Community Analytics */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-teal-400">Community Engagement</h2>
          <div className="space-y-4">
            {communityAnalyticsData.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <MessageCircle className="mr-3 text-teal-500" size={24} />
                  <span className="text-gray-300">{item.category}</span>
                </div>
                <span className="text-white font-bold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Analytics */}
        <div className="bg-gray-800 p-6 rounded-lg col-span-2 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-teal-400">Content Utilization</h2>
          <div className="grid grid-cols-2 gap-4">
            {contentAnalyticsData.map((item, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">{item.type}</span>
                  <span className="text-teal-400 font-bold">{item.count} Items</span>
                </div>
                <div className="text-white">
                  {Object.keys(item)
                    .filter(key => key !== 'type' && key !== 'count')
                    .map(key => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-400 capitalize">{key}</span>
                        <span>{item[key].toLocaleString()}</span>
                      </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ChatBot/>
      <Footer/>
    </div>
  );
};

export default AdminDashboard;