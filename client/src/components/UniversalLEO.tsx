import { useState, useEffect } from 'react';
import { X, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';

interface Question {
  id: string;
  question: string;
  type: 'text' | 'select' | 'multiselect';
  options?: string[];
  field: string;
}

type PageContext = 'home' | 'agencies' | 'services' | 'contact' | 'projects' | 'about' | 'default';

interface UniversalLEOProps {
  pageContext?: PageContext;
}

// Questions personnalisées par contexte de page
const questionsByContext: Record<PageContext, Question[]> = {
  agencies: [
    {
      id: '1',
      question: "Hi! 👋 I'm LEO, your AI assistant. Looking to scale your agency? What's your email?",
      type: 'text',
      field: 'email',
    },
    {
      id: '2',
      question: "Great! What's your agency name?",
      type: 'text',
      field: 'companyName',
    },
    {
      id: '3',
      question: "How many people work at your agency?",
      type: 'select',
      options: ['1-5', '6-20', '21-50', '50+'],
      field: 'agencySize',
    },
    {
      id: '4',
      question: "What technical services are you most interested in?",
      type: 'multiselect',
      options: ['AI & Machine Learning', 'Web & Mobile Apps', 'Cloud & DevOps', 'Data & Automation'],
      field: 'techNeeds',
    },
    {
      id: '5',
      question: "What's your typical project budget range?",
      type: 'select',
      options: ['<10k', '10-50k', '50-100k', '100k+'],
      field: 'budget',
    },
    {
      id: '6',
      question: "When are you looking to start?",
      type: 'select',
      options: ['Immediate', '1-3 months', '3-6 months', 'Just exploring'],
      field: 'urgency',
    },
  ],
  home: [
    {
      id: '1',
      question: "Hi! 👋 I'm LEO, Nukleo's AI assistant. I can help you explore how AI can transform your business. What's your email?",
      type: 'text',
      field: 'email',
    },
    {
      id: '2',
      question: "What's your name?",
      type: 'text',
      field: 'name',
    },
    {
      id: '3',
      question: "What brings you to Nukleo today?",
      type: 'select',
      options: ['Exploring AI solutions', 'Need a specific project', 'Looking for partnership', 'Just browsing'],
      field: 'interest',
    },
    {
      id: '4',
      question: "What industry are you in?",
      type: 'text',
      field: 'industry',
    },
  ],
  services: [
    {
      id: '1',
      question: "Hi! 👋 I'm LEO. Interested in our services? Let's connect! What's your email?",
      type: 'text',
      field: 'email',
    },
    {
      id: '2',
      question: "What's your name?",
      type: 'text',
      field: 'name',
    },
    {
      id: '3',
      question: "Which service interests you most?",
      type: 'select',
      options: ['AI Lab', 'Strategic Bureau', 'Creative Studio', 'All of them'],
      field: 'serviceInterest',
    },
    {
      id: '4',
      question: "What's your biggest challenge right now?",
      type: 'text',
      field: 'challenge',
    },
  ],
  contact: [
    {
      id: '1',
      question: "Hi! 👋 I'm LEO. Let's get you connected with our team. What's your email?",
      type: 'text',
      field: 'email',
    },
    {
      id: '2',
      question: "What's your name?",
      type: 'text',
      field: 'name',
    },
    {
      id: '3',
      question: "How can we help you?",
      type: 'text',
      field: 'message',
    },
  ],
  projects: [
    {
      id: '1',
      question: "Hi! 👋 I'm LEO. Inspired by our work? Let's discuss your project! What's your email?",
      type: 'text',
      field: 'email',
    },
    {
      id: '2',
      question: "What's your name?",
      type: 'text',
      field: 'name',
    },
    {
      id: '3',
      question: "What type of project do you have in mind?",
      type: 'select',
      options: ['AI Implementation', 'Digital Platform', 'Strategy Consulting', 'Creative Campaign'],
      field: 'projectType',
    },
  ],
  about: [
    {
      id: '1',
      question: "Hi! 👋 I'm LEO. Want to learn more about Nukleo? What's your email?",
      type: 'text',
      field: 'email',
    },
    {
      id: '2',
      question: "What's your name?",
      type: 'text',
      field: 'name',
    },
    {
      id: '3',
      question: "What would you like to know about us?",
      type: 'select',
      options: ['Team & Culture', 'Our Approach', 'Career Opportunities', 'Partnership Options'],
      field: 'aboutInterest',
    },
  ],
  default: [
    {
      id: '1',
      question: "Hi! 👋 I'm LEO, your AI assistant at Nukleo. What's your email?",
      type: 'text',
      field: 'email',
    },
    {
      id: '2',
      question: "What's your name?",
      type: 'text',
      field: 'name',
    },
    {
      id: '3',
      question: "How can I help you today?",
      type: 'text',
      field: 'message',
    },
  ],
};

export default function UniversalLEO({ pageContext = 'default' }: UniversalLEOProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const saveLeoContact = trpc.leo.saveContact.useMutation();
  const saveAgencyLead = trpc.agencies.saveLead.useMutation();

  const questions = questionsByContext[pageContext];
  const storageKey = `leo-${pageContext}-completed`;

  // Auto-open after 10 seconds if not interacted
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted && !localStorage.getItem(storageKey)) {
        setIsOpen(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [hasInteracted, storageKey]);

  const currentQuestion = questions[currentQuestionIndex];

  const calculateScore = (answers: Record<string, any>): number => {
    let score = 0;
    
    // Agency-specific scoring
    if (pageContext === 'agencies') {
      if (answers.agencySize === '50+') score += 25;
      else if (answers.agencySize === '21-50') score += 20;
      else if (answers.agencySize === '6-20') score += 15;
      else score += 10;

      if (answers.budget === '100k+') score += 30;
      else if (answers.budget === '50-100k') score += 25;
      else if (answers.budget === '10-50k') score += 15;
      else score += 5;

      if (answers.urgency === 'Immediate') score += 25;
      else if (answers.urgency === '1-3 months') score += 20;
      else if (answers.urgency === '3-6 months') score += 10;
      else score += 5;

      if (answers.techNeeds && answers.techNeeds.length >= 3) score += 20;
      else if (answers.techNeeds && answers.techNeeds.length >= 2) score += 15;
      else score += 10;
    } else {
      // Default scoring for other contexts
      score = 50; // Base score for engagement
    }

    return Math.min(score, 100);
  };

  const handleNext = async () => {
    if (currentQuestion.type === 'text' && !inputValue.trim()) return;
    if (currentQuestion.type === 'multiselect' && selectedOptions.length === 0) return;

    const newAnswers = {
      ...answers,
      [currentQuestion.field]: currentQuestion.type === 'multiselect' ? selectedOptions : inputValue,
    };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setInputValue('');
      setSelectedOptions([]);
    } else {
      // Submit based on context
      try {
        if (pageContext === 'agencies') {
          // Save as agency lead
          const score = calculateScore(newAnswers);
          await saveAgencyLead.mutateAsync({
            email: newAnswers.email,
            companyName: newAnswers.companyName,
            agencySize: newAnswers.agencySize,
            techNeeds: newAnswers.techNeeds || undefined,
            budget: newAnswers.budget,
            urgency: newAnswers.urgency,
          });
        } else {
          // Save as LEO contact
          await saveLeoContact.mutateAsync({
            email: newAnswers.email,
            name: newAnswers.name || '',
            conversationContext: JSON.stringify({
              pageContext,
              answers: newAnswers,
            }),
          });
        }

        setIsCompleted(true);
        localStorage.setItem(storageKey, 'true');
        
        // Auto-close after 3 seconds
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      } catch (error) {
        console.error('Error saving:', error);
      }
    }
  };

  const handleOptionClick = (option: string) => {
    if (currentQuestion.type === 'multiselect') {
      setSelectedOptions(prev =>
        prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
      );
    } else if (currentQuestion.type === 'select') {
      setInputValue(option);
      // Auto-advance for single select
      setTimeout(() => {
        const newAnswers = {
          ...answers,
          [currentQuestion.field]: option,
        };
        setAnswers(newAnswers);
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setInputValue('');
        }
      }, 300);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setHasInteracted(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setHasInteracted(true);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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
        <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] bg-gradient-to-br from-[oklch(0.25_0.05_300)] to-[oklch(0.15_0.05_340)] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-4 flex items-center justify-between">
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

          {/* Progress Bar */}
          {!isCompleted && (
            <div className="h-1 bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {isCompleted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">You're All Set! 🎉</h3>
                <p className="text-white/70">
                  {pageContext === 'agencies' 
                    ? "We'll reach out soon to discuss how Nukleo can help scale your agency!"
                    : "Thanks for connecting! We'll be in touch shortly."}
                </p>
              </div>
            ) : (
              <>
                {/* Question */}
                <div className="mb-6">
                  <div className="bg-white/10 rounded-lg p-4 mb-4">
                    <p className="text-white">{currentQuestion.question}</p>
                  </div>

                  {/* Input based on type */}
                  {currentQuestion.type === 'text' && (
                    <input
                      type={currentQuestion.field === 'email' ? 'email' : 'text'}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                      placeholder="Type your answer..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                      autoFocus
                    />
                  )}

                  {(currentQuestion.type === 'select' || currentQuestion.type === 'multiselect') && (
                    <div className="space-y-2">
                      {currentQuestion.options?.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleOptionClick(option)}
                          className={`w-full px-4 py-3 rounded-lg border transition-all text-left ${
                            currentQuestion.type === 'multiselect'
                              ? selectedOptions.includes(option)
                                ? 'bg-cyan-500/20 border-cyan-500 text-white'
                                : 'bg-white/5 border-white/20 text-white/70 hover:border-cyan-500/50'
                              : inputValue === option
                              ? 'bg-cyan-500/20 border-cyan-500 text-white'
                              : 'bg-white/5 border-white/20 text-white/70 hover:border-cyan-500/50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Next Button */}
                <Button
                  onClick={handleNext}
                  disabled={
                    (currentQuestion.type === 'text' && !inputValue.trim()) ||
                    (currentQuestion.type === 'multiselect' && selectedOptions.length === 0) ||
                    (currentQuestion.type === 'select' && !inputValue)
                  }
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white disabled:opacity-50"
                >
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      Next <Send className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Submit <CheckCircle2 className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {/* Progress indicator */}
                <p className="text-xs text-white/40 text-center mt-3">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
