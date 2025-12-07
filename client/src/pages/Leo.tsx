import { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Send, Sparkles } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Leo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Salut ! 👋 Je suis Léo, l'assistant IA de Nukleo Digital. Je suis là pour discuter de vos projets et vous aider à comprendre comment l'IA peut transformer votre entreprise. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatMutation = trpc.leo.chat.useMutation();

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      // Préparer l'historique des messages pour l'API
      const conversationHistory = messages.slice(1).map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      }));

      const response = await chatMutation.mutateAsync({
        messages: [
          ...conversationHistory,
          { role: "user" as const, content: currentInput },
        ],
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: typeof response.content === 'string' ? response.content : JSON.stringify(response.content),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Désolé, une erreur s'est produite. 😔 Pouvez-vous réessayer ?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen pt-24 pb-12">
        <div className="container max-w-5xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Assistant IA de Nukleo Digital</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Discutez avec Léo
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Votre guide intelligent pour la transformation digitale. Posez-moi des questions sur les services de Nukleo, l'équipe, ou comment nous pouvons construire votre futur IA.
            </p>
          </div>

          {/* Chat Interface */}
          <div className="relative">
            {/* Glass container */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {/* Messages Area */}
              <div className="h-[600px] overflow-y-auto p-6 md:p-8 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-primary to-secondary text-white"
                          : "bg-white/10 backdrop-blur-sm border border-white/10"
                      } rounded-2xl px-6 py-4 shadow-lg`}
                    >
                      <p className="text-base leading-relaxed">{message.content}</p>
                      <span className="text-xs opacity-60 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-6">
                <div className="flex gap-3">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Posez-moi une question sur l'IA, vos projets, ou Nukleo Digital..."
                    className="flex-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 text-base resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-foreground/40"
                    rows={1}
                    style={{
                      minHeight: "56px",
                      maxHeight: "120px",
                    }}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="h-14 w-14 rounded-2xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-xs text-foreground/40 mt-3 text-center">
                  Appuyez sur Entrée pour envoyer • Shift + Entrée pour une nouvelle ligne
                </p>
              </div>
            </div>

            {/* Decorative gradient blur */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl opacity-30" />
          </div>

          {/* Quick Actions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setInput("Parlez-moi des services de Nukleo")}
              className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-left group"
            >
              <div className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                Explorer les services
              </div>
              <div className="text-xs text-foreground/60">
                Découvrez nos offres de transformation digitale
              </div>
            </button>
            <button
              onClick={() => setInput("Je souhaite discuter d'un projet")}
              className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-left group"
            >
              <div className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                Discuter d'un projet
              </div>
              <div className="text-xs text-foreground/60">
                Lancez votre parcours de transformation
              </div>
            </button>
            <button
              onClick={() => setInput("Qui compose l'équipe Nukleo ?")}
              className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-left group"
            >
              <div className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                Rencontrer l'équipe
              </div>
              <div className="text-xs text-foreground/60">
                Découvrez les experts derrière Nukleo
              </div>
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
