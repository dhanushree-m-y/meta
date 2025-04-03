import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatBot from '../components/Chatbot';

const QuizApp = () => {
  const [activeTab, setActiveTab] = useState('quiz');
  const [step, setStep] = useState('welcome');
  const [subject, setSubject] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showBraille, setShowBraille] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizHistory, setQuizHistory] = useState([
    {date: '2025-01-10', subject: 'Mathematics', topic: 'Algebra', difficulty: 'Intermediate', score: 75, timeUsed: '4:00'},
    {date: '2025-01-15', subject: 'Science', topic: 'Physics', difficulty: 'Basic', score: 85, timeUsed: '3:40'},
    {date: '2025-01-20', subject: 'Mathematics', topic: 'Geometry', difficulty: 'Advanced', score: 65, timeUsed: '5:00'},
    {date: '2025-02-05', subject: 'Mathematics', topic: 'Algebra', difficulty: 'Intermediate', score: 80, timeUsed: '3:20'}
  ]);
  const [quizTimer, setQuizTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Chart data
  const progressData = [
    {date: '2025-01-10', score: 75},
    {date: '2025-01-15', score: 85},
    {date: '2025-01-20', score: 65},
    {date: '2025-02-05', score: 80}
  ];

  const strengthsData = [
    {subject: 'Algebra', score: 78},
    {subject: 'Geometry', score: 65},
    {subject: 'Physics', score: 85},
    {subject: 'Chemistry', score: 90},
    {subject: 'Biology', score: 72}
  ];

  const subjects = [
    { id: 1, name: 'Science' },
    { id: 2, name: 'Mathematics' },
    { id: 3, name: 'Social Studies' }
  ];

  const scienceQuestions = [
    {
      id: 1,
      question: 'Where do fruits and vegetables come from?',
      braille: '⠺⠓⠑⠗⠑ ⠙⠕ ⠋⠗⠥⠊⠞⠎ ⠁⠝⠙ ⠧⠑⠛⠑⠞⠁⠃⠇⠑⠎ ⠉⠕⠍⠑ ⠋⠗⠕⠍⠦',
      hints: [
        'They are cultivated in gardens, farms, or wild areas.',
        'They undergo a process known as photosynthesis.'
      ],
      answer: 'Plants',
      explanation: 'Fruits and vegetables come from plants. They are parts of plants that have been cultivated for human consumption.'
    },
    {
      id: 2,
      question: 'How do bees produce honey?',
      braille: '⠓⠕⠺ ⠙⠕ ⠃⠑⠑⠎ ⠏⠗⠕⠙⠥⠉⠑ ⠓⠕⠝⠑⠽⠦',
      hints: [
        'They collect something from flowers.',
        'They store and process this substance in their hives.'
      ],
      answer: 'Bees collect nectar from flowers and convert it into honey',
      explanation: 'Bees collect nectar from flowers and store it in their honey stomach. The nectar mixes with enzymes, and when bees return to the hive, they regurgitate it. The nectar is then passed from bee to bee until it becomes honey.'
    }
  ];

  const mathQuestions = [
    {
      id: 1,
      question: 'What is 5 + 7?',
      braille: '⠺⠓⠁⠞ ⠊⠎ ⠼⠑ ⠬ ⠼⠛⠦',
      hints: ['Count five and then add seven more.'],
      answer: '12',
      explanation: 'The sum of 5 and 7 is 12. This is a basic addition problem.'
    },
    {
      id: 2,
      question: 'Solve for x: 2x + 5 = 15',
      braille: '⠎⠕⠇⠧⠑ ⠋⠕⠗ ⠭⠒ ⠼⠃⠭ ⠬ ⠼⠑ ⠀⠨⠅ ⠼⠁⠑',
      hints: ['Subtract 5 from both sides of the equation.'],
      answer: '5',
      explanation: 'To solve for x, subtract 5 from both sides: 2x + 5 - 5 = 15 - 5, so 2x = 10. Then divide both sides by 2: x = 5.'
    }
  ];

  const socialStudiesQuestions = [
    {
      id: 1,
      question: 'What is the capital of France?',
      braille: '⠺⠓⠁⠞ ⠊⠎ ⠞⠓⠑ ⠉⠁⠏⠊⠞⠁⠇ ⠕⠋ ⠋⠗⠁⠝⠉⠑⠦',
      hints: ['It has a famous tower named after an engineer.'],
      answer: 'Paris',
      explanation: 'The capital of France is Paris. It is known for landmarks such as the Eiffel Tower, the Louvre Museum, and Notre-Dame Cathedral.'
    },
    {
      id: 2,
      question: 'Who was the first President of the United States?',
      braille: '⠺⠓⠕ ⠺⠁⠎ ⠞⠓⠑ ⠋⠊⠗⠎⠞ ⠏⠗⠑⠎⠊⠙⠑⠝⠞ ⠕⠋ ⠞⠓⠑ ⠥⠝⠊⠞⠑⠙ ⠎⠞⠁⠞⠑⠎⠦',
      hints: ['He was a general during the American Revolutionary War.'],
      answer: 'George Washington',
      explanation: 'George Washington was the first President of the United States, serving from 1789 to 1797. He was a key figure in the American Revolutionary War and played a crucial role in shaping the early American government.'
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setQuizTimer(quizTimer + 1);
      }, 1000);
    } else if (!timerActive && quizTimer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, quizTimer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const getQuestions = () => {
    if (subject === 1) return scienceQuestions;
    if (subject === 2) return mathQuestions;
    if (subject === 3) return socialStudiesQuestions;
    return [];
  };

  const currentQuestion = getQuestions()[currentQuestionIndex];

  // Translation function (placeholder)
  const translateToKannada = (text) => {
    // In a real app, this would use a translation API
    return `ಅನುವಾದಿತ: ${text}`;
  };

  const startQuiz = () => {
    setTimerActive(true);
    setStep('quiz');
  };

  const handleSubjectSelection = (selectedSubject) => {
    setSubject(selectedSubject);
    startQuiz();
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const checkAnswer = () => {
    const questions = getQuestions();
    const currentQ = questions[currentQuestionIndex];
    
    // Check if answer is correct (case insensitive and partial match)
    const isCorrect = currentQ.answer.toLowerCase().includes(userInput.toLowerCase());
    
    // Update the answers array
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      question: currentQ.question,
      userAnswer: userInput,
      correctAnswer: currentQ.answer,
      isCorrect
    };
    
    setAnswers(updatedAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserInput('');
      setShowHint(false);
      setShowAnswer(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setTimerActive(false);
    setQuizComplete(true);
    
    // Add the current quiz to history
    const newQuiz = {
      date: new Date().toISOString().split('T')[0],
      subject: subjects.find(s => s.id === subject)?.name,
      topic: getQuestions()[0]?.topic || "General",
      difficulty: "Intermediate",
      score: Math.round((score / getQuestions().length) * 100),
      timeUsed: formatTime(quizTimer)
    };
    setQuizHistory([...quizHistory, newQuiz]);
  };

  const handleSpecialCommands = () => {
    const lowerInput = userInput.toLowerCase().trim();
    
    if (lowerInput === 'hint') {
      setShowHint(true);
      setUserInput('');
      return true;
    } else if (lowerInput === 'answer') {
      setShowAnswer(true);
      setUserInput('');
      return true;
    } else if (lowerInput === 'translate') {
      setUserInput(translateToKannada(currentQuestion.question));
      return true;
    } else if (lowerInput === 'braille') {
      setShowBraille(!showBraille);
      setUserInput('');
      return true;
    } else if (lowerInput === 'exit') {
      setTimerActive(false);
      setStep('welcome');
      return true;
    }
    
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (userInput.trim() === '') return;
    
    // Check for special commands first
    if (handleSpecialCommands()) return;
    
    // Otherwise, treat as an answer
    checkAnswer();
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setUserInput('');
    setShowHint(false);
    setShowAnswer(false);
    setQuizComplete(false);
    setQuizTimer(0);
    setStep('welcome');
    setSubject(null);
    setActiveTab('quiz');
  };

  const NavigationHeader = () => (
    <div className="bg-gray-800 p-4 mb-6 rounded-t-lg">
      <Navbar/>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Quiz App</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => setActiveTab('quiz')} 
            className={`px-4 py-2 rounded ${activeTab === 'quiz' ? 'bg-teal-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            Quiz
          </button>
          <button 
            onClick={() => setActiveTab('analytics')} 
            className={`px-4 py-2 rounded ${activeTab === 'analytics' ? 'bg-teal-500 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            Analytics
          </button>
        </div>
      </div>
    </div>
  );

  // Analytics Dashboard
  if (activeTab === 'analytics') {
    return (
      <div className="bg-gray-900 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <NavigationHeader />
          
          <div className="bg-gray-800 rounded-b-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-6">Your Performance Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Progress Over Time */}
              <div className="bg-gray-700 rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-white mb-4">Progress Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis domain={[0, 100]} stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                      labelStyle={{ color: '#F9FAFB' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#14B8A6" 
                      strokeWidth={2} 
                      name="Quiz Scores (%)" 
                      activeDot={{ r: 8, fill: '#0D9488' }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Strengths & Weaknesses */}
              <div className="bg-gray-700 rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-white mb-4">Strengths & Weaknesses</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={strengthsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="<XAxis dataKey=" stroke="#9CA3AF" />
                    <YAxis domain={[0, 100]} stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                      labelStyle={{ color: '#F9FAFB' }}
                    />
                    <Bar 
                      dataKey="score" 
                      fill={(entry) => 
                        entry.score > 80 ? "#10B981" : 
                        entry.score > 70 ? "#F59E0B" : 
                        "#EF4444"
                      }
                      name="Average Score (%)" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Recent Quizzes */}
            <div className="bg-gray-700 rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Quizzes</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-600">
                  <thead className="bg-gray-800">
                    <tr>
                      {['Date', 'Subject', 'Topic', 'Difficulty', 'Score', 'Time Used'].map((header) => (
                        <th 
                          key={header}
                          scope="col" 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {quizHistory.map((quiz, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{quiz.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{quiz.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{quiz.topic}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{quiz.difficulty}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            quiz.score >= 80 ? 'bg-green-900 text-green-300' : 
                            quiz.score >= 70 ? 'bg-yellow-900 text-yellow-300' : 
                            'bg-red-900 text-red-300'
                          }`}>
                            {quiz.score}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{quiz.timeUsed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setActiveTab('quiz')}
                className="py-3 px-6 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Take New Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Welcome screen
  if (step === 'welcome') {
    return (
      <div className="bg-gray-900 min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <NavigationHeader />
          
          <div className="bg-gray-800 rounded-b-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Generate Quiz</h2>
            
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 text-teal-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.5 2h-13C4.12 2 3 3.12 3 4.5v15C3 20.88 4.12 22 5.5 22h13c1.38 0 2.5-1.12 2.5-2.5v-15C21 3.12 19.88 2 18.5 2zM19 19.5c0 .28-.22.5-.5.5h-13c-.28 0-.5-.22-.5-.5v-15c0-.28.22-.5.5-.5h13c.28 0 .5.22.5.5v15zM16 10l-5 6-2-2-4 4h14l-3-8z"/>
                  </svg>
                </div>
              </div>
              
              <p className="text-teal-300 mb-6">
                Select a subject to begin your quiz
              </p>
              
              <div className="space-y-4">
                {subjects.map((subj) => (
                  <button
                    key={subj.id}
                    onClick={() => handleSubjectSelection(subj.id)}
                    className="w-full py-3 px-6 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  >
                    {subj.id}️⃣ {subj.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz screen
  if (step === 'quiz' && !quizComplete) {
    const questions = getQuestions();
    
    return (
      <div className="bg-gray-900 min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <NavigationHeader />
          
          <div className="bg-gray-800 rounded-b-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {subjects.find(s => s.id === subject)?.name} Quiz
              </h2>
              <div className="text-teal-300 font-medium">
                Question {currentQuestionIndex + 1}/{questions.length} • Time: {formatTime(quizTimer)}
              </div>
            </div>
            
            <div className="mb-6">
              {showBraille && (
                <p className="text-sm text-gray-400 mb-2 font-mono">
                  Braille: {currentQuestion.braille}
                </p>
              )}
              
              <p className="text-xl font-medium mb-6 text-white">🔹 {currentQuestion.question}</p>
              
              {showHint && currentQuestion.hints && currentQuestion.hints.length > 0 && (
                <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-md mb-4">
                  <p className="text-yellow-300">
                    <span className="font-medium">Hint:</span> {currentQuestion.hints[0]}
                  </p>
                </div>
              )}
              
              {showAnswer && (
                <div className="bg-blue-900 border border-blue-700 p-4 rounded-md mb-4">
                  <p className="text-blue-300">
                    <span className="font-medium">Answer:</span> {currentQuestion.answer}
                  </p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Type your answer here..."
                    className="flex-1 p-3 bg-gray-700 text-white border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="submit"
                    className="bg-teal-600 text-white p-3 rounded-r-md hover:bg-teal-700"
                  >
                    Submit
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Special commands: 'hint', 'answer', 'translate', 'braille', 'exit'
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (quizComplete) {
    const questions = getQuestions();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="bg-gray-900 min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <NavigationHeader />
          
          <div className="bg-gray-800 rounded-b-lg shadow-md p-8">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="bg-gray-700 rounded-lg p-6 text-center flex-1">
                <div className="relative inline-block w-40 h-40 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">{percentage}%</span>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={
                        percentage > 70 ? "#10B981" : 
                        percentage > 40 ? "#F59E0B" : 
                        "#EF4444"
                      }
                      strokeWidth="8"
                      strokeDasharray={`${percentage * 2.83} 283`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Your Score</h3>
                <p className="text-teal-300">
                  {score} out of {questions.length} correct
                </p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-6 text-center flex-1">
                <div className="text-4xl mb-4">⏱️</div>
                <h3 className="text-xl font-bold text-white">Quiz Time</h3>
                <p className="text-teal-300">{formatTime(quizTimer)}</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-6 text-center flex-1">
                <div className="text-4xl mb-4">
                  {percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "🤔"}
                </div>
                <h3 className="text-xl font-bold text-white">Performance</h3>
                <p className="text-teal-300">
                  {percentage >= 80 ? "Excellent!" : 
                   percentage >= 60 ? "Good Job!" : 
                   percentage >= 40 ? "Keep Practicing!" : "Need Improvement"}
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4">Results Overview</h3>
            
            <div className="space-y-6 mb-8">
              {answers.map((answer, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${
                    answer.isCorrect 
                      ? "bg-green-900 border-green-700" 
                      : "bg-red-900 border-red-700"
                  }`}
                >
                  <p className="font-medium mb-2 text-white">
                    Question {index + 1}: {answer.question}
                  </p>
                  <p className={answer.isCorrect ? "text-green-300" : "text-red-300"}>
                    Your answer: {answer.userAnswer}
                  </p>
                  {!answer.isCorrect && (
                    <p className="text-gray-300 mt-1">
                      Correct answer: {answer.correctAnswer}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={restartQuiz}
                className="py-3 px-6 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Take Another Quiz
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className="py-3 px-6 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                View Analytics
              </button>
            </div>
          </div>
        </div>
        <ChatBot/>
        <Footer/>
      </div>
    );
  }

  return null;
};

export default QuizApp;