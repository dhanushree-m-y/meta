import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Chart, registerables } from 'chart.js';
import ChatBot from '../components/Chatbot';
Chart.register(...registerables);

const Quiz = () => {
  // Quiz generator form state
  const [quizSettings, setQuizSettings] = useState({
    subject: '',
    topic: '',
    difficulty: 'Intermediate',
    questionCount: 10,
    quizFocus: 'General Review',
    questionTypes: ['Multiple Choice'],
    language: 'English'
  });
  
  // Quiz state
  const [quizState, setQuizState] = useState({
    isGenerating: false,
    isStarted: false,
    isCompleted: false,
    currentQuestionIndex: 0,
    timeRemaining: 0,
    hintsRemaining: 3,
    questions: [],
    userAnswers: [],
    score: 0
  });
  
  // Performance tracking state
  const [performanceHistory, setPerformanceHistory] = useState([]);
  const [strengthsWeaknesses, setStrengthsWeaknesses] = useState({});
  
  // OCR and AI integration state
  const [ocrState, setOcrState] = useState({
    isProcessing: false,
    extractedText: '',
    generatedQuestions: []
  });

  // File upload ref
  const fileInputRef = useRef(null);
  
  // Chart refs
  const performanceChartRef = useRef(null);
  const topicsChartRef = useRef(null);
  
  // Timer ref
  const timerRef = useRef(null);
  
  // Handle quiz settings change
  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setQuizSettings(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle question type selection
  const handleQuestionTypeToggle = (type) => {
    setQuizSettings(prev => {
      const currentTypes = [...prev.questionTypes];
      if (currentTypes.includes(type)) {
        return { ...prev, questionTypes: currentTypes.filter(t => t !== type) };
      } else {
        return { ...prev, questionTypes: [...currentTypes, type] };
      }
    });
  };
  
  // Generate quiz questions
  const generateQuiz = () => {
    setQuizState(prev => ({ ...prev, isGenerating: true }));
    
    // Simulate API call to generate questions
    setTimeout(() => {
      const dummyQuestions = Array(parseInt(quizSettings.questionCount)).fill().map((_, i) => ({
        id: i,
        type: quizSettings.questionTypes[Math.floor(Math.random() * quizSettings.questionTypes.length)],
        questionText: {
          en: `Sample question ${i+1} for ${quizSettings.topic} (${quizSettings.difficulty})`,
          kn: `ಮಾದರಿ ಪ್ರಶ್ನೆ ${i+1} ${quizSettings.topic} (${quizSettings.difficulty})`
        },
        options: ['Option A', 'Option B', 'Option C', 'Option D'].map(opt => ({
          en: `${opt} for question ${i+1}`,
          kn: `ಪ್ರಶ್ನೆ ${i+1} ಗಾಗಿ ${opt}`
        })),
        correctAnswer: Math.floor(Math.random() * 4),
        hint: {
          en: `This is a hint for question ${i+1}`,
          kn: `ಪ್ರಶ್ನೆ ${i+1} ಗಾಗಿ ಸುಳಿವು`
        },
        explanation: {
          en: `Detailed explanation for question ${i+1}`,
          kn: `ಪ್ರಶ್ನೆ ${i+1} ಗಾಗಿ ವಿವರವಾದ ವಿವರಣೆ`
        }
      }));
      
      setQuizState(prev => ({
        ...prev,
        isGenerating: false,
        questions: dummyQuestions,
        userAnswers: Array(dummyQuestions.length).fill(null),
        timeRemaining: dummyQuestions.length * 30, // 30 seconds per question
      }));
    }, 1500);
  };
  
  // Start quiz
  const startQuiz = () => {
    setQuizState(prev => ({ ...prev, isStarted: true }));
    
    // Start timer
    timerRef.current = setInterval(() => {
      setQuizState(prev => {
        if (prev.timeRemaining <= 1) {
          clearInterval(timerRef.current);
          return { ...prev, timeRemaining: 0, isCompleted: true };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);
  };
  
  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    const newUserAnswers = [...quizState.userAnswers];
    newUserAnswers[quizState.currentQuestionIndex] = answerIndex;
    setQuizState(prev => ({ ...prev, userAnswers: newUserAnswers }));
  };
  
  // Navigate to next question
  const goToNextQuestion = () => {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
    }
  };
  
  // Navigate to previous question
  const goToPrevQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }));
    }
  };
  
  // Use a hint
  const useHint = () => {
    if (quizState.hintsRemaining > 0) {
      setQuizState(prev => ({ ...prev, hintsRemaining: prev.hintsRemaining - 1 }));
    }
  };
  
  // Complete quiz and calculate results
  const completeQuiz = () => {
    clearInterval(timerRef.current);
    
    // Calculate score
    let correctCount = 0;
    quizState.questions.forEach((question, index) => {
      if (quizState.userAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / quizState.questions.length) * 100);
    
    // Update quiz state
    setQuizState(prev => ({ ...prev, isCompleted: true, score }));
    
    // Update performance history
    const newQuizRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      subject: quizSettings.subject,
      topic: quizSettings.topic,
      difficulty: quizSettings.difficulty,
      score,
      timeUsed: quizSettings.questionCount * 30 - quizState.timeRemaining
    };
    
    setPerformanceHistory(prev => [...prev, newQuizRecord]);
    
    // Update strengths and weaknesses
    setStrengthsWeaknesses(prev => {
      const updated = { ...prev };
      if (!updated[quizSettings.topic]) {
        updated[quizSettings.topic] = {
          attempts: 1,
          avgScore: score
        };
      } else {
        const current = updated[quizSettings.topic];
        updated[quizSettings.topic] = {
          attempts: current.attempts + 1,
          avgScore: Math.round((current.avgScore * current.attempts + score) / (current.attempts + 1))
        };
      }
      return updated;
    });
    
    // Update charts
    updateCharts();
  };
  
  // Handle OCR image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setOcrState(prev => ({ ...prev, isProcessing: true }));
    
    // Simulate OCR processing
    setTimeout(() => {
      setOcrState(prev => ({
        ...prev,
        isProcessing: false,
        extractedText: "Sample extracted text from the uploaded image. This would normally be processed by Azure OCR and then analyzed by OpenAI to generate relevant questions.",
        generatedQuestions: [
          "What is the main concept described in the text?",
          "How does this concept relate to the wider subject?",
          "Explain the process mentioned in the text."
        ]
      }));
    }, 2000);
  };
  
  // Generate quiz from OCR text
  const generateQuizFromOCR = () => {
    setQuizSettings(prev => ({
      ...prev,
      topic: "OCR Generated",
      questionCount: ocrState.generatedQuestions.length
    }));
    
    setOcrState(prev => ({ ...prev, isProcessing: true }));
    
    // Simulate API call
    setTimeout(() => {
      const ocrQuestions = ocrState.generatedQuestions.map((q, i) => ({
        id: i,
        type: "Multiple Choice",
        questionText: {
          en: q,
          kn: `ಕನ್ನಡದಲ್ಲಿ ${q}`
        },
        options: ['Option A', 'Option B', 'Option C', 'Option D'].map(opt => ({
          en: `${opt} for OCR question ${i+1}`,
          kn: `OCR ಪ್ರಶ್ನೆ ${i+1} ಗಾಗಿ ${opt}`
        })),
        correctAnswer: Math.floor(Math.random() * 4),
        hint: {
          en: `This is a hint for OCR question ${i+1}`,
          kn: `OCR ಪ್ರಶ್ನೆ ${i+1} ಗಾಗಿ ಸುಳಿವು`
        },
        explanation: {
          en: `Detailed explanation for OCR question ${i+1}`,
          kn: `OCR ಪ್ರಶ್ನೆ ${i+1} ಗಾಗಿ ವಿವರವಾದ ವಿವರಣೆ`
        }
      }));
      
      setQuizState(prev => ({
        ...prev,
        questions: ocrQuestions,
        userAnswers: Array(ocrQuestions.length).fill(null),
        timeRemaining: ocrQuestions.length * 30,
        isGenerating: false
      }));
      
      setOcrState(prev => ({ ...prev, isProcessing: false }));
    }, 1500);
  };
  
  // Reset quiz
  const resetQuiz = () => {
    clearInterval(timerRef.current);
    setQuizState({
      isGenerating: false,
      isStarted: false,
      isCompleted: false,
      currentQuestionIndex: 0,
      timeRemaining: 0,
      hintsRemaining: 3,
      questions: [],
      userAnswers: [],
      score: 0
    });
  };
  
  // Generate shareable link
  const generateShareableLink = () => {
    // In a real app, this would generate a unique URL
    return `https://vidyasetu.org/shared-quiz/${Date.now()}`;
  };
  
  // Share quiz via WhatsApp
  const shareViaWhatsApp = () => {
    const text = `Check out my quiz on ${quizSettings.topic}! I scored ${quizState.score}%. Try it yourself: ${generateShareableLink()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };
  
  // Share quiz via Email
  const shareViaEmail = () => {
    const subject = `VidyaSetu Quiz: ${quizSettings.topic}`;
    const body = `I completed a quiz on ${quizSettings.topic} and scored ${quizState.score}%! Try it yourself: ${generateShareableLink()}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  // Share with teacher
  const shareWithTeacher = () => {
    alert("Quiz results have been shared with your teacher!");
  };
  
  // Generate certificate
  const generateCertificate = () => {
    alert("Certificate generated! Downloading...");
  };
  
  // Toggle voice reading
  const toggleVoiceReading = () => {
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const lang = quizSettings.language.toLowerCase() === 'english' ? 'en' : 'kn';
    const text = currentQuestion.questionText[lang];
    
    // Using the Web Speech API for simplicity
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'en' ? 'en-US' : 'kn-IN';
    window.speechSynthesis.speak(utterance);
  };
  
  // Initialize and update charts
  const initCharts = () => {
    if (performanceChartRef.current && performanceHistory.length > 0) {
      const ctx = performanceChartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: performanceHistory.map(record => record.date),
          datasets: [{
            label: 'Quiz Scores (%)',
            data: performanceHistory.map(record => record.score),
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            borderColor: 'rgba(79, 70, 229, 1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }
    
    if (topicsChartRef.current && Object.keys(strengthsWeaknesses).length > 0) {
      const ctx = topicsChartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(strengthsWeaknesses),
          datasets: [{
            label: 'Average Score (%)',
            data: Object.values(strengthsWeaknesses).map(v => v.avgScore),
            backgroundColor: Object.values(strengthsWeaknesses).map(v => 
              v.avgScore >= 80 ? 'rgba(52, 211, 153, 0.8)' : 
              v.avgScore >= 60 ? 'rgba(251, 191, 36, 0.8)' : 
              'rgba(239, 68, 68, 0.8)'
            )
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }
  };
  
  const updateCharts = () => {
    // Destroy previous charts before re-initializing
    setTimeout(() => {
      initCharts();
    }, 100);
  };
  
  // Initialize charts on first render
  useEffect(() => {
    // Add dummy data for demonstration
    if (performanceHistory.length === 0) {
      setPerformanceHistory([
        { id: 1, date: '2025-01-10', subject: 'Mathematics', topic: 'Algebra', difficulty: 'Intermediate', score: 75, timeUsed: 240 },
        { id: 2, date: '2025-01-15', subject: 'Science', topic: 'Physics', difficulty: 'Basic', score: 85, timeUsed: 220 },
        { id: 3, date: '2025-01-20', subject: 'Mathematics', topic: 'Geometry', difficulty: 'Advanced', score: 65, timeUsed: 300 },
        { id: 4, date: '2025-02-05', subject: 'Mathematics', topic: 'Algebra', difficulty: 'Intermediate', score: 80, timeUsed: 200 }
      ]);
      
      setStrengthsWeaknesses({
        'Algebra': { attempts: 2, avgScore: 78 },
        'Geometry': { attempts: 1, avgScore: 65 },
        'Physics': { attempts: 1, avgScore: 85 },
        'Chemistry': { attempts: 1, avgScore: 90 },
        'Biology': { attempts: 2, avgScore: 72 }
      });
    }
    
    setTimeout(() => {
      initCharts();
    }, 500);
    
    // Cleanup
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-indigo-50 py-8">
        <div className="container mx-auto px-4">
          {/* Quiz Generator Section */}
          {!quizState.questions.length && !quizState.isGenerating && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h1 className="text-3xl font-bold text-indigo-900 mb-6 text-center">
                AI Quiz Generator
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="block text-indigo-800 font-medium mb-2">Subject</label>
                    <select 
                      name="subject"
                      value={quizSettings.subject}
                      onChange={handleSettingsChange}
                      className="w-full p-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Subject</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="Social Studies">Social Studies</option>
                      <option value="Language">Language</option>
                      <option value="Computer Science">Computer Science</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-indigo-800 font-medium mb-2">Topic</label>
                    <input 
                      type="text"
                      name="topic"
                      value={quizSettings.topic}
                      onChange={handleSettingsChange}
                      placeholder="E.g., Algebra, Food Science, etc."
                      className="w-full p-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-indigo-800 font-medium mb-2">Difficulty Level</label>
                    <div className="flex space-x-4">
                      {['Basic', 'Intermediate', 'Advanced'].map((level) => (
                        <label key={level} className="flex items-center">
                          <input
                            type="radio"
                            name="difficulty"
                            value={level}
                            checked={quizSettings.difficulty === level}
                            onChange={handleSettingsChange}
                            className="mr-2 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-indigo-800 font-medium mb-2">Language</label>
                    <div className="flex space-x-4">
                      {['English', 'Kannada'].map((lang) => (
                        <label key={lang} className="flex items-center">
                          <input
                            type="radio"
                            name="language"
                            value={lang}
                            checked={quizSettings.language === lang}
                            onChange={handleSettingsChange}
                            className="mr-2 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>{lang}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <label className="block text-indigo-800 font-medium mb-2">Number of Questions</label>
                    <input 
                      type="range"
                      name="questionCount"
                      min="5"
                      max="20"
                      value={quizSettings.questionCount}
                      onChange={handleSettingsChange}
                      className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-center mt-2">{quizSettings.questionCount} Questions</div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-indigo-800 font-medium mb-2">Quiz Focus</label>
                    <select 
                      name="quizFocus"
                      value={quizSettings.quizFocus}
                      onChange={handleSettingsChange}
                      className="w-full p-3 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="General Review">General Review</option>
                      <option value="Target Weak Areas">Target Weak Areas</option>
                      <option value="Exam Preparation">Exam Preparation</option>
                      <option value="Concept Reinforcement">Concept Reinforcement</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-indigo-800 font-medium mb-2">Question Types</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Multiple Choice',
                        'True/False',
                        'Fill in the Blanks',
                        'Short Answer',
                        'Image-Based',
                        'Matching'
                      ].map((type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={quizSettings.questionTypes.includes(type)}
                            onChange={() => handleQuestionTypeToggle(type)}
                            className="mr-2 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button 
                  onClick={generateQuiz}
                  disabled={!quizSettings.subject || !quizSettings.topic || quizSettings.questionTypes.length === 0}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-indigo-700 transition btn-shine disabled:opacity-50"
                >
                  Generate Quiz
                </button>
              </div>
            </div>
          )}
          
          {/* OCR Integration Section */}
          {!quizState.questions.length && !quizState.isGenerating && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">
                Generate Quiz from Image
              </h2>
              
              <div className="border-2 border-dashed border-indigo-200 rounded-lg p-6 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                
                {!ocrState.isProcessing && !ocrState.extractedText ? (
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    
                    <p className="text-indigo-800 mb-4">Upload an image of a textbook page, question paper, or notes</p>
                    
                    <button 
                      onClick={() => fileInputRef.current.click()}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-purple-700 transition"
                    >
                      Upload Image
                    </button>
                  </div>
                ) : ocrState.isProcessing ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-indigo-800">Processing image using Azure OCR and OpenAI...</p>
                  </div>
                ) : (
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-indigo-800 mb-2">Extracted Text:</h3>
                    <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                      <p>{ocrState.extractedText}</p>
                    </div>
                    
                    <h3 className="text-xl font-bold text-indigo-800 mb-2">Generated Questions:</h3>
                    <ul className="list-disc pl-5 mb-4">
                      {ocrState.generatedQuestions.map((q, i) => (
                        <li key={i} className="mb-1">{q}</li>
                      ))}
                    </ul>
                    
                    <div className="text-center mt-6">
                      <button 
                        onClick={generateQuizFromOCR}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-indigo-700 transition btn-shine"
                      >
                        Create Quiz from These Questions
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Loading State */}
          {quizState.isGenerating && (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-indigo-900 mb-2">Generating your custom quiz</h2>
              <p className="text-indigo-600">Creating {quizSettings.questionCount} questions on {quizSettings.topic}...</p>
            </div>
          )}
          
          {/* Quiz Interface */}
          {quizState.questions.length > 0 && !quizState.isCompleted && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Quiz Header */}
              <div className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">{quizSettings.subject}: {quizSettings.topic}</h2>
                    <p>{quizSettings.difficulty} • {quizState.questions.length} Questions</p>
                  </div>
                  
                  {!quizState.isStarted ? (
                    <button
                      onClick={startQuiz}
                      className="bg-yellow-500 text-indigo-900 px-4 py-2 rounded-lg font-bold shadow-md hover:bg-yellow-400 transition"
                    >
                      Start Quiz
                    </button>
                  ) : (
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="text-sm opacity-80">Time Remaining</div>
                        <div className="text-xl font-bold">{formatTime(quizState.timeRemaining)}</div>
                      </div>
                      
                      <button
                        onClick={completeQuiz}
                        className="bg-yellow-500 text-indigo-900 px-4 py-2 rounded-lg font-bold shadow-md hover:bg-yellow-400 transition"
                      >
                        Finish
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {quizState.isStarted ? (
                <div className="p-6">
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* Current Question */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm text-gray-500">
                        Question {quizState.currentQuestionIndex + 1} of {quizState.questions.length}</div>
                      <button
                        onClick={toggleVoiceReading}
                        className="text-indigo-600 hover:text-indigo-800"
                        title="Read question aloud"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="text-xl font-medium mb-4">
                      {quizState.questions[quizState.currentQuestionIndex].questionText[quizSettings.language.toLowerCase() === 'english' ? 'en' : 'kn']}
                    </div>
                    
                    {/* Answer Options */}
                    <div className="space-y-3">
                      {quizState.questions[quizState.currentQuestionIndex].options.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition ${
                            quizState.userAnswers[quizState.currentQuestionIndex] === index 
                              ? 'border-indigo-600 bg-indigo-50' 
                              : 'border-gray-200 hover:border-indigo-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                              quizState.userAnswers[quizState.currentQuestionIndex] === index 
                                ? 'bg-indigo-600 text-white' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span>
                              {option[quizSettings.language.toLowerCase() === 'english' ? 'en' : 'kn']}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Hint Section */}
                    {quizState.hintsRemaining > 0 && (
                      <div className="mt-6">
                        <button
                          onClick={useHint}
                          className="text-yellow-600 flex items-center font-medium hover:text-yellow-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          Use a hint ({quizState.hintsRemaining} remaining)
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Navigation Buttons */}
                  <div className="flex justify-between">
                    <button
                      onClick={goToPrevQuestion}
                      disabled={quizState.currentQuestionIndex === 0}
                      className={`px-4 py-2 rounded-lg flex items-center ${
                        quizState.currentQuestionIndex === 0 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>
                    
                    <button
                      onClick={goToNextQuestion}
                      disabled={quizState.currentQuestionIndex === quizState.questions.length - 1}
                      className={`px-4 py-2 rounded-lg flex items-center ${
                        quizState.currentQuestionIndex === quizState.questions.length - 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-indigo-900 mb-2">Ready to Begin!</h3>
                  <p className="text-gray-600 mb-6">
                    You'll have {formatTime(quizState.timeRemaining)} to complete the quiz. 
                    Good luck!
                  </p>
                  <button
                    onClick={startQuiz}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-indigo-700 transition btn-shine"
                  >
                    Start Now
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Quiz Results */}
          {quizState.isCompleted && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white p-6 text-center">
                <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
                <div className="text-lg">Your Score: <span className="font-bold">{quizState.score}%</span></div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Score Display */}
                  <div className="bg-indigo-50 rounded-xl p-6 text-center">
                    <div className="relative inline-block">
                      <svg viewBox="0 0 36 36" className="h-40 w-40">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E2E8F0"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={quizState.score >= 80 ? "#48BB78" : quizState.score >= 60 ? "#ECC94B" : "#F56565"}
                          strokeWidth="3"
                          strokeDasharray={`${quizState.score}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold">{quizState.score}%</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <div className="text-xl font-bold mb-1">
                        {quizState.score >= 80 ? "Excellent!" : quizState.score >= 60 ? "Good Job!" : "Keep Practicing!"}
                      </div>
                      <p className="text-gray-600">
                        You answered {quizState.userAnswers.filter((answer, i) => 
                          answer === quizState.questions[i].correctAnswer
                        ).length} out of {quizState.questions.length} questions correctly.
                      </p>
                    </div>
                  </div>
                  
                  {/* Share and Save Options */}
                  <div className="bg-indigo-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-indigo-900 mb-4">Share & Save</h3>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <button 
                        onClick={shareViaWhatsApp}
                        className="flex items-center justify-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                      >
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp
                      </button>
                      
                      <button 
                        onClick={shareViaEmail}
                        className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </button>
                      
                      <button 
                        onClick={shareWithTeacher}
                        className="flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                        Share with Teacher
                      </button>
                      
                      <button 
                        onClick={generateCertificate}
                        className="flex items-center justify-center bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Get Certificate
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Answer Review */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-indigo-900 mb-4">Review Your Answers</h3>
                  
                  <div className="space-y-4">
                    {quizState.questions.map((question, i) => (
                      <div key={i} className="border rounded-lg overflow-hidden">
                        <div className={`p-4 ${quizState.userAnswers[i] === question.correctAnswer ? 'bg-green-50' : 'bg-red-50'}`}>
                          <div className="flex items-start">
                            <div className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                              quizState.userAnswers[i] === question.correctAnswer 
                                ? 'bg-green-500 text-white' 
                                : 'bg-red-500 text-white'
                            }`}>
                              {quizState.userAnswers[i] === question.correctAnswer 
                                ? '✓' 
                                : '✗'}
                            </div>
                            <div>
                              <p className="font-medium mb-1">
                                {question.questionText[quizSettings.language.toLowerCase() === 'english' ? 'en' : 'kn']}
                              </p>
                              <p className="text-sm">
                                Your answer: <span className={`${
                                  quizState.userAnswers[i] === question.correctAnswer 
                                    ? 'text-green-700' 
                                    : 'text-red-700'
                                }`}>
                                  {quizState.userAnswers[i] !== null 
                                    ? question.options[quizState.userAnswers[i]][quizSettings.language.toLowerCase() === 'english' ? 'en' : 'kn'] 
                                    : 'No answer'}
                                </span>
                              </p>
                              {quizState.userAnswers[i] !== question.correctAnswer && (
                                <p className="text-sm text-green-700">
                                  Correct answer: {question.options[question.correctAnswer][quizSettings.language.toLowerCase() === 'english' ? 'en' : 'kn']}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-indigo-50">
                          <p className="text-sm font-medium mb-1">Explanation:</p>
                          <p className="text-sm">
                            {question.explanation[quizSettings.language.toLowerCase() === 'english' ? 'en' : 'kn']}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-8 flex justify-center space-x-4">
                  <button
                    onClick={resetQuiz}
                    className="bg-white border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition"
                  >
                    Try Again
                  </button>
                  
                  <button
                    onClick={() => {
                      resetQuiz();
                      setQuizSettings(prev => ({
                        ...prev,
                        difficulty: prev.difficulty === 'Advanced' 
                          ? 'Advanced' 
                          : prev.difficulty === 'Intermediate' 
                            ? 'Advanced' 
                            : 'Intermediate'
                      }));
                    }}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-indigo-700 transition"
                  >
                    Challenge Me
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Performance Analytics Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-indigo-900 mb-6">Your Performance Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">Progress Over Time</h3>
                <canvas ref={performanceChartRef} height="240"></canvas>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">Strengths & Weaknesses</h3>
                <canvas ref={topicsChartRef} height="240"></canvas>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Recent Quizzes</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Used</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {performanceHistory.slice(-5).map((record) => (
                      <tr key={record.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{record.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{record.topic}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{record.difficulty}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.score >= 80 ? 'bg-green-100 text-green-800' : 
                            record.score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {record.score}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatTime(record.timeUsed)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ChatBot/>
      <Footer />
    </div>
  );
};

export default Quiz;