import SEO from '@/components/SEO';
import LEOChatUnified from '@/components/LEOChatUnified';
import Header from '@/components/Header';

export default function Leo() {
  const suggestedPrompts = [
    "How can AI transform my business operations?",
    "What's the ROI timeline for AI implementation?",
    "Help me build an AI strategy roadmap",
    "What are the best AI use cases for my industry?",
    "How do I create a phased AI implementation plan?",
    "What technology stack should I choose for AI?",
  ];

  return (
    <>
      <SEO 
        title="Ask LEO | Your AI Transformation Assistant"
        description="Chat with LEO, Nukleo's AI assistant. Get instant answers about AI transformation, strategy, implementation, and ROI. Available 24/7 to guide your digital journey."
        keywords="AI assistant, AI chatbot, AI transformation help, AI consulting chatbot, LEO AI, digital transformation assistant"
      />
      
      <div className="h-screen flex flex-col bg-gradient-to-br from-[oklch(0.25_0.05_300)] to-[oklch(0.15_0.05_340)]">
        <Header />
        
        <div className="flex-1 pt-20">
          <LEOChatUnified 
            pageContext="askleo" 
            startOpen={true}
            suggestedPrompts={suggestedPrompts}
          />
        </div>
      </div>
    </>
  );
}
