// Leo.tsx - Chatbot page with inline email capture
import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Mail, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trpc } from '@/lib/trpc';
import { Link } from 'wouter';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isEmailForm?: boolean;
}

export default function Leo() {
  // Load messages from localStorage on mount
  const loadMessages = (): Message[] => {
    try {
      const saved = localStorage.getItem('leo-chat-history');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Convert timestamp strings back to Date objects
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
    // Return default welcome message if no history
    return [
      {
        role: 'assistant',
        content: "I'm here to help architect your AI transformation. To begin, what should I call you?",
        timestamp: new Date(),
      },
    ];
  };

  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<'default' | 'happy' | 'thinking' | 'surprised' | 'confused' | 'excited'>('default');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [emailSaved, setEmailSaved] = useState(false);

  // Detect emotion from message content
  const detectEmotion = (content: string): 'default' | 'happy' | 'thinking' | 'surprised' | 'confused' | 'excited' => {
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
  const getAvatarSrc = (emotion: typeof currentEmotion): string => {
    switch (emotion) {
      case 'happy': return '/leo-avatar-happy.png';
      case 'thinking': return '/leo-avatar-thinking.png';
      case 'surprised': return '/leo-avatar-surprised.png';
      case 'confused': return '/leo-avatar-confused.png';
      case 'excited': return '/leo-avatar-excited.png';
      default: return '/leo-avatar.png';
    }
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMutation = trpc.leo.chat.useMutation();
  const saveContactMutation = trpc.leo.saveContact.useMutation();

  // Contextual suggestion categories
  const suggestionCategories = {
    initial: [
      "How can AI transform my business operations?",
      "What's the ROI timeline for AI implementation?",
      "Help me build an AI strategy roadmap",
      "What are the best AI use cases for my industry?",
    ],
    strategy: [
      "How do I create a phased AI implementation plan?",
      "What are the key success factors for AI transformation?",
      "How should I structure my AI team?",
      "What's the typical timeline for AI adoption?",
    ],
    implementation: [
      "What technology stack should I choose for AI?",
      "How do I ensure data quality for AI models?",
      "What are common pitfalls in AI implementation?",
      "How do I integrate AI with existing systems?",
    ],
    roi: [
      "How long until I see ROI from AI investments?",
      "What metrics should I track for AI success?",
      "How do I calculate the business value of AI?",
      "What are realistic cost expectations for AI projects?",
    ],
    team: [
      "What skills do I need to hire for AI projects?",
      "How do I upskill my existing team for AI?",
      "Should I build in-house or partner for AI?",
      "How do I create an AI-first culture?",
    ],
  };

  // Determine context based on conversation
  const getContextualSuggestions = (): string[] => {
    if (messages.length <= 1) return suggestionCategories.initial;

    const lastMessages = messages.slice(-3).map(m => m.content.toLowerCase()).join(' ');

    if (lastMessages.includes('roi') || lastMessages.includes('cost') || lastMessages.includes('budget') || lastMessages.includes('value')) {
      return suggestionCategories.roi;
    }
    if (lastMessages.includes('team') || lastMessages.includes('hire') || lastMessages.includes('skill') || lastMessages.includes('people')) {
      return suggestionCategories.team;
    }
    if (lastMessages.includes('implement') || lastMessages.includes('build') || lastMessages.includes('develop') || lastMessages.includes('technology')) {
      return suggestionCategories.implementation;
    }
    if (lastMessages.includes('strategy') || lastMessages.includes('plan') || lastMessages.includes('roadmap') || lastMessages.includes('approach')) {
      return suggestionCategories.strategy;
    }

    return suggestionCategories.initial;
  };

  // Load expert mode preference from localStorage
  const [isExpertMode, setIsExpertMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('leo-expert-mode');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // Save expert mode preference
  useEffect(() => {
    try {
      localStorage.setItem('leo-expert-mode', String(isExpertMode));
    } catch (error) {
      console.error('Error saving expert mode preference:', error);
    }
  }, [isExpertMode]);

  // Expert mode suggestion categories (more technical)
  const expertSuggestionCategories = {
    initial: [
      "What's your approach to MLOps and model governance?",
      "How do you architect multi-agent AI systems?",
      "What's your framework for AI risk assessment and mitigation?",
      "How do you handle data drift and model retraining pipelines?",
    ],
    strategy: [
      "What's your methodology for AI maturity assessment?",
      "How do you design federated learning architectures?",
      "What's your approach to AI ethics frameworks and bias detection?",
      "How do you structure center of excellence for AI?",
    ],
    implementation: [
      "What's your tech stack for real-time inference at scale?",
      "How do you implement model versioning and A/B testing?",
      "What's your approach to feature engineering automation?",
      "How do you handle model explainability and interpretability?",
    ],
    roi: [
      "How do you calculate TCO for AI infrastructure?",
      "What metrics do you use for model performance vs business KPIs?",
      "How do you quantify the value of data quality improvements?",
      "What's your framework for AI investment portfolio optimization?",
    ],
    team: [
      "What's your hiring framework for ML engineers vs data scientists?",
      "How do you structure AI teams (centralized vs embedded)?",
      "What certifications and skills matter for AI practitioners?",
      "How do you build internal AI communities of practice?",
    ],
  };

  const getContextualSuggestionsForMode = (expertMode: boolean): string[] => {
    const categories = expertMode ? expertSuggestionCategories : suggestionCategories;
    
    if (messages.length <= 1) return categories.initial;

    const lastMessages = messages.slice(-3).map(m => m.content.toLowerCase()).join(' ');

    if (lastMessages.includes('roi') || lastMessages.includes('cost') || lastMessages.includes('budget') || lastMessages.includes('value')) {
      return categories.roi;
    }
    if (lastMessages.includes('team') || lastMessages.includes('hire') || lastMessages.includes('skill') || lastMessages.includes('people')) {
      return categories.team;
    }
    if (lastMessages.includes('implement') || lastMessages.includes('build') || lastMessages.includes('develop') || lastMessages.includes('technology')) {
      return categories.implementation;
    }
    if (lastMessages.includes('strategy') || lastMessages.includes('plan') || lastMessages.includes('roadmap') || lastMessages.includes('approach')) {
      return categories.strategy;
    }

    return categories.initial;
  };

  const [suggestions, setSuggestions] = useState<string[]>(getContextualSuggestionsForMode(isExpertMode));

  // Update suggestions when messages or expert mode change
  useEffect(() => {
    const newSuggestions = getContextualSuggestionsForMode(isExpertMode);
    setSuggestions(newSuggestions);
  }, [messages, isExpertMode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('leo-chat-history', JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingText, showEmailForm]);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    // Don't hide suggestions, let them update contextually
  };

  const handleNewChat = () => {
    const defaultMessages: Message[] = [
      {
        role: 'assistant',
        content: "I'm here to help architect your AI transformation. To begin, what should I call you?",
        timestamp: new Date(),
      },
    ];
    setMessages(defaultMessages);
    setShowSuggestions(true);
    setInput('');
    setIsLoading(false);
    setIsTyping(false);
    setTypingText('');
    setShowEmailForm(false);
    setEmailSaved(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    // Temporarily hide suggestions while loading
    setShowSuggestions(false);

    try {
      const response = await chatMutation.mutateAsync({
        messages: [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });

      const fullText = typeof response.content === 'string' ? response.content : JSON.stringify(response.content);
      
      // Detect emotion from response
      const detectedEmotion = detectEmotion(fullText);
      setCurrentEmotion(detectedEmotion);
      
      // Simulate typing effect
      setIsTyping(true);
      setTypingText('');
      
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          setTypingText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          
          const assistantMessage: Message = {
            role: 'assistant',
            content: fullText,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
          setTypingText('');
          // Show suggestions again after response is complete
          setShowSuggestions(true);

          // Show email form inline after first exchange (2 messages: user + assistant)
          const emailAlreadySaved = localStorage.getItem('leo-email-saved');
          if (!emailAlreadySaved && !emailSaved && messages.length >= 1 && !showEmailForm) {
            setShowEmailForm(true);
            setMessages((prev) => [...prev, {
              role: 'system',
              content: "Before we continue, I'd love to send you personalized insights! Could you share your email?",
              timestamp: new Date(),
              isEmailForm: true,
            }]);
          }
        }
      }, 5); // 5ms per character for fast typing speed
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again! 🔄",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setShowSuggestions(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async () => {
    if (!emailInput.trim()) return;

    try {
      const lastMessage = messages[messages.length - 2]; // Get last real message before form
      await saveContactMutation.mutateAsync({
        email: emailInput,
        name: nameInput || undefined,
        conversationContext: lastMessage ? lastMessage.content.substring(0, 500) : undefined,
      });
      
      setEmailSaved(true);
      setShowEmailForm(false);
      localStorage.setItem('leo-email-saved', 'true');
      
      // Remove email form message and add confirmation
      const messagesWithoutForm = messages.filter(m => !m.isEmailForm);
      setMessages([...messagesWithoutForm, {
        role: 'assistant',
        content: `Perfect! Thanks ${nameInput || 'there'}! 🎉 I'll send personalized insights to ${emailInput}. Now, let's continue our conversation!`,
        timestamp: new Date(),
      }]);
      
      // Clear inputs
      setEmailInput('');
      setNameInput('');
    } catch (error) {
      console.error('Error saving email:', error);
    }
  };

  const handleSkipEmail = () => {
    setShowEmailForm(false);
    // Remove email form message and add skip confirmation
    const messagesWithoutForm = messages.filter(m => !m.isEmailForm);
    setMessages([...messagesWithoutForm, {
      role: 'assistant',
      content: "No problem! Let's continue our conversation. 😊",
      timestamp: new Date(),
    }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (showEmailForm) {
        handleEmailSubmit();
      } else {
        handleSend();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[oklch(0.35_0.15_300)] via-[oklch(0.40_0.15_320)] to-[oklch(0.35_0.15_340)] flex flex-col">
      {/* Header minimal */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <img 
                src="/nukleo-logo.png" 
                alt="Nukleo" 
                className="h-8 w-auto cursor-pointer brightness-0 invert"
              />
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Expert Mode Toggle */}
              <button
                onClick={() => setIsExpertMode(!isExpertMode)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                title={isExpertMode ? "Switch to Standard Mode" : "Switch to Expert Mode"}
              >
                <span className="text-xs font-medium">
                  {isExpertMode ? '🔬 Expert' : '💡 Standard'}
                </span>
              </button>
              <Button
                onClick={handleNewChat}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
              >
                New Chat
              </Button>
              <Button
                className="rounded-full bg-white text-purple-900 hover:bg-white/90 font-bold px-6"
              >
                START PROJECT
              </Button>
              <Link href="/">
                <button className="text-white hover:text-white/80 transition-colors p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container pt-24 pb-4">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Link href="/" className="hover:text-white/80 transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-white/90">CHAT WITH LEO</span>
        </div>
      </div>

      {/* Status indicator */}
      <div className="container pb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-white/60 uppercase tracking-wider">AI Online</span>
        </div>
      </div>

      {/* Chat container */}
      <div className="flex-1 container pb-32 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-8">
          {messages.map((message, index) => (
            <div key={index}>
              {message.isEmailForm ? (
                // Inline Email Form
                <div className="flex gap-4 justify-start">
                  <div className="flex-shrink-0">
                    <img 
                      src={getAvatarSrc('happy')} 
                      alt="Leo" 
                      className="w-12 h-12 object-contain avatar-happy"
                    />
                  </div>
                  <div className="flex flex-col items-start max-w-[70%]">
                    <span className="text-xs text-white/40 uppercase tracking-wider mb-2">LEO</span>
                    <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-cyan-500/30 text-white">
                      <p className="text-base leading-relaxed mb-4">{message.content}</p>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Your name (optional)"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                        />
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSkipEmail}
                            variant="outline"
                            size="sm"
                            className="flex-1 border-white/20 text-white hover:bg-white/10 text-xs"
                          >
                            Skip
                          </Button>
                          <Button
                            onClick={handleEmailSubmit}
                            disabled={!emailInput.trim() || saveContactMutation.isPending}
                            size="sm"
                            className="flex-1 bg-white text-purple-900 hover:bg-white/90 disabled:opacity-50 text-xs"
                          >
                            {saveContactMutation.isPending ? 'Saving...' : 'Send'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Regular Message
                <div
                  className={`flex gap-4 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0">
                      <img 
                        src={getAvatarSrc(index === messages.length - 1 ? currentEmotion : 'default')} 
                        alt="Leo" 
                        className={`w-12 h-12 object-contain transition-all duration-300 ${
                          index === messages.length - 1 ? `avatar-${currentEmotion}` : 'avatar-default'
                        }`}
                      />
                    </div>
                  )}

                  <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} max-w-[70%]`}>
                    <span className="text-xs text-white/40 uppercase tracking-wider mb-2">
                      {message.role === 'assistant' ? 'LEO' : 'YOU'}
                    </span>
                    <div
                      className={`px-6 py-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-[oklch(0.85_0.15_300)] to-[oklch(0.85_0.15_340)] text-white'
                          : 'bg-white/10 backdrop-blur-md border border-white/20 text-white'
                      }`}
                    >
                      <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <span className="text-xs text-white/30 mt-2">
                      {message.timestamp.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {message.role === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">👤</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator while loading */}
          {isLoading && !isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="flex-shrink-0">
                <img 
                  src={getAvatarSrc('thinking')} 
                  alt="Leo" 
                  className="w-12 h-12 object-contain avatar-thinking transition-all duration-300"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-white/40 uppercase tracking-wider mb-2">LEO</span>
                <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Typing effect */}
          {isTyping && typingText && (
            <div className="flex gap-4 justify-start">
              <div className="flex-shrink-0">
                <img 
                  src={getAvatarSrc(currentEmotion)} 
                  alt="Leo" 
                  className={`w-12 h-12 object-contain transition-all duration-300 avatar-${currentEmotion}`}
                />
              </div>
              <div className="flex flex-col items-start max-w-[70%]">
                <span className="text-xs text-white/40 uppercase tracking-wider mb-2">LEO</span>
                <div className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                  <p className="text-base leading-relaxed whitespace-pre-wrap">
                    {typingText}
                    <span className="inline-block w-0.5 h-4 bg-white/60 ml-0.5 animate-pulse" />
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Suggestions */}
          {showSuggestions && messages.length === 2 && (
            <div className="mt-8 space-y-4">
              <p className="text-sm text-white/60 text-center">Or choose a topic to get started:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left text-white/80 hover:text-white text-sm group"
                  >
                    <span className="block group-hover:translate-x-1 transition-transform">
                      {suggestion}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[oklch(0.35_0.15_300)] via-[oklch(0.35_0.15_300)] to-transparent pt-8 pb-6">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3 items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
              <span className="text-white/40 text-lg">›</span>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your response..."
                disabled={isLoading || showEmailForm}
                className="flex-1 bg-transparent border-0 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim() || showEmailForm}
                className="text-white/60 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
              <button className="text-white/60 hover:text-white transition-colors">
                <Mic className="w-5 h-5" />
              </button>
            </div>

            {/* Footer links */}
            <div className="flex items-center justify-between mt-4 text-xs text-white/40">
              <a href="#" className="hover:text-white/60 transition-colors uppercase tracking-wider">
                Privacy Policy
              </a>
              <a href="mailto:hello@nukleo.com" className="hover:text-white/60 transition-colors uppercase tracking-wider">
                hello@nukleo.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
