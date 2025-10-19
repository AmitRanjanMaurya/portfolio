// ===== AI CONFIGURATION =====

// AI Configuration Object
const AI_CONFIG = {
  // Replace with your actual OpenRouter API key
  API_KEY: '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',
  
  // API Settings
  API_URL: 'https://openrouter.ai/api/v1/chat/completions',
  MODEL: 'openai/gpt-3.5-turbo',
  MAX_TOKENS: 300,
  TEMPERATURE: 0.7,
  
  // Feature Toggles
  FEATURES: {
    AI_CHAT: true,
    SMART_RECOMMENDATIONS: true,
    INTELLIGENT_SEARCH: true,
    PERSONALIZED_CONTENT: true,
    AUTO_NOTIFICATIONS: true
  },
  
  // Chat Settings
  CHAT_SETTINGS: {
    WELCOME_DELAY: 3000, // 3 seconds
    NOTIFICATION_DURATION: 5000, // 5 seconds
    MAX_CONVERSATION_HISTORY: 10,
    TYPING_SPEED: 50 // milliseconds per character
  },
  
  // Portfolio Context for AI
  PORTFOLIO_CONTEXT: {
    name: 'Amit Ranjan Maurya',
    title: 'Full Stack Developer & Data Scientist',
    rollNumber: '21BCS1272',
    resumeFile: 'Amit_Ranjan_Maurya_21BCS1272.pdf',
    
    // Personal Information
    personal: {
      email: 'amit.maurya@example.com',
      phone: '+91-XXXXXXXXXX',
      location: 'India',
      linkedin: 'linkedin.com/in/amit-ranjan-maurya',
      github: 'github.com/amit-ranjan-maurya',
      portfolio: 'https://amitranjanmaurya.com',
      researchPapers: 'https://independent.academia.edu/AmitRanjanMaurya'
    },
    
    // Education
    education: {
      degree: 'Bachelor of Computer Science',
      rollNumber: '21BCS1272',
      university: 'University Name',
      year: '2021-2025',
      cgpa: 'X.XX/10.0',
      relevantCourses: [
        'Data Structures & Algorithms',
        'Database Management Systems',
        'Web Development',
        'Machine Learning',
        'Software Engineering',
        'Computer Networks',
        'Operating Systems',
        'Artificial Intelligence'
      ]
    },
    
    // Professional Experience
    experience: [
      {
        title: 'Full Stack Developer',
        company: 'Tech Company',
        duration: '2023 - Present',
        responsibilities: [
          'Developed responsive web applications using React.js and Node.js',
          'Implemented RESTful APIs and database integration',
          'Collaborated with cross-functional teams on agile projects',
          'Optimized application performance and user experience'
        ]
      },
      {
        title: 'Data Science Intern',
        company: 'Analytics Firm',
        duration: '2022 - 2023',
        responsibilities: [
          'Built machine learning models for predictive analytics',
          'Created data visualizations and dashboards',
          'Performed statistical analysis on large datasets',
          'Presented insights to stakeholders'
        ]
      }
    ],
    
    // Certifications
    certifications: [
      'AWS Certified Developer Associate',
      'Google Analytics Certified',
      'Microsoft Azure Fundamentals',
      'MongoDB Certified Developer',
      'React Developer Certification'
    ],
    
    // Achievements
    achievements: [
      'Winner of College Hackathon 2023',
      'Published research papers on ML applications (Available at: https://independent.academia.edu/AmitRanjanMaurya)',
      'Led development team of 5 members',
      'Maintained 95%+ client satisfaction rate',
      'Contributed to 10+ open source projects'
    ],
    
    // Research & Publications
    research: {
      academiaProfile: 'https://independent.academia.edu/AmitRanjanMaurya',
      publications: [
        'Machine Learning Applications in Web Development',
        'Data Science Approaches for Business Intelligence',
        'AI-Powered Solutions for Modern Applications'
      ]
    }
    
    skills: {
      frontend: {
        'React.js': 95,
        'JavaScript': 90,
        'Next.js': 88,
        'CSS3/SCSS': 92,
        'TypeScript': 85
      },
      backend: {
        'Node.js': 88,
        'Python': 85,
        '.NET Core': 80,
        'REST APIs': 90,
        'GraphQL': 75
      },
      dataScience: {
        'Python/Pandas/NumPy': 82,
        'Machine Learning': 78,
        'SQL/NoSQL': 85,
        'Data Visualization': 80
      },
      tools: {
        'Git/GitHub': 88,
        'Docker': 75,
        'AWS/Cloud': 70,
        'VS Code': 82
      }
    },
    
    services: [
      {
        name: 'Web Development',
        price: '₹15,000',
        description: 'Modern, responsive websites and web applications'
      },
      {
        name: 'Data Science & Analytics',
        price: '₹20,000',
        description: 'ML models, data visualization, predictive analytics'
      },
      {
        name: 'AI & Machine Learning',
        price: '₹25,000',
        description: 'Chatbots, automation, NLP, computer vision'
      },
      {
        name: 'Mobile App Development',
        price: '₹30,000',
        description: 'Cross-platform apps with React Native/Flutter'
      },
      {
        name: 'API Development',
        price: '₹12,000',
        description: 'REST/GraphQL APIs, integrations'
      },
      {
        name: 'Technical Consulting',
        price: '₹5,000/hr',
        description: 'Architecture, code review, optimization'
      }
    ],
    
    projects: [
      {
        name: 'Advanced E-Commerce Platform',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        description: 'Full-stack e-commerce solution with real-time inventory'
      },
      {
        name: 'Real-Time Analytics Dashboard',
        tech: ['Python', 'D3.js', 'Flask', 'PostgreSQL'],
        description: 'Interactive dashboard with ML insights'
      },
      {
        name: 'AI-Powered Customer Support Bot',
        tech: ['Python', 'TensorFlow', 'NLP', 'FastAPI'],
        description: 'Intelligent chatbot with 95% accuracy'
      }
    ],
    
    contact: {
      linkedin: 'linkedin.com/in/amit-ranjan-maurya',
      instagram: 'instagram.com/amitranjanmaurya',
      availability: 'Available for projects and consultations'
    },
    
    pricing: {
      basic: { monthly: '₹8,000', project: '₹6,400' },
      professional: { monthly: '₹15,000', project: '₹12,000' },
      premium: { monthly: '₹25,000', project: '₹20,000' },
      enterprise: { monthly: '₹50,000', project: '₹40,000' }
    }
  },
  
  // AI Response Templates
  RESPONSE_TEMPLATES: {
    greeting: [
      "Hi! I'm Amit's AI assistant. I can help you learn about his skills, projects, experience, and services. What interests you?",
      "Hello! I'm here to help you explore Amit's portfolio, resume, and professional background. What would you like to know?",
      "Welcome! I can tell you about Amit's education, experience, skills, projects, and services. How can I assist you today?"
    ],
    
    resume: [
      "Amit's resume (Amit_Ranjan_Maurya_21BCS1272.pdf) contains comprehensive details about his education, experience, and achievements. I can tell you about any specific section - education, experience, skills, projects, or certifications. What would you like to know?",
      "I have all the information from Amit's resume! He's a Computer Science student (Roll: 21BCS1272) with extensive experience in full-stack development and data science. What specific details interest you?",
      "Amit's resume showcases his journey from a CS student (21BCS1272) to a skilled developer and data scientist. I can share details about his education, work experience, projects, or achievements. What would you like to explore?"
    ],
    
    education: [
      "Amit is pursuing his Bachelor of Computer Science (Roll Number: 21BCS1272) from {university}, graduating in 2025. His coursework includes Data Structures, Machine Learning, Web Development, and more. Would you like to know about specific courses?",
      "He's a Computer Science student with roll number 21BCS1272, focusing on modern technologies and practical applications. His academic background covers everything from algorithms to AI. Any specific area you'd like to know about?"
    ],
    
    experience: [
      "Amit has professional experience as a Full Stack Developer and Data Science Intern. He's worked on web applications, APIs, machine learning models, and data visualization. Would you like details about any specific role?",
      "His experience spans full-stack development and data science, with hands-on work in React.js, Node.js, Python, and ML models. He's led teams and maintained high client satisfaction. What interests you most?"
    ],
    
    achievements: [
      "Amit has won college hackathons, published research papers, led development teams, and contributed to open source projects. He maintains 95%+ client satisfaction and has multiple certifications. Which achievement would you like to know more about?",
      "His achievements include hackathon victories, research publications, team leadership, and extensive open source contributions. He's also AWS and Google certified. What specific accomplishment interests you?"
    ]
    
    skills: [
      "Amit is highly skilled in {skill} with {percentage}% proficiency. Would you like to know more about his other skills?",
      "His expertise in {skill} is quite impressive at {percentage}%. He also excels in many other technologies!"
    ],
    
    projects: [
      "The {project} is one of Amit's standout projects, built with {tech}. {description}",
      "I'd love to tell you about the {project}! It's a {description} using {tech}."
    ],
    
    services: [
      "Amit offers {service} starting at {price}. {description}",
      "The {service} service is priced at {price} and includes {description}"
    ],
    
    contact: [
      "You can reach Amit through LinkedIn at {linkedin} or Instagram at {instagram}. He's {availability}!",
      "Amit is {availability}. Connect with him on LinkedIn: {linkedin} or Instagram: {instagram}"
    ],
    
    fallback: [
      "I'm not sure about that specific question, but I can tell you about Amit's skills, projects, services, or how to contact him. What interests you?",
      "That's an interesting question! While I focus on Amit's professional work, I can help you learn about his expertise, projects, or services. What would you like to know?",
      "I specialize in information about Amit's portfolio. I can discuss his technical skills, completed projects, available services, or contact information. What catches your interest?"
    ]
  },
  
  // Smart Recommendations
  RECOMMENDATIONS: {
    web: [
      "Based on your interest in web development, you might also like the Interactive Portfolio Website project!",
      "Since you're exploring web development, check out Amit's React and Node.js expertise!",
      "Web development caught your attention? The E-Commerce Platform project showcases modern web technologies!"
    ],
    
    data: [
      "Since you're interested in data science, check out the Sales Prediction ML Model with 92% accuracy!",
      "Data science is fascinating! Amit's Analytics Dashboard project might interest you.",
      "Given your data science interest, you should see Amit's machine learning and visualization skills!"
    ],
    
    ai: [
      "You seem interested in AI! Don't miss the AI-Powered Customer Support Bot project.",
      "AI development is exciting! Amit specializes in NLP, computer vision, and custom AI solutions.",
      "Since AI interests you, check out Amit's machine learning and TensorFlow expertise!"
    ],
    
    mobile: [
      "Interested in mobile development? The Collaborative Task Manager might be perfect for you!",
      "Mobile apps are the future! Amit creates cross-platform solutions with React Native and Flutter.",
      "Since you're interested in mobile, you should know Amit builds apps for both iOS and Android!"
    ]
  }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AI_CONFIG;
} else {
  window.AI_CONFIG = AI_CONFIG;
}

// Initialize AI with configuration
document.addEventListener('DOMContentLoaded', () => {
  if (window.AIPortfolioAssistant && AI_CONFIG.FEATURES.AI_CHAT) {
    console.log('AI Configuration loaded successfully!');
  }
});