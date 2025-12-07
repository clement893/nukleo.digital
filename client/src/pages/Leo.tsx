import { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trpc } from '@/lib/trpc';
import { Link } from 'wouter';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Leo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm Leo, Nukleo's AI assistant.",
      timestamp: new Date(),
    },
    {
      role: 'assistant',
      content: "I'm here to help architect your AI transformation. To begin, what should I call you?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMutation = trpc.leo.chat.useMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    try {
      const response = await chatMutation.mutateAsync({
        messages: [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: typeof response.content === 'string' ? response.content : JSON.stringify(response.content),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again! 🔄",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
                className="h-8 w-auto cursor-pointer"
              />
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-4">
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
            <div
              key={index}
              className={`flex gap-4 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[oklch(0.85_0.15_300)] to-[oklch(0.85_0.15_340)] flex items-center justify-center">
                    <img 
                      src="/nukleo-logo.png" 
                      alt="Leo" 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
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
          ))}

          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[oklch(0.85_0.15_300)] to-[oklch(0.85_0.15_340)] flex items-center justify-center">
                  <img 
                    src="/nukleo-logo.png" 
                    alt="Leo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
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
                disabled={isLoading}
                className="flex-1 bg-transparent border-0 text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
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
