/* ================================
   AI CHAT WIDGET MODULE
   ================================ */

class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.unreadCount = 0;
        this.isTyping = false;
        
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
        this.showWelcomeMessage();
        
        // Optional: Add pulse animation to FAB after 3 seconds
        setTimeout(() => {
            const fabBtn = document.querySelector('.chat-fab-button');
            if (fabBtn && !this.isOpen) {
                fabBtn.classList.add('pulse');
            }
        }, 3000);
    }

    render() {
        const chatHTML = `
            <!-- Chat Backdrop -->
            <div class="chat-backdrop" id="chatBackdrop"></div>

            <!-- Chat Widget Container -->
            <div class="chat-widget-container">
                <!-- Floating Action Button -->
                <button class="chat-fab-button" id="chatFabBtn" aria-label="Open chat">
                    <!-- Chat Icon -->
                    <svg class="chat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                    </svg>
                    <!-- Close Icon -->
                    <svg class="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                    <!-- Unread Badge -->
                    <span class="chat-badge" id="chatBadge" style="display: none;">0</span>
                </button>

                <!-- Chat Interface -->
                <div class="chat-interface" id="chatInterface">
                    <!-- Header -->
                    <div class="chat-header">
                        <div class="chat-header-info">
                            <div class="chat-avatar">
                                🤖
                            </div>
                            <div class="chat-title-block">
                                <h3>AI Assistant</h3>
                                <div class="chat-status">
                                    <span class="status-dot"></span>
                                    <span>Online</span>
                                </div>
                            </div>
                        </div>
                        <button class="chat-close-btn" id="chatCloseBtn" aria-label="Close chat">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Messages Area -->
                    <div class="chat-messages" id="chatMessages">
                        <!-- Messages will be inserted here -->
                    </div>

                    <!-- Quick Actions -->
                    <div class="chat-quick-actions" id="chatQuickActions">
                        <div class="quick-action-title">Quick Actions</div>
                        <div class="quick-actions-grid">
                            <button class="quick-action-btn" data-action="projects">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                                </svg>
                                View Projects
                            </button>
                            <button class="quick-action-btn" data-action="skills">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"/>
                                </svg>
                                My Skills
                            </button>
                            <button class="quick-action-btn" data-action="experience">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                                </svg>
                                Experience
                            </button>
                            <button class="quick-action-btn" data-action="contact">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                                Contact Me
                            </button>
                        </div>
                    </div>

                    <!-- Input Area -->
                    <div class="chat-input-container">
                        <div class="chat-input-wrapper">
                            <textarea 
                                class="chat-input" 
                                id="chatInput" 
                                placeholder="Type your message..."
                                rows="1"
                            ></textarea>
                            <button class="chat-send-btn" id="chatSendBtn" aria-label="Send message">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    attachEventListeners() {
        // FAB Button
        const fabBtn = document.getElementById('chatFabBtn');
        fabBtn.addEventListener('click', () => this.toggleChat());

        // Close Button
        const closeBtn = document.getElementById('chatCloseBtn');
        closeBtn.addEventListener('click', () => this.closeChat());

        // Backdrop
        const backdrop = document.getElementById('chatBackdrop');
        backdrop.addEventListener('click', () => this.closeChat());

        // Send Button
        const sendBtn = document.getElementById('chatSendBtn');
        sendBtn.addEventListener('click', () => this.sendMessage());

        // Input Field
        const input = document.getElementById('chatInput');
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        input.addEventListener('input', () => {
            input.style.height = 'auto';
            input.style.height = Math.min(input.scrollHeight, 100) + 'px';
        });

        // Quick Action Buttons
        const quickActionBtns = document.querySelectorAll('.quick-action-btn');
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickAction(action);
            });
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        const fabBtn = document.getElementById('chatFabBtn');
        const chatInterface = document.getElementById('chatInterface');
        const backdrop = document.getElementById('chatBackdrop');

        fabBtn.classList.add('active');
        fabBtn.classList.remove('pulse');
        chatInterface.classList.add('active');
        backdrop.classList.add('active');
        
        // Reset unread count
        this.unreadCount = 0;
        this.updateBadge();

        // Focus on input
        setTimeout(() => {
            document.getElementById('chatInput').focus();
        }, 300);
    }

    closeChat() {
        this.isOpen = false;
        const fabBtn = document.getElementById('chatFabBtn');
        const chatInterface = document.getElementById('chatInterface');
        const backdrop = document.getElementById('chatBackdrop');

        fabBtn.classList.remove('active');
        chatInterface.classList.remove('active');
        backdrop.classList.remove('active');
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');

        // Clear input
        input.value = '';
        input.style.height = 'auto';

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate AI response after delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot', true);
        }, 1500);
    }

    addMessage(text, sender, showRating = false) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageId = `msg-${Date.now()}`;
        const time = new Date().toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });

        const messageHTML = `
            <div class="message ${sender}" data-id="${messageId}">
                <div class="message-avatar">
                    ${sender === 'bot' ? '🤖' : '👤'}
                </div>
                <div class="message-content">
                    <div class="message-bubble">${text}</div>
                    <div class="message-time">${time}</div>
                    ${showRating ? `
                        <div class="message-rating">
                            <button class="rating-btn" data-rating="up" aria-label="Helpful">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                                </svg>
                            </button>
                            <button class="rating-btn" data-rating="down" aria-label="Not helpful">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
                                </svg>
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);

        // Add event listeners to rating buttons
        if (showRating) {
            const ratingBtns = messagesContainer.querySelectorAll(`[data-id="${messageId}"] .rating-btn`);
            ratingBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const rating = e.currentTarget.dataset.rating;
                    this.handleRating(messageId, rating, ratingBtns);
                });
            });
        }

        // Scroll to bottom
        this.scrollToBottom();

        // Update message history
        this.messages.push({ text, sender, time });

        // If chat is closed and it's a bot message, increment unread count
        if (!this.isOpen && sender === 'bot') {
            this.unreadCount++;
            this.updateBadge();
        }
    }

    showTypingIndicator() {
        this.isTyping = true;
        const messagesContainer = document.getElementById('chatMessages');
        
        const typingHTML = `
            <div class="message bot typing-indicator" id="typingIndicator">
                <div class="message-avatar">🤖</div>
                <div class="typing-dots">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    updateBadge() {
        const badge = document.getElementById('chatBadge');
        if (this.unreadCount > 0) {
            badge.textContent = this.unreadCount > 9 ? '9+' : this.unreadCount;
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }
    }

    handleRating(messageId, rating, buttons) {
        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        const clickedBtn = Array.from(buttons).find(btn => btn.dataset.rating === rating);
        if (clickedBtn) {
            clickedBtn.classList.add('active');
        }

        // Here you could send the rating to your analytics or backend
        console.log(`Message ${messageId} rated: ${rating}`);
    }

    handleQuickAction(action) {
        const responses = {
            projects: "I'd be happy to show you my projects! You can find my portfolio work in the Projects section below. Would you like to know more about any specific project?",
            skills: "I have expertise in various areas including Data Science, Machine Learning, Python, SQL, and more. Check out the Skills section to see my full technical stack!",
            experience: "I have professional experience in data analytics and machine learning. You can view my detailed work history in the Experience section. Would you like to know about a specific role?",
            contact: "Feel free to reach out! You can find my contact information in the Contact section, or use the contact form to send me a message directly. I'm always open to new opportunities and collaborations!"
        };

        const userMessage = action.charAt(0).toUpperCase() + action.slice(1);
        this.addMessage(userMessage, 'user');

        setTimeout(() => {
            this.showTypingIndicator();
            setTimeout(() => {
                this.hideTypingIndicator();
                this.addMessage(responses[action], 'bot', true);
            }, 1000);
        }, 300);
    }

    generateResponse(userMessage) {
        // Simple keyword-based responses for demo
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! 👋 I'm here to help you learn more about Maheshwor's work and experience. What would you like to know?";
        }

        if (lowerMessage.includes('project')) {
            return "Great question! Maheshwor has worked on several impressive projects including machine learning models, data analysis dashboards, and more. Would you like to explore the Projects section?";
        }

        if (lowerMessage.includes('skill')) {
            return "Maheshwor has expertise in Data Science, Machine Learning, Python, SQL, and various analytics tools. Check out the Skills section for a complete overview!";
        }

        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            return "You can reach out through the Contact section below. Feel free to send a message or connect via LinkedIn!";
        }

        if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
            return "Maheshwor has professional experience in data analytics and machine learning roles. Visit the Experience section to see detailed information about past positions and accomplishments!";
        }

        if (lowerMessage.includes('education')) {
            return "Maheshwor's educational background includes degrees in data science and related fields. Check out the Education section for more details!";
        }

        if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
            return "You can download Maheshwor's resume directly from this website. Look for the 'Download Resume' button in the navigation or contact section!";
        }

        // Default response
        return "That's an interesting question! I'm here to help you navigate this portfolio. You can explore different sections using the quick action buttons, or feel free to ask me anything specific about Maheshwor's work, skills, or experience!";
    }

    showWelcomeMessage() {
        // Show a welcome message after a short delay
        setTimeout(() => {
            const welcomeMessages = [
                "👋 Hi there! I'm Maheshwor's AI assistant. How can I help you today?",
                "Feel free to ask me about projects, skills, experience, or use the quick action buttons below!"
            ];

            welcomeMessages.forEach((msg, index) => {
                setTimeout(() => {
                    this.addMessage(msg, 'bot', index === welcomeMessages.length - 1);
                }, index * 800);
            });
        }, 1000);
    }
}

// Initialize chat widget when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ChatWidget();
    });
} else {
    new ChatWidget();
}

export default ChatWidget;

