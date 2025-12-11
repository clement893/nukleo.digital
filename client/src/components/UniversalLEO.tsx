import { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';

// Generate a simple UUID v4
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

type PageContext = 'home' | 'agencies' | 'services' | 'contact' | 'projects' | 'about' | 'default';
type Emotion = 'default' | 'happy' | 'thinking' | 'surprised' | 'confused' | 'excited';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface UniversalLEOProps {
  pageContext?: PageContext;
}

// Prompts d'accueil personnalisés par page
const welcomeMessages: Record<PageContext, string> = {
  home: "👋 Hi! I'm LEO, Nukleo's AI assistant. I'm here to help you explore how AI can transform your business. What brings you here today?",
  agencies: "👋 Welcome! I'm LEO. Looking to scale your agency with Nukleo's nearshore team? I can help you understand our partnership model. What's your biggest challenge right now?",
  services: "👋 Hi! I'm LEO. Interested in our services? Whether it's AI Lab, Strategic Bureau, or Creative Studio, I can help you find the right fit. What are you looking to achieve?",
  contact: "👋 Hi! I'm LEO. Ready to connect with our team? Tell me a bit about your project and I'll make sure you get the right help.",
  projects: "👋 Hi! I'm LEO. Inspired by our work? I'd love to hear about your project vision. What kind of transformation are you considering?",
  about: "👋 Hi! I'm LEO. Want to know more about Nukleo? Ask me anything about our team, culture, or approach!",
  default: "👋 Hi! I'm LEO, your AI assistant at Nukleo. How can I help you today?",
};

export default function UniversalLEO({ pageContext = 'default' }: UniversalLEOProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [sessionId] = useState(() => generateUUID());
  const [sessionStartTime] = useState(() => Date.now());
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>('default');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.leo.chat.useMutation();
  const saveLeoContact = trpc.leo.saveContact.useMutation();
  const saveAgencyLead = trpc.agencies.saveLead.useMutation();
  
  // Detect emotion from message content
  const detectEmotion = (content: string): Emotion => {
    const lowerContent = content.toLowerCase();
    
    // Excited: achievements, success, great results
    if (lowerContent.match(/(excellent|amazing|fantastic|great|perfect|wonderful|awesome|brilliant)/)) {
      return 'excited';
    }
    
    // Happy: positive outcomes, solutions
    if (lowerContent.match(/(yes|sure|happy|glad|pleased|delighted|good|nice)/)) {
      return 'happy';
    }
    
    // Surprised: unexpected info, interesting facts
    if (lowerContent.match(/(wow|really|interesting|surprising|unexpected|actually|indeed)/)) {
      return 'surprised';
    }
    
    // Confused: questions, uncertainties
    if (lowerContent.match(/(\?|confused|unclear|not sure|maybe|perhaps|possibly|hmm)/)) {
      return 'confused';
    }
    
    // Thinking: analysis, consideration, complex topics
    if (lowerContent.match(/(consider|analyze|think|evaluate|assess|review|examine|let me|let's)/)) {
      return 'thinking';
    }
    
    return 'default';
  };

  // Avatar mapping
  const getAvatarSrc = (emotion: Emotion): string => {
    switch (emotion) {
      case 'happy': return '/leo-avatar-happy.png';
      case 'thinking': return '/leo-avatar-thinking.png';
      case 'surprised': return '/leo-avatar-surprised.png';
      case 'confused': return '/leo-avatar-confused.png';
      case 'excited': return '/leo-avatar-excited.png';
      default: return '/leo-avatar.png';
    }
  };
  
  // Track session creation
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      // Create session on first interaction
      fetch('/api/trpc/leo.createSession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          pageContext,
        }),
      }).catch(err => console.error('Failed to create session:', err));
    }
  }, [isOpen, messages.length, sessionId, pageContext]);
  
  // Update session on message count change
  useEffect(() => {
    if (messages.length > 0) {
      const conversationDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
      fetch('/api/trpc/leo.updateSession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          messageCount: messages.length,
          conversationDuration,
        }),
      }).catch(err => console.error('Failed to update session:', err));
    }
  }, [messages.length, sessionId, sessionStartTime]);

  const storageKey = `leo-${pageContext}-interacted`;

  // Auto-open after 10 seconds if not interacted
  useEffect(() => {
    const hasSeenBefore = localStorage.getItem(storageKey);
    if (hasSeenBefore) {
      setHasInteracted(true);
      return;
    }

    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setIsOpen(true);
        // Add welcome message
        setMessages([{
          role: 'assistant',
          content: welcomeMessages[pageContext],
        }]);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [hasInteracted, pageContext, storageKey]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingText]);

  // Extract email from text using regex
  const extractEmail = (text: string): string | null => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const match = text.match(emailRegex);
    return match ? match[0] : null;
  };

  // Extract structured data from conversation
  const extractDataFromConversation = (messages: Message[]): Record<string, any> => {
    const data: Record<string, any> = {};
    const fullConversation = messages.map(m => m.content).join(' ');

    // Extract email
    const email = extractEmail(fullConversation);
    if (email) data.email = email;

    // Extract name (simple heuristic: "I'm X" or "My name is X")
    const nameMatch = fullConversation.match(/(?:I'm|I am|my name is|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
    if (nameMatch) data.name = nameMatch[1];

    // For agencies context, extract additional data
    if (pageContext === 'agencies') {
      // Extract company name
      const companyMatch = fullConversation.match(/(?:work at|from|company is|agency is)\s+([A-Z][a-zA-Z\s&]+)/);
      if (companyMatch) data.companyName = companyMatch[1].trim();

      // Extract budget mentions
      if (/100k\+|100,000|six figures/i.test(fullConversation)) data.budget = '100k+';
      else if (/50-100k|50k-100k|50,000-100,000/i.test(fullConversation)) data.budget = '50-100k';
      else if (/10-50k|10k-50k|10,000-50,000/i.test(fullConversation)) data.budget = '10-50k';
      else if (/<10k|under 10k|less than 10,000/i.test(fullConversation)) data.budget = '<10k';

      // Extract urgency
      if (/immediate|urgent|asap|right away|now/i.test(fullConversation)) data.urgency = 'Immediate';
      else if (/1-3 months|next quarter|soon/i.test(fullConversation)) data.urgency = '1-3 months';
      else if (/3-6 months|later this year/i.test(fullConversation)) data.urgency = '3-6 months';
      else if (/exploring|just looking|researching/i.test(fullConversation)) data.urgency = 'Just exploring';

      // Extract agency size
      if (/50\+|more than 50|over 50/i.test(fullConversation)) data.agencySize = '50+';
      else if (/21-50|20-50/i.test(fullConversation)) data.agencySize = '21-50';
      else if (/6-20|10-20/i.test(fullConversation)) data.agencySize = '6-20';
      else if (/1-5|small team|few people/i.test(fullConversation)) data.agencySize = '1-5';
    }

    return data;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || chatMutation.isPending) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');

    try {
      // Call AI chat
      const response = await chatMutation.mutateAsync({
        messages: newMessages,
      });

      const fullText = typeof response.content === 'string' ? response.content : '';
      
      // Detect emotion from response
      const detectedEmotion = detectEmotion(fullText);
      setCurrentEmotion(detectedEmotion);
      
      // Simulate typing effect
      setIsTyping(true);
      setTypingText('');
      
      let currentIndex = 0;
      const typingInterval = setInterval(async () => {
        if (currentIndex < fullText.length) {
          setTypingText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          
          const assistantMessage: Message = {
            role: 'assistant',
            content: fullText,
          };
          
          const updatedMessages = [...newMessages, assistantMessage];
          setMessages(updatedMessages);
          setTypingText('');

          // Show email modal after 3 messages (6 total including responses)
          if (!emailCaptured && updatedMessages.length >= 6 && !showEmailModal) {
            setShowEmailModal(true);
          }

          // Try to extract and save data if email is found
          if (!emailCaptured) {
            const extractedData = extractDataFromConversation(updatedMessages);
            
            if (extractedData.email) {
              setEmailCaptured(true);
              
              // Update session with email capture
              const conversationDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
              fetch('/api/trpc/leo.updateSession', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  sessionId,
                  emailCaptured: 1,
                  capturedEmail: extractedData.email,
                  conversationDuration,
                  completedAt: new Date(),
                }),
              }).catch(err => console.error('Failed to update session:', err));
              
              // Save based on context
              if (pageContext === 'agencies' && extractedData.companyName) {
                saveAgencyLead.mutateAsync({
                  email: extractedData.email,
                  companyName: extractedData.companyName,
                  agencySize: extractedData.agencySize,
                  budget: extractedData.budget,
                  urgency: extractedData.urgency,
                  techNeeds: undefined,
                }).catch(err => console.error('Failed to save agency lead:', err));
              } else {
                // Save as LEO contact
                saveLeoContact.mutateAsync({
                  email: extractedData.email,
                  name: extractedData.name || '',
                  conversationContext: JSON.stringify({
                    pageContext,
                    messages: updatedMessages.slice(0, 10),
                    extractedData,
                  }),
                }).catch(err => console.error('Failed to save contact:', err));
              }
            }
          }
        }
      }, 10);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: "I'm sorry, I encountered an error. Could you try again?",
        },
      ]);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setHasInteracted(true);
    localStorage.setItem(storageKey, 'true');
    
    // Add welcome message if no messages yet
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: welcomeMessages[pageContext],
      }]);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Open LEO chat"
        >
          <div className="relative">
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-75 animate-ping" />
            
            {/* Main button with LEO avatar */}
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110">
              <img 
                src={getAvatarSrc(currentEmotion)} 
                alt="LEO" 
                className={`w-12 h-12 rounded-full object-cover avatar-${currentEmotion}`}
              />
            </div>

            {/* Online indicator */}
            <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] bg-gradient-to-br from-[oklch(0.35_0.15_300)] via-[oklch(0.40_0.15_320)] to-[oklch(0.35_0.15_340)] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ height: '600px', maxHeight: 'calc(100vh - 3rem)' }}>
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <img 
                src={getAvatarSrc(currentEmotion)} 
                alt="LEO" 
                className={`w-10 h-10 rounded-full object-cover avatar-${currentEmotion}`}
              />
              <div>
                <h3 className="font-bold text-white">LEO</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-white/60">AI Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <img 
                    src={getAvatarSrc(currentEmotion)} 
                    alt="LEO" 
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-white text-purple-900'
                      : 'bg-white/10 backdrop-blur-md text-white border border-white/10'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <img 
                  src={getAvatarSrc(currentEmotion)} 
                  alt="LEO" 
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-white/10 backdrop-blur-md text-white border border-white/10">
                  <p className="text-sm whitespace-pre-wrap">{typingText}</p>
                </div>
              </div>
            )}
            
            {chatMutation.isPending && !isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-lg p-3">
                  <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-white/10 backdrop-blur-md border-t border-white/10 p-4 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                disabled={chatMutation.isPending}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || chatMutation.isPending}
                className="bg-white text-purple-900 hover:bg-white/90 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            {emailCaptured && (
              <p className="text-xs text-green-400 mt-2 text-center">
                ✓ Thanks! We'll be in touch soon.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Email Capture Modal */}
      {showEmailModal && !emailCaptured && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-[oklch(0.35_0.15_300)] to-[oklch(0.30_0.15_340)] border border-cyan-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={getAvatarSrc('happy')} 
                alt="LEO" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-white">Stay Connected!</h3>
                <p className="text-sm text-white/60">Get personalized insights</p>
              </div>
            </div>
            
            <p className="text-white/80 mb-4">
              I'd love to send you a detailed analysis and recommendations. Drop your email below!
            </p>
            
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
              />
              <input
                type="email"
                placeholder="your@email.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
              />
              
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowEmailModal(false)}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Maybe Later
                </Button>
                <Button
                  onClick={async () => {
                    if (emailInput.trim()) {
                      setEmailCaptured(true);
                      setShowEmailModal(false);
                      
                      // Update session
                      const conversationDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
                      fetch('/api/trpc/leo.updateSession', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          sessionId,
                          emailCaptured: 1,
                          capturedEmail: emailInput,
                          conversationDuration,
                          completedAt: new Date(),
                        }),
                      }).catch(err => console.error('Failed to update session:', err));
                      
                      // Save contact
                      if (pageContext === 'agencies') {
                        await saveAgencyLead.mutateAsync({
                          email: emailInput,
                          companyName: nameInput || undefined,
                          agencySize: undefined,
                          budget: undefined,
                          urgency: undefined,
                          techNeeds: undefined,
                        }).catch(err => console.error('Failed to save agency lead:', err));
                      } else {
                        await saveLeoContact.mutateAsync({
                          email: emailInput,
                          name: nameInput,
                          conversationContext: JSON.stringify({
                            pageContext,
                            messages: messages.slice(0, 10),
                          }),
                        }).catch(err => console.error('Failed to save contact:', err));
                      }
                    }
                  }}
                  disabled={!emailInput.trim()}
                  className="flex-1 bg-white text-purple-900 hover:bg-white/90 disabled:opacity-50"
                >
                  Send Me Insights
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
