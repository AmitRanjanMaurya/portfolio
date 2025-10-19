// ===== ADVANCED AI FEATURES FOR PORTFOLIO =====

class AIPortfolioAssistant {
  constructor() {
    this.config = window.AI_CONFIG || {};
    this.apiKey = this.config.API_KEY || 'YOUR_OPENROUTER_API_KEY';
    this.apiUrl = this.config.API_URL || 'https://openrouter.ai/api/v1/chat/completions';
    this.isInitialized = false;
    this.conversationHistory = [];
    this.init();
  }

  init() {
    this.createAIChatInterface();
    this.initializeAIFeatures();
    this.setupEventListeners();
    this.addAdvancedFeatures();
    this.isInitialized = true;
    console.log('AI Portfolio Assistant initialized!');
  }

  createAIChatInterface() {
    // Create professional AI chatbot widget
    const aiWidget = document.createElement('div');
    aiWidget.className = 'ai-chatbot-widget';
    aiWidget.innerHTML = `
      <div class="ai-chat-toggle" id="ai-chat-toggle">
        <span class="ai-toggle-icon">🤖</span>
        <div class="ai-status-indicator"></div>
        <div class="ai-tooltip">Ask me about Amit's portfolio!</div>
        <div class="ai-keyboard-hint">Ctrl+K</div>
      </div>
      
      <div class="ai-chat-panel" id="ai-chat-panel">
        <div class="ai-chat-header">
          <div class="ai-header-info">
            <div class="ai-avatar-small">🤖</div>
            <div class="ai-header-text">
              <h3>AI Portfolio Assistant</h3>
              <p>Online • Ready to help</p>
            </div>
          </div>
          <button class="ai-close-btn" id="ai-close-btn">×</button>
        </div>
        
        <div class="ai-chat-messages" id="ai-chat-messages">
          <div class="ai-message ai-message-bot">
            <div class="ai-message-avatar">🤖</div>
            <div class="ai-message-content">
              <p>Hi! I'm Amit's AI assistant with access to his complete portfolio, resume, and research work. I can help you explore his education, experience, skills, projects, and services. What would you like to know?</p>
              <div class="ai-message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            </div>
          </div>
        </div>
        
        <div class="ai-chat-input">
          <div class="ai-quick-actions">
            <button class="ai-quick-action" data-message="Tell me about Amit's experience">💼 Experience</button>
            <button class="ai-quick-action" data-message="What are his technical skills?">⚡ Skills</button>
            <button class="ai-quick-action" data-message="Show me his best projects">🚀 Projects</button>
            <button class="ai-quick-action" data-message="What services does he offer?">🛠️ Services</button>
            <button class="ai-quick-action" data-message="Tell me about his education">🎓 Education</button>
            <button class="ai-quick-action" data-message="Show me his research work">📚 Research</button>
          </div>
          <div class="ai-input-container">
            <input type="text" id="ai-message-input" class="ai-message-input" placeholder="Ask me anything about Amit's work..." />
            <button class="ai-send-btn" id="ai-send-btn">
              <span>→</span>
            </button>
          </div>
          <div class="ai-typing-indicator" id="ai-typing-indicator" style="display: none;">
            <div class="ai-typing-dots">
              <div class="ai-typing-dot"></div>
              <div class="ai-typing-dot"></div>
              <div class="ai-typing-dot"></div>
            </div>
            <span>AI is thinking...</span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(aiWidget);
  }

  setupEventListeners() {
    const toggle = document.getElementById('ai-chat-toggle');
    const panel = document.getElementById('ai-chat-panel');
    const closeBtn = document.getElementById('ai-close-btn');
    const sendBtn = document.getElementById('ai-send-btn');
    const input = document.getElementById('ai-message-input');

    // Toggle chat panel
    toggle.addEventListener('click', () => {
      panel.classList.toggle('open');
      toggle.classList.toggle('active');
      if (panel.classList.contains('open')) {
        input.focus();
      }
    });

    // Close chat panel
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('open');
      toggle.classList.remove('active');
    });

    // Send message
    sendBtn.addEventListener('click', () => {
      this.sendMessage();
    });

    // Send on Enter key
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });

    // Quick action buttons - use event delegation since they're added dynamically
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('ai-quick-action')) {
        const message = e.target.getAttribute('data-message');
        input.value = message;
        this.sendMessage();
      }
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.ai-chatbot-widget')) {
        panel.classList.remove('open');
        toggle.classList.remove('active');
      }
    });
  }

  async sendMessage() {
    const input = document.getElementById('ai-message-input');
    const message = input.value.trim();
    
    if (!message) return;

    // Track message event
    this.trackEvent('message_sent', { query: message });

    // Add user message to chat
    this.addMessageToChat(message, 'user');
    input.value = '';

    // Hide suggestions dropdown
    const suggestionsDropdown = document.querySelector('.ai-suggestions-dropdown');
    if (suggestionsDropdown) {
      suggestionsDropdown.style.display = 'none';
    }

    // Show typing indicator
    this.showTypingIndicator();

    try {
      // Check for resume-specific queries
      if (this.isResumeQuery(message)) {
        const response = await this.handleResumeQuery(message);
        this.hideTypingIndicator();
        this.addMessageToChat(response, 'bot');
      } else {
        // Get AI response
        const response = await this.getAIResponse(message);
        this.hideTypingIndicator();
        this.addMessageToChat(response, 'bot');
      }
    } catch (error) {
      this.hideTypingIndicator();
      this.addMessageToChat("I'm having trouble connecting right now. Please try again later or contact Amit directly at linkedin.com/in/amit-ranjan-maurya!", 'bot');
      console.error('AI API Error:', error);
    }
  }

  isResumeQuery(message) {
    const resumeKeywords = ['resume', 'cv', 'curriculum', 'background', 'education', 'experience', 'qualification', 'degree', 'college', 'university', 'roll number', '21BCS1272'];
    return resumeKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }

  async handleResumeQuery(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('college') || lowerMessage.includes('university')) {
      return `Amit is pursuing his Bachelor of Computer Science with roll number 21BCS1272, graduating in 2025. His coursework includes Data Structures & Algorithms, Database Management Systems, Web Development, Machine Learning, Software Engineering, Computer Networks, Operating Systems, and Artificial Intelligence. His academic background provides a strong foundation for his practical development work. Would you like to know about his specific projects or work experience?`;
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
      return `Amit has professional experience as a Full Stack Developer (2023-Present) where he develops responsive web applications using React.js and Node.js, implements RESTful APIs, and works with cross-functional teams. He also worked as a Data Science Intern (2022-2023) building ML models, creating data visualizations, and performing statistical analysis. His hands-on experience spans both development and data science domains. Want to know about his specific achievements or technical skills?`;
    }
    
    if (lowerMessage.includes('roll') || lowerMessage.includes('21bcs1272')) {
      return `Yes! Amit's roll number is 21BCS1272. He's a Computer Science student with this roll number, and his complete resume is available as "Amit_Ranjan_Maurya_21BCS1272.pdf". The resume contains detailed information about his education, professional experience, projects, skills, certifications, and achievements. What specific section would you like to know more about?`;
    }
    
    // Default resume response
    return `Amit's resume (Amit_Ranjan_Maurya_21BCS1272.pdf) showcases his journey as a Computer Science student (Roll: 21BCS1272) and professional developer. It includes his education, work experience as a Full Stack Developer and Data Science Intern, technical skills, major projects, certifications (AWS, Google, Microsoft), and achievements like hackathon wins and research publications. He's led development teams and maintained 95%+ client satisfaction. Which aspect interests you most - education, experience, skills, projects, or achievements?`;
  }

  addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('ai-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ai-message-${sender}`;
    
    const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    if (sender === 'user') {
      messageDiv.innerHTML = `
        <div class="ai-message-content">
          <p>${message}</p>
          <div class="ai-message-time">${timestamp}</div>
        </div>
        <div class="ai-message-avatar">👤</div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="ai-message-avatar">🤖</div>
        <div class="ai-message-content">
          <p>${message}</p>
          <div class="ai-message-time">${timestamp}</div>
        </div>
      `;
    }

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Add animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    setTimeout(() => {
      messageDiv.style.transition = 'all 0.3s ease';
      messageDiv.style.opacity = '1';
      messageDiv.style.transform = 'translateY(0)';
    }, 100);

    // Save conversation history
    this.saveConversationHistory();
  }

  showTypingIndicator() {
    const indicator = document.getElementById('ai-typing-indicator');
    indicator.style.display = 'flex';
  }

  hideTypingIndicator() {
    const indicator = document.getElementById('ai-typing-indicator');
    indicator.style.display = 'none';
  }

  async getAIResponse(userMessage) {
    // Create comprehensive context about Amit's portfolio and resume
    const portfolioContext = `
    You are an AI assistant for Amit Ranjan Maurya's portfolio website. You have access to his complete resume (Amit_Ranjan_Maurya_21BCS1272.pdf) and portfolio information.

    PERSONAL INFORMATION:
    - Name: Amit Ranjan Maurya
    - Roll Number: 21BCS1272
    - Title: Full Stack Developer & Data Scientist
    - Resume: Amit_Ranjan_Maurya_21BCS1272.pdf
    - LinkedIn: linkedin.com/in/amit-ranjan-maurya
    - GitHub: github.com/amit-ranjan-maurya
    - Portfolio: https://amitranjanmaurya.com

    EDUCATION:
    - Degree: Bachelor of Computer Science (Roll: 21BCS1272)
    - Duration: 2021-2025
    - Relevant Courses: Data Structures & Algorithms, DBMS, Web Development, Machine Learning, Software Engineering, Computer Networks, Operating Systems, AI

    PROFESSIONAL EXPERIENCE:
    1. Full Stack Developer (2023-Present)
       - Developed responsive web applications using React.js and Node.js
       - Implemented RESTful APIs and database integration
       - Collaborated with cross-functional teams on agile projects
       - Optimized application performance and user experience

    2. Data Science Intern (2022-2023)
       - Built machine learning models for predictive analytics
       - Created data visualizations and dashboards
       - Performed statistical analysis on large datasets
       - Presented insights to stakeholders

    TECHNICAL SKILLS:
    - Frontend: React.js (95%), JavaScript (90%), Next.js (88%), CSS3/SCSS (92%), TypeScript (85%)
    - Backend: Node.js (88%), Python (85%), .NET Core (80%), REST APIs (90%), GraphQL (75%)
    - Data Science: Python/Pandas/NumPy (82%), Machine Learning (78%), SQL/NoSQL (85%), Data Visualization (80%)
    - Tools: Git/GitHub (88%), Docker (75%), AWS/Cloud (70%), VS Code (82%)

    CERTIFICATIONS:
    - AWS Certified Developer Associate
    - Google Analytics Certified
    - Microsoft Azure Fundamentals
    - MongoDB Certified Developer
    - React Developer Certification

    ACHIEVEMENTS:
    - Winner of College Hackathon 2023
    - Published research paper on ML applications
    - Led development team of 5 members
    - Maintained 95%+ client satisfaction rate
    - Contributed to 10+ open source projects

    MAJOR PROJECTS:
    - Advanced E-Commerce Platform (React, Node.js, MongoDB, Stripe)
    - Real-Time Analytics Dashboard (Python, D3.js, Flask, PostgreSQL)
    - AI-Powered Customer Support Bot (Python, TensorFlow, NLP, FastAPI)
    - Interactive Portfolio Website (HTML5, CSS3, JavaScript, GSAP)
    - Sales Prediction ML Model (Python, Scikit-learn, 92% accuracy)
    - Collaborative Task Manager (Vue.js, Socket.io, Express, MySQL)

    SERVICES OFFERED:
    1. Web Development (Starting ₹15,000) - Responsive design, performance optimization, SEO
    2. Data Science & Analytics (Starting ₹20,000) - ML models, data visualization, predictive analytics
    3. AI & Machine Learning (Starting ₹25,000) - Chatbots, automation, NLP, computer vision
    4. Mobile App Development (Starting ₹30,000) - Cross-platform apps with React Native/Flutter
    5. API Development (Starting ₹12,000) - REST/GraphQL APIs, integrations
    6. Technical Consulting (₹5,000/hr) - Architecture, code review, optimization

    PRICING PLANS:
    - Basic: ₹8,000/month or ₹6,400/project
    - Professional: ₹15,000/month or ₹12,000/project (Most Popular)
    - Premium: ₹25,000/month or ₹20,000/project
    - Enterprise: ₹50,000/month or ₹40,000/project

    SPECIAL INSTRUCTIONS:
    - When users ask about resume, mention the file "Amit_Ranjan_Maurya_21BCS1272.pdf" and offer to share specific sections
    - Be knowledgeable about his education, experience, achievements, and certifications
    - Provide detailed information about his technical background and academic journey
    - Highlight his practical experience and project work
    - Be professional but friendly, and always offer to provide more specific details

    Respond in a helpful, professional, and friendly manner. Keep responses informative but concise.
    `;

    // Add to conversation history
    this.conversationHistory.push({ role: 'user', content: userMessage });

    const messages = [
      { role: 'system', content: portfolioContext },
      ...this.conversationHistory.slice(-10) // Keep last 10 messages for context
    ];

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Amit Ranjan Maurya Portfolio'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Add AI response to conversation history
    this.conversationHistory.push({ role: 'assistant', content: aiResponse });

    return aiResponse;
  }

  initializeAIFeatures() {
    // Add AI-powered features throughout the site
    this.addSmartRecommendations();
    this.addIntelligentSearch();
    this.addPersonalizedContent();
  }

  addSmartRecommendations() {
    // Add smart project recommendations based on user behavior
    const projectCards = document.querySelectorAll('.project-card');

    // Track user interactions
    let userInterests = {
      web: 0,
      data: 0,
      ai: 0,
      mobile: 0
    };

    // Track clicks and hovers
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      card.addEventListener('mouseenter', () => {
        if (userInterests[category] !== undefined) {
          userInterests[category]++;
        }
      });

      card.addEventListener('click', () => {
        if (userInterests[category] !== undefined) {
          userInterests[category] += 2;
        }
        this.showRecommendations(userInterests);
      });
    });
  }

  addAdvancedFeatures() {
    // Add voice recognition
    this.addVoiceRecognition();
    
    // Add smart suggestions
    this.addSmartSuggestions();
    
    // Add conversation memory
    this.addConversationMemory();
    
    // Add file sharing capability
    this.addFileSharing();
    
    // Add conversation export
    this.addConversationExport();
    
    // Add theme adaptation
    this.addThemeAdaptation();
    
    // Add keyboard shortcuts
    this.addKeyboardShortcuts();
    
    // Add analytics
    this.addAnalytics();
    
    // Track session start
    this.trackEvent('session_start');
  }

  addVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      // Add voice button to input
      const inputContainer = document.querySelector('.ai-input-container');
      const voiceBtn = document.createElement('button');
      voiceBtn.className = 'ai-voice-btn';
      voiceBtn.innerHTML = '🎤';
      voiceBtn.title = 'Voice input';
      
      inputContainer.insertBefore(voiceBtn, document.getElementById('ai-send-btn'));

      voiceBtn.addEventListener('click', () => {
        recognition.start();
        voiceBtn.classList.add('listening');
        voiceBtn.innerHTML = '🔴';
      });

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById('ai-message-input').value = transcript;
        voiceBtn.classList.remove('listening');
        voiceBtn.innerHTML = '🎤';
      };

      recognition.onerror = () => {
        voiceBtn.classList.remove('listening');
        voiceBtn.innerHTML = '🎤';
      };
    }
  }

  addSmartSuggestions() {
    const input = document.getElementById('ai-message-input');
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'ai-suggestions-dropdown';
    input.parentNode.appendChild(suggestionsContainer);

    const suggestions = [
      'Tell me about your experience',
      'What are your technical skills?',
      'Show me your best projects',
      'What services do you offer?',
      'Tell me about your education',
      'Show me your certifications',
      'What is your pricing?',
      'How can I contact you?'
    ];

    input.addEventListener('input', (e) => {
      const value = e.target.value.toLowerCase();
      if (value.length > 2) {
        const matches = suggestions.filter(s => s.toLowerCase().includes(value));
        this.showSuggestions(matches, suggestionsContainer);
      } else {
        suggestionsContainer.style.display = 'none';
      }
    });
  }

  showSuggestions(suggestions, container) {
    if (suggestions.length === 0) {
      container.style.display = 'none';
      return;
    }

    container.innerHTML = suggestions.map(s => 
      `<div class="ai-suggestion-item">${s}</div>`
    ).join('');
    
    container.style.display = 'block';

    // Add click handlers
    container.querySelectorAll('.ai-suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        document.getElementById('ai-message-input').value = item.textContent;
        container.style.display = 'none';
        this.sendMessage();
      });
    });
  }

  addConversationMemory() {
    // Save conversation to localStorage
    this.loadConversationHistory();
  }

  loadConversationHistory() {
    const saved = localStorage.getItem('ai-conversation-history');
    if (saved) {
      this.conversationHistory = JSON.parse(saved);
    }
  }

  saveConversationHistory() {
    localStorage.setItem('ai-conversation-history', JSON.stringify(this.conversationHistory));
  }

  addFileSharing() {
    // Add file sharing button
    const inputContainer = document.querySelector('.ai-input-container');
    const fileBtn = document.createElement('button');
    fileBtn.className = 'ai-file-btn';
    fileBtn.innerHTML = '📎';
    fileBtn.title = 'Share resume or portfolio files';
    
    inputContainer.insertBefore(fileBtn, document.getElementById('ai-send-btn'));

    fileBtn.addEventListener('click', () => {
      this.showFileOptions();
    });
  }

  showFileOptions() {
    const modal = document.createElement('div');
    modal.className = 'ai-file-modal';
    modal.innerHTML = `
      <div class="ai-file-modal-content">
        <h3>Available Files</h3>
        <div class="ai-file-list">
          <div class="ai-file-item" data-file="resume">
            📄 Amit_Ranjan_Maurya_21BCS1272.pdf
            <span class="ai-file-desc">Complete Resume</span>
          </div>
          <div class="ai-file-item" data-file="portfolio">
            🌐 Portfolio Website
            <span class="ai-file-desc">Live Portfolio</span>
          </div>
          <div class="ai-file-item" data-file="research">
            📚 Research Paper
            <span class="ai-file-desc">Academic Publication</span>
          </div>
        </div>
        <button class="ai-file-close">Close</button>
      </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners
    modal.querySelector('.ai-file-close').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    modal.querySelectorAll('.ai-file-item').forEach(item => {
      item.addEventListener('click', () => {
        const fileType = item.getAttribute('data-file');
        this.shareFile(fileType);
        document.body.removeChild(modal);
      });
    });
  }

  shareFile(fileType) {
    let message = '';
    switch(fileType) {
      case 'resume':
        message = 'Here is Amit\'s complete resume (Amit_Ranjan_Maurya_21BCS1272.pdf) with his education, experience, skills, and achievements. What specific section would you like me to explain?';
        break;
      case 'portfolio':
        message = 'You\'re currently viewing Amit\'s live portfolio website at https://amitranjanmaurya.com. It showcases his projects, skills, and services. What would you like to explore?';
        break;
      case 'research':
        message = 'Amit has published research work available at https://independent.academia.edu/AmitRanjanMaurya. His research focuses on machine learning applications and data science. Would you like to know more about his academic contributions?';
        break;
    }
    
    this.addMessageToChat(message, 'bot');
  }

  showRecommendations(interests) {
    // Find the category with highest interest
    const topInterest = Object.keys(interests).reduce((a, b) => 
      interests[a] > interests[b] ? a : b
    );

    // Show relevant recommendation
    const recommendations = {
      web: "Based on your interest in web development, you might also like the Interactive Portfolio Website project!",
      data: "Since you're interested in data science, check out the Sales Prediction ML Model with 92% accuracy!",
      ai: "You seem interested in AI! Don't miss the AI-Powered Customer Support Bot project.",
      mobile: "Interested in mobile development? The Collaborative Task Manager might be perfect for you!"
    };

    if (interests[topInterest] > 3) {
      this.showNotification(recommendations[topInterest]);
    }
  }

  addIntelligentSearch() {
    // Add AI-powered search functionality
    const searchInput = document.createElement('div');
    searchInput.className = 'ai-search-widget';
    searchInput.innerHTML = `
      <div class="ai-search-container">
        <input type="text" id="ai-search-input" placeholder="Ask AI to find something..." />
        <button id="ai-search-btn">🔍</button>
      </div>
      <div class="ai-search-results" id="ai-search-results"></div>
    `;

    // Add to header if it exists
    const header = document.querySelector('.site-header .container');
    if (header) {
      header.appendChild(searchInput);
    }
  }

  addPersonalizedContent() {
    // Add personalized greetings based on time and user behavior
    const now = new Date();
    const hour = now.getHours();
    let greeting = '';

    if (hour < 12) greeting = 'Good morning!';
    else if (hour < 17) greeting = 'Good afternoon!';
    else greeting = 'Good evening!';

    // Add personalized welcome message
    setTimeout(() => {
      this.showNotification(`${greeting} Welcome to Amit's portfolio! 🤖 I'm his AI assistant with access to his complete resume and portfolio. Click the chat icon to learn about his background, skills, and experience!`);
    }, 3000);
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'ai-notification';
    notification.innerHTML = `
      <div class="ai-notification-content">
        <div class="ai-notification-icon">🤖</div>
        <div class="ai-notification-text">${message}</div>
        <button class="ai-notification-close">×</button>
      </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);

    // Manual close
    notification.querySelector('.ai-notification-close').addEventListener('click', () => {
      notification.classList.add('fade-out');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });
  }
  // Additional Advanced Features
  addConversationExport() {
    // Add export button to chat header
    const header = document.querySelector('.ai-chat-header');
    const exportBtn = document.createElement('button');
    exportBtn.className = 'ai-export-btn';
    exportBtn.innerHTML = '💾';
    exportBtn.title = 'Export conversation';
    
    header.insertBefore(exportBtn, document.getElementById('ai-close-btn'));

    exportBtn.addEventListener('click', () => {
      this.exportConversation();
    });
  }

  exportConversation() {
    const messages = document.querySelectorAll('.ai-message');
    let conversation = 'AI Portfolio Assistant Conversation\n';
    conversation += '=====================================\n\n';
    
    messages.forEach(msg => {
      const sender = msg.classList.contains('ai-message-user') ? 'You' : 'AI Assistant';
      const content = msg.querySelector('.ai-message-content p').textContent;
      const time = msg.querySelector('.ai-message-time')?.textContent || '';
      
      conversation += `${sender} (${time}):\n${content}\n\n`;
    });

    // Create and download file
    const blob = new Blob([conversation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-conversation-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  addThemeAdaptation() {
    // Adapt chatbot theme based on site theme
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          this.updateChatbotTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    this.updateChatbotTheme();
  }

  updateChatbotTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const chatWidget = document.querySelector('.ai-chatbot-widget');
    
    if (chatWidget) {
      chatWidget.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
  }

  addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K to open chat
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const toggle = document.getElementById('ai-chat-toggle');
        const panel = document.getElementById('ai-chat-panel');
        
        if (!panel.classList.contains('open')) {
          toggle.click();
        }
      }
      
      // Escape to close chat
      if (e.key === 'Escape') {
        const panel = document.getElementById('ai-chat-panel');
        if (panel && panel.classList.contains('open')) {
          panel.classList.remove('open');
          document.getElementById('ai-chat-toggle').classList.remove('active');
        }
      }
    });
  }

  addAnalytics() {
    // Track chatbot usage
    this.analytics = {
      sessionsStarted: 0,
      messagesExchanged: 0,
      popularQueries: {},
      averageSessionLength: 0
    };

    // Load existing analytics
    const saved = localStorage.getItem('ai-analytics');
    if (saved) {
      this.analytics = { ...this.analytics, ...JSON.parse(saved) };
    }
  }

  trackEvent(event, data = {}) {
    switch(event) {
      case 'session_start':
        this.analytics.sessionsStarted++;
        this.sessionStartTime = Date.now();
        break;
      case 'message_sent':
        this.analytics.messagesExchanged++;
        if (data.query) {
          this.analytics.popularQueries[data.query] = (this.analytics.popularQueries[data.query] || 0) + 1;
        }
        break;
      case 'session_end':
        if (this.sessionStartTime) {
          const sessionLength = Date.now() - this.sessionStartTime;
          this.analytics.averageSessionLength = 
            (this.analytics.averageSessionLength + sessionLength) / 2;
        }
        break;
    }

    // Save analytics
    localStorage.setItem('ai-analytics', JSON.stringify(this.analytics));
  }
}

// AI-Powered Content Generator
class AIContentGenerator {
  constructor() {
    this.apiKey = 'YOUR_OPENROUTER_API_KEY'; // Replace with your actual API key
    this.apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  }

  async generateProjectDescription(projectTitle, technologies) {
    const prompt = `Generate a professional project description for a portfolio website. 
    Project: ${projectTitle}
    Technologies: ${technologies.join(', ')}
    
    Make it engaging, highlight key features, and keep it under 100 words.`;

    try {
      const response = await this.callAI(prompt);
      return response;
    } catch (error) {
      console.error('Error generating content:', error);
      return `Professional ${projectTitle} built with ${technologies.join(', ')}. Features modern design, optimal performance, and user-friendly interface.`;
    }
  }

  async generateServiceBenefits(serviceName) {
    const prompt = `Generate 5 key benefits for the service: ${serviceName}
    Make them compelling and professional for a portfolio website.
    Format as bullet points.`;

    try {
      const response = await this.callAI(prompt);
      return response.split('\n').filter(line => line.trim());
    } catch (error) {
      console.error('Error generating benefits:', error);
      return [
        'Professional quality delivery',
        'Modern technology stack',
        'Responsive design',
        'Performance optimized',
        'Ongoing support included'
      ];
    }
  }

  async callAI(prompt) {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Amit Ranjan Maurya Portfolio'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AIPortfolioAssistant, AIContentGenerator };
}

// Enhanced initialization with all features
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Enhanced AI Portfolio Assistant...');
  
  // Initialize AI assistant with all features
  window.aiAssistant = new AIPortfolioAssistant();
  window.aiContentGenerator = new AIContentGenerator();
  
  // Add keyboard shortcuts info
  setTimeout(() => {
    if (window.aiAssistant) {
      window.aiAssistant.showNotification('💡 Pro tip: Press Ctrl+K to quickly open the AI assistant, or Escape to close it!');
    }
  }, 8000);
  
  console.log('Enhanced AI features initialized successfully!');
});