import React, { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  // State for messages, input, and bot status
  const [messages, setMessages] = useState([
    { id: 1, text: "ನಮಸ್ಕಾರ! VidyaSetu ಗೆ ಸುಸ್ವಾಗತ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು? (Hello! Welcome to VidyaSetu. How can I help you?)", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Reference for auto-scrolling
  const messagesEndRef = useRef(null);

  // Sample responses for the chatbot
  const botResponses = {
    'vidyasetu': "VidyaSetu ಎಂದರೆ \"ಜ್ಞಾನದ ಸೇತುವೆ\". ಇದು ಗ್ರಾಮೀಣ ಕನ್ನಡ ಮಾತನಾಡುವ ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ವಿಶೇಷವಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. (VidyaSetu means 'Bridge of Knowledge'. It's specifically designed for rural Kannada-speaking students.)",
    'help': "ನೀವು ಅಧ್ಯಯನ ಸಾಮಗ್ರಿಗಳನ್ನು ಹುಡುಕಬಹುದು, ಅಭ್ಯಾಸಗಳನ್ನು ಪ್ರಯತ್ನಿಸಬಹುದು, ವಿಷಯಗಳನ್ನು ತರಗತಿಯಾಗಿ ವೀಕ್ಷಿಸಬಹುದು, ಅಥವಾ ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಪರಿಶೀಲಿಸಬಹುದು. (You can search for study materials, try exercises, view subjects by class, or check your progress.)",
    'offline': "ಆಫ್‌ಲೈನ್ ಅಧ್ಯಯನಕ್ಕಾಗಿ, ಕಡಿಮೆ ಬ್ಯಾಂಡ್‌ವಿಡ್ತ್ ಮೋಡ್ ಅನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ ಮತ್ತು ವಿಷಯವನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ. (For offline study, enable low-bandwidth mode and download the content.)",
    'quiz': "ಪರೀಕ್ಷೆಗಳಿಗೆ ಅಭ್ಯಾಸ ಮಾಡಲು, 'ಕ್ವಿಜ್' ವಿಭಾಗಕ್ಕೆ ಹೋಗಿ ಮತ್ತು ನಿಮ್ಮ ತರಗತಿ ಮತ್ತು ವಿಷಯವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ. (To practice for exams, go to the 'Quiz' section and select your class and subject.)",
    'scan': "ಪಠ್ಯಪುಸ್ತಕ ಪುಟವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಲು, 'ಸ್ಕ್ಯಾನ್' ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ ಮತ್ತು ಪುಟದ ಚಿತ್ರವನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ. (To scan a textbook page, click the 'Scan' button and take a picture of the page.)",
    'language': "ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸಲು, ಸೆಟ್ಟಿಂಗ್‌ಗಳಿಗೆ ಹೋಗಿ ಮತ್ತು 'ಭಾಷೆ' ಆಯ್ಕೆ ಮಾಡಿ. ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಲಭ್ಯವಿದೆ. (To change language, go to settings and select 'Language'. Kannada and English are available.)",
    'default': "ಕ್ಷಮಿಸಿ, ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ 'ಸಹಾಯ' ಎಂದು ಟೈಪ್ ಮಾಡಿ. (Sorry, I didn't understand. Please try again or type 'help'.)",

    
    'mathematics': "ಗಣಿತಕ್ಕಾಗಿ, ನಮ್ಮ ಹಂತ-ಹಂತದ ಸಮಸ್ಯೆ ಪರಿಹಾರಕವನ್ನು ಬಳಸಿ. ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಸಮೀಕರಣವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಮತ್ತು ನಾವು ಪ್ರತಿ ಹಂತವನ್ನು ವಿವರಿಸುತ್ತೇವೆ. (For mathematics, use our step-by-step problem solver. Type your question or scan an equation and we'll explain each step.)",
  'science': "ವಿಜ್ಞಾನ ವಿಷಯಗಳಿಗಾಗಿ, ನಮ್ಮ ಇಂಟರಾಕ್ಟಿವ್ 3D ಮಾದರಿಗಳನ್ನು ಪ್ರವೇಶಿಸಿ. ವಿಜ್ಞಾನದಲ್ಲಿ ಹಲವಾರು ಪರಿಕಲ್ಪನೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುವ ವರ್ಚುವಲ್ ಪ್ರಯೋಗಗಳನ್ನು ನಾವು ಹೊಂದಿದ್ದೇವೆ. (For science subjects, access our interactive 3D models. We have virtual experiments to help you understand various concepts in science.)",
  'english': "ಇಂಗ್ಲಿಷ್ ಕಲಿಯಲು, ನಮ್ಮ ಇಂಟರಾಕ್ಟಿವ್ ಓದುವಿಕೆ ಮತ್ತು ಸಂಭಾಷಣೆ ಅಭ್ಯಾಸಗಳನ್ನು ಬಳಸಿ. ನಿಮ್ಮ ಉಚ್ಚಾರಣೆಯನ್ನು ಪರಿಶೀಲಿಸಲು AI ಫೀಡ್‌ಬ್ಯಾಕ್ ಸಿಸ್ಟಮ್ ಇದೆ. (To learn English, use our interactive reading and conversation exercises. There's an AI feedback system to check your pronunciation.)",
  'social': "ಸಾಮಾಜಿಕ ವಿಜ್ಞಾನಕ್ಕಾಗಿ, ನಮ್ಮ ಇಂಟರಾಕ್ಟಿವ್ ನಕ್ಷೆಗಳು ಮತ್ತು ಕಾಲರೇಖೆಗಳನ್ನು ಬಳಸಿ. ಭಾರತದ ಇತಿಹಾಸದ, ಭೂಗೋಳವಿಜ್ಞಾನ ಮತ್ತು ನಾಗರೀಕ ಶಾಸ್ತ್ರದ ಕುರಿತು ಇಂಟರಾಕ್ಟಿವ್ ಅಧ್ಯಯನ ಮಾಡಿ. (For social science, use our interactive maps and timelines. Study India's history, geography, and civics interactively.)",
  'kannada': "ಕನ್ನಡ ಸಾಹಿತ್ಯ ಮತ್ತು ವ್ಯಾಕರಣಕ್ಕಾಗಿ, ನಮ್ಮ ಸಂವಾದಾತ್ಮಕ ಪಾಠಗಳನ್ನು ಪ್ರವೇಶಿಸಿ. ಕನ್ನಡ ಸಾಹಿತ್ಯದ ಕ್ಲಾಸಿಕ್ಸ್ ಮತ್ತು ಆಧುನಿಕ ಕೃತಿಗಳ ವಿಶ್ಲೇಷಣೆಗಳನ್ನು ನಾವು ಒದಗಿಸುತ್ತೇವೆ. (For Kannada literature and grammar, access our interactive lessons. We provide analyses of classics and modern works in Kannada literature.)",
  
   // Class-specific guidance
   'class8': "8ನೇ ತರಗತಿಗೆ, ಪಠ್ಯಕ್ರಮವು ಗಣಿತ, ವಿಜ್ಞಾನ, ಸಾಮಾಜಿಕ ವಿಜ್ಞಾನ, ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್, ಮತ್ತು ಹಿಂದಿ ಒಳಗೊಂಡಿದೆ. 'ವರ್ಗ 8' ಅಧ್ಯಯನ ಯೋಜನೆಗಳನ್ನು ಪ್ರವೇಶಿಸಲು ಮುಖಪುಟದಲ್ಲಿ 'ತರಗತಿ 8' ಆಯ್ಕೆ ಮಾಡಿ. (For 8th class, the curriculum includes Math, Science, Social Science, Kannada, English, and Hindi. Select 'Class 8' on the homepage to access Class 8 study plans.)",
   'class9': "9ನೇ ತರಗತಿಗೆ, ಪಠ್ಯಕ್ರಮವು ಬೀಜಗಣಿತ, ಭೂಮಿತಿ, ವಿಜ್ಞಾನ (ಭೌತಶಾಸ್ತ್ರ, ರಸಾಯನಶಾಸ್ತ್ರ, ಜೀವಶಾಸ್ತ್ರ), ಇತಿಹಾಸ, ಭೂಗೋಳ, ಅರ್ಥಶಾಸ್ತ್ರ, ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್, ಮತ್ತು ಹಿಂದಿ ಒಳಗೊಂಡಿದೆ. (For 9th class, the curriculum includes Algebra, Geometry, Science (Physics, Chemistry, Biology), History, Geography, Economics, Kannada, English, and Hindi.)",
   'class10': "10ನೇ ತರಗತಿಗೆ, ನಾವು SSLC ಪರೀಕ್ಷೆ ಸಿದ್ಧತೆಗಾಗಿ ವಿಶೇಷ ಸಾಮಗ್ರಿಯನ್ನು ಹೊಂದಿದ್ದೇವೆ. ಹಿಂದಿನ ವರ್ಷದ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳು, ಮಾದರಿ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳು, ಮತ್ತು ಪರೀಕ್ಷೆಯ ತಂತ್ರಗಳ ವಿಡಿಯೋಗಳನ್ನು ಪ್ರವೇಶಿಸಿ. (For 10th class, we have special material for SSLC exam preparation. Access previous year question papers, model papers, and videos on exam techniques.)",
   'study': "ಪರಿಣಾಮಕಾರಿ ಅಧ್ಯಯನ ತಂತ್ರಗಳು: 1) ಪೊಮೊಡೊರೊ ತಂತ್ರವನ್ನು ಬಳಸಿ - 25 ನಿಮಿಷಗಳ ಅಧ್ಯಯನ, 5 ನಿಮಿಷಗಳ ವಿರಾಮ. 2) ವಿಷಯವನ್ನು ಹೊಸ ರೀತಿಯಲ್ಲಿ ವಿವರಿಸಲು ಪ್ರಯತ್ನಿಸಿ. 3) ಪರೀಕ್ಷೆಗಳನ್ನು ನಡೆಸಿ. 4) ಕಲಿಕೆಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲು ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ. (Effective study techniques: 1) Use the Pomodoro technique - 25 minutes study, 5 minutes break. 2) Try explaining the subject in a new way. 3) Take quizzes. 4) Ask questions to activate learning.)",
  'memory': "ಸ್ಮರಣಶಕ್ತಿಯನ್ನು ಸುಧಾರಿಸುವ ತಂತ್ರಗಳು: 1) ಸ್ಮರಣಶಕ್ತಿಯ ಮಂದಿರ - ಸ್ಥಳಗಳನ್ನು ಸ್ಮರಣಿಕೆಗಳೊಂದಿಗೆ ಸಂಬಂಧಿಸಿ. 2) ಮೀಮೊನಿಕ್ಸ್ - ಮಾಹಿತಿಯನ್ನು ಪ್ಯಾಟರ್ನ್‌ಗಳಾಗಿ ವಿಂಗಡಿಸಿ. 3) ಮೈಂಡ್ ಮ್ಯಾಪ್ಸ್ - ಪರಿಕಲ್ಪನೆಗಳನ್ನು ದೃಶ್ಯ ರೀತಿಯಲ್ಲಿ ಸಂಬಂಧಿಸಿ. (Memory improvement techniques: 1) Memory palace - associate places with memories. 2) Mnemonics - organize information into patterns. 3) Mind maps - connect concepts visually.)",
  'exams': "ಪರೀಕ್ಷೆಗಳಿಗೆ ಸಿದ್ಧತೆ: 1) ಸಮಯದ ನಿರ್ವಹಣೆ - ಪ್ರತಿ ಪ್ರಶ್ನೆಗೆ ಎಷ್ಟು ಸಮಯ ವಿನಿಯೋಗಿಸಬೇಕೆಂದು ಯೋಜಿಸಿ. 2) ಮಾದರಿ ಪರೀಕ್ಷೆಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ. 3) ಅಂಕಗಳ ಮಾನದಂಡವನ್ನು ತಿಳಿದುಕೊಳ್ಳಿ. 4) ಉತ್ತರಗಳನ್ನು ಸಂಘಟಿಸಿ ಮತ್ತು ಚಿತ್ರಗಳು, ನಕ್ಷೆಗಳು ಇತ್ಯಾದಿಗಳನ್ನು ಸೇರಿಸಿ. (Exam preparation: 1) Time management - plan how much time to spend on each question. 2) Practice model tests. 3) Understand marking criteria. 4) Organize answers and include diagrams, maps, etc.)",
  
  'internet': "ಕಡಿಮೆ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕದಲ್ಲಿ, ಮೊಬೈಲ್ ಡೇಟಾ ಉಳಿಸಿ ಮೋಡ್ ಅನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ. ಇದು ಚಿತ್ರಗಳ ಗುಣಮಟ್ಟವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ ಮತ್ತು ಸಂಪರ್ಕದ ಅವಶ್ಯಕತೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ. (In low internet connectivity, enable mobile data save mode. This reduces image quality and reduces connection requirements.)",
  'download': "ಆಫ್‌ಲೈನ್ ಅಧ್ಯಯನಕ್ಕಾಗಿ ವಿಷಯವನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು: 1) ವಿಷಯವನ್ನು ತೆರೆಯಿರಿ 2) ಮೆನುವಿನಲ್ಲಿ 'ಡೌನ್‌ಲೋಡ್' ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ 3) ಆಫ್‌ಲೈನ್ ಬಳಕೆಗೆ ಡೌನ್‌ಲೋಡ್ ಪೂರ್ಣಗೊಳ್ಳಲು ಕಾಯಿರಿ. (To download content for offline study: 1) Open the content 2) Click the 'Download' button in the menu 3) Wait for the download to complete for offline use.)",
  'account': "ನಿಮ್ಮ ಖಾತೆಯನ್ನು ನಿರ್ವಹಿಸಲು, ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಐಕಾನ್ ಕ್ಲಿಕ್ ಮಾಡಿ ಮತ್ತು 'ಖಾತೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳು' ಆಯ್ಕೆ ಮಾಡಿ. ಇಲ್ಲಿ ನೀವು ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾಯಿಸಬಹುದು, ಇಮೇಲ್ ನವೀಕರಿಸಬಹುದು, ಮತ್ತು ನಿಮ್ಮ ತರಗತಿ ಮಾಹಿತಿಯನ್ನು ನವೀಕರಿಸಬಹುದು. (To manage your account, click your profile icon and select 'Account Settings'. Here you can change your password, update email, and update your class information.)",
  
  'community': "ನಮ್ಮ ಸಮುದಾಯ ವೈಶಿಷ್ಟ್ಯಗಳು ನಿಮಗೆ ಇತರ ವಿದ್ಯಾರ್ಥಿಗಳೊಂದಿಗೆ ಸಂವಹನ ನಡೆಸಲು ಅನುಮತಿಸುತ್ತವೆ. ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳನ್ನು ಪೋಸ್ಟ್ ಮಾಡಿ, ಉತ್ತರಗಳನ್ನು ಶೇರ್ ಮಾಡಿ, ಮತ್ತು ಅಧ್ಯಯನ ಗುಂಪುಗಳಲ್ಲಿ ಭಾಗವಹಿಸಿ. (Our community features allow you to interact with other students. Post your questions, share answers, and participate in study groups.)",
  'mentors': "VidyaSetu ಮೆಂಟರ್ ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಸೇರಲು, 'ಮೆಂಟರ್ಶಿಪ್' ಟ್ಯಾಬ್ ಕ್ಲಿಕ್ ಮಾಡಿ. ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ನಿಮ್ಮ ಸಮಯವನ್ನು ನೀಡಲು ಸ್ವಯಂಸೇವಕರಾಗಬಹುದು ಅಥವಾ ಮೆಂಟರ್ ಅನ್ನು ವಿನಂತಿಸಬಹುದು. (To join the VidyaSetu mentor program, click the 'Mentorship' tab. You can volunteer your time to mentor students or request a mentor.)",
  'forum': "ಚರ್ಚಾವೇದಿಕೆಯಲ್ಲಿ, ನೀವು ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳನ್ನು ಪೋಸ್ಟ್ ಮಾಡಬಹುದು ಮತ್ತು ಇತರ ವಿದ್ಯಾರ್ಥಿಗಳಿಂದ ಮತ್ತು ಶಿಕ್ಷಕರಿಂದ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಬಹುದು. ಎಲ್ಲಾ ಚರ್ಚೆಗಳು ಮಾಡರೇಟ್ ಮಾಡಲ್ಪಡುತ್ತವೆ. (In the discussion forum, you can post your questions and get answers from other students and teachers. All discussions are moderated.)",
  
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      // Bot response logic
      let botResponseText = botResponses.default;
      
      // Simple keyword matching for responses
      const lowercaseInput = inputText.toLowerCase();
      
      Object.keys(botResponses).forEach(key => {
        if (lowercaseInput.includes(key)) {
          botResponseText = botResponses[key];
        }
      });

      // For English queries, provide responses in both languages
      if (!/[\u0C80-\u0CFF]/.test(lowercaseInput)) {
        // If input doesn't contain Kannada characters
        if (botResponseText === botResponses.default) {
          botResponseText = "Sorry, I didn't understand. Please try again or type 'help'. (ಕ್ಷಮಿಸಿ, ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ 'ಸಹಾಯ' ಎಂದು ಟೈಪ್ ಮಾಡಿ.)";
        }
      }

      // Add bot message
      const botMessage = {
        id: messages.length + 2,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  // Handle key press (Enter)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat toggle button */}
      <button 
        onClick={toggleChatbot}
        className="w-14 h-14 rounded-full bg-[#6A0DAD] text-white flex items-center justify-center shadow-lg hover:bg-[#673AB7] transition-colors"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat container */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col" style={{ height: '500px' }}>
          {/* Chat header */}
          <div className="bg-[#6A0DAD] text-white p-4 flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#FDD835] flex items-center justify-center mr-3">
              <span className="text-[#6A0DAD] font-bold">VS</span>
            </div>
            <div>
              <h3 className="font-bold">VidyaSetu ಸಹಾಯಕ</h3>
              <p className="text-xs opacity-80">AI Assistant</p>
            </div>
          </div>

          {/* Messages container */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#F0F3FF]">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-[#673AB7] text-white' 
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white text-gray-800 p-3 rounded-lg border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ... (Type here...)"
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-[#6A0DAD]"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#FFC107] text-[#6A0DAD] p-2 rounded-r-lg hover:bg-[#FDD835] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500 flex justify-between">
              <button className="hover:text-[#6A0DAD]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline mr-1">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
                Voice
              </button>
              <button className="hover:text-[#6A0DAD]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline mr-1">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                Help
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;