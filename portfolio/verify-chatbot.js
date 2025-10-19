// Verification script to check if chatbot is working
console.log('Verification script loaded');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready, checking for chatbot...');
  
  // Check after a short delay to allow AI features to initialize
  setTimeout(() => {
    const chatbot = document.querySelector('.ai-chatbot-widget');
    const toggle = document.getElementById('ai-chat-toggle');
    const panel = document.getElementById('ai-chat-panel');
    
    console.log('Chatbot widget found:', !!chatbot);
    console.log('Toggle button found:', !!toggle);
    console.log('Chat panel found:', !!panel);
    
    if (chatbot) {
      console.log('✅ Chatbot is present on the page');
      
      // Add a visual indicator
      const indicator = document.createElement('div');
      indicator.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: green;
        color: white;
        padding: 10px;
        border-radius: 5px;
        z-index: 9999;
        font-family: Arial, sans-serif;
      `;
      indicator.textContent = '✅ AI Chatbot is working!';
      document.body.appendChild(indicator);
      
      // Remove indicator after 3 seconds
      setTimeout(() => {
        if (indicator.parentNode) {
          indicator.parentNode.removeChild(indicator);
        }
      }, 3000);
    } else {
      console.log('❌ Chatbot not found');
      
      // Add error indicator
      const errorIndicator = document.createElement('div');
      errorIndicator.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: red;
        color: white;
        padding: 10px;
        border-radius: 5px;
        z-index: 9999;
        font-family: Arial, sans-serif;
      `;
      errorIndicator.textContent = '❌ AI Chatbot not found';
      document.body.appendChild(errorIndicator);
    }
    
    // Check if AI assistant is initialized
    if (window.aiAssistant) {
      console.log('✅ AI Assistant instance found');
    } else {
      console.log('❌ AI Assistant instance not found');
    }
  }, 2000);
});