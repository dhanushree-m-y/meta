import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import './App.css';
import Dashboard from './pages/Dashboard';
import StudyMaterials from './pages/StudyMaterials';
import Quiz from './pages/Quiz';
import TextToSpeech from './pages/TextToSpeech';
import Events from './pages/Events';
import CommunityForum from './pages/CommunityForum';
import ResourceCenter from './pages/ResourceCenter';
// import Auth from './pages/auth/Auth';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import QuizApp from './pages/QuizApp';
import AdminDashboard from './pages/AdminDashboard';
import GamificationDashboard from './pages/GamificationDashboard';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
         
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/materials" element={<StudyMaterials />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/texttospeech" element={<TextToSpeech />} />
            <Route path="/events" element={<Events/>} />
            <Route path="/communityforum" element={<CommunityForum/>} />
            <Route path="/resourcecenter" element={<ResourceCenter/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/quizapp" element={<QuizApp />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/game" element={<GamificationDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;