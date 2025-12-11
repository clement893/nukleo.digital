import { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';

type PageContext = 'home' | 'agencies' | 'services' | 'contact' | 'projects' | 'about' | 'default';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface UniversalLEOProps {
  pageContext?: PageContext;
}

// Prompts d'accueil personnalisés par page
const welcomeMessages: Record<PageContext, string> = {
  home: "Hi! 👋 I'm LEO, Nukleo's AI assistant. I'm here to help you explore how AI can transform your business. What brings you here today?",
  agencies: "Hi! 👋 I'm LEO. Looking to scale your agency with Nukleo's nearshore team? I can help you understand our partnership model. What's your biggest challenge right now?",
  services: "Hi! 👋 I'm LEO. Interested in our services? Whether it's AI Lab, Strategic Bureau, or Creative Studio, I can help you find the right fit. What are you looking to achieve?",
  contact: "Hi! 👋 I'm LEO. Ready to connect with our team? Tell me a bit about your project and I'll make sure you get the right help.",
  projects: "Hi! 👋 I'm LEO. Inspired by our work? I'd love to hear about your project vision. What kind of transformation are you considering?",
  about: "Hi! 👋 I'm LEO. Want to know more about Nukleo? Ask me anything about our team, culture, or approach!",
  default: "Hi! 👋 I'm LEO, your AI assistant at Nukleo. How can I help you today?",
};

export default function UniversalLEO({ pageContext = 'default' }: UniversalLEOProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.leo.chat.useMutation();
  const saveLeoContact = trpc.leo.saveContact.useMutation();
  const saveAgencyLead = trpc.agencies.saveLead.useMutation();

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
  }, [messages]);

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

      const assistantMessage: Message = {
        role: 'assistant',
        content: typeof response.content === 'string' ? response.content : '',
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);

      // Try to extract and save data if email is found
      if (!emailCaptured) {
        const extractedData = extractDataFromConversation(updatedMessages);
        
        if (extractedData.email) {
          setEmailCaptured(true);
          
          // Save based on context
          if (pageContext === 'agencies' && extractedData.companyName) {
            // Calculate qualification score
            let score = 50; // Base score
            if (extractedData.agencySize === '50+') score += 15;
            else if (extractedData.agencySize === '21-50') score += 10;
            if (extractedData.budget === '100k+') score += 20;
            else if (extractedData.budget === '50-100k') score += 15;
            if (extractedData.urgency === 'Immediate') score += 15;
            else if (extractedData.urgency === '1-3 months') score += 10;

            await saveAgencyLead.mutateAsync({
              email: extractedData.email,
              companyName: extractedData.companyName,
              agencySize: extractedData.agencySize,
              budget: extractedData.budget,
              urgency: extractedData.urgency,
              techNeeds: undefined,
            });
          } else {
            // Save as LEO contact
            await saveLeoContact.mutateAsync({
              email: extractedData.email,
              name: extractedData.name || '',
              conversationContext: JSON.stringify({
                pageContext,
                messages: updatedMessages.slice(0, 10), // Save first 10 messages
                extractedData,
              }),
            });
          }
        }
      }
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
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center group hover:scale-110"
          aria-label="Open LEO chat"
        >
          <MessageCircle className="w-7 h-7 text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] bg-gradient-to-br from-[oklch(0.25_0.05_300)] to-[oklch(0.15_0.05_340)] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ height: '600px', maxHeight: 'calc(100vh - 3rem)' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-white">LEO</h3>
                <p className="text-xs text-white/80">AI Assistant</p>
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
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            
            {chatMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-lg p-3">
                  <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 flex-shrink-0">
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
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white disabled:opacity-50"
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
    </>
  );
}
