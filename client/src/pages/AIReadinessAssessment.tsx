import SEO from '@/components/SEO';
import { useState } from 'react';
import { QUESTIONS } from '@/lib/assessment/questions';
import { calculateScores, AssessmentResults } from '@/lib/assessment/scoring';
import AssessmentIntro from '@/components/assessment/AssessmentIntro';
import QuestionCard from '@/components/assessment/QuestionCard';
import ProgressBar from '@/components/assessment/ProgressBar';
import ResultsRadar from '@/components/assessment/ResultsRadar';
import ResultsSummary from '@/components/assessment/ResultsSummary';
import RecommendationsSection from '@/components/assessment/RecommendationsSection';
import EmailCaptureModal, { EmailCaptureData } from '@/components/assessment/EmailCaptureModal';
import { ArrowLeft, ArrowRight, Download, CheckCircle } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { trpc } from '@/lib/trpc';
import { Link } from 'wouter';
import { Menu } from 'lucide-react';
import { useState as useMenuState } from 'react';
import FullScreenMenu from '@/components/FullScreenMenu';

type AssessmentState = 'intro' | 'quiz' | 'email-capture' | 'results';

export default function AIReadinessAssessment() {
  const [menuOpen, setMenuOpen] = useMenuState(false);
  const [state, setState] = useState<AssessmentState>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [emailData, setEmailData] = useState<EmailCaptureData | null>(null);
  const { playClick } = useSound();

  const saveAssessment = trpc.assessment.save.useMutation();

  const handleEmailSubmit = async (data: EmailCaptureData) => {
    if (!results) return;

    try {
      // Find dimension scores by dimension name
      const getDimensionScore = (dimension: string) => {
        const dim = results.dimensionScores.find(d => d.dimension === dimension);
        return dim?.score ?? 0;
      };

      await saveAssessment.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company,
        jobTitle: data.jobTitle,
        phone: data.phone,
        companySize: data.companySize,
        industry: data.industry,
        globalScore: results.globalScore,
        strategyScore: getDimensionScore('strategy'),
        dataScore: getDimensionScore('data'),
        technologyScore: getDimensionScore('technology'),
        talentScore: getDimensionScore('talent'),
        governanceScore: getDimensionScore('governance'),
        cultureScore: getDimensionScore('culture'),
        maturityLevel: results.maturityLevel,
        answers: answers,
      });

      // Generate and download PDF (optional - will fallback to text if jspdf not available)
      try {
        const { generatePDFReport } = await import('@/lib/assessment/pdfGenerator');
        await generatePDFReport(results, data);
      } catch (pdfError) {
        console.warn('PDF generation failed, report saved to database:', pdfError);
        // Continue - report is saved and email sent
      }

      setIsSaved(true);
      setEmailData(data);
      setShowEmailModal(false);
      // Move to results after email capture
      setState('results');
      playClick();
    } catch (error) {
      console.error('Failed to save assessment:', error);
      alert('Failed to save assessment. Please try again.');
    }
  };

  const handleEmailCaptureSkip = () => {
    // Allow skipping email capture, but still show results
    setShowEmailModal(false);
    setState('results');
    playClick();
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUESTIONS.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleStart = () => {
    setState('quiz');
  };

  const handleSelectOption = (points: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: points,
    }));
    
    playClick();
    
    // Auto-advance to next question after 600ms with smooth animation
    setTimeout(() => {
      if (isLastQuestion) {
        const assessmentResults = calculateScores({ ...answers, [currentQuestion.id]: points });
        setResults(assessmentResults);
        // Show email capture before results
        setState('email-capture');
        setShowEmailModal(true);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 600);
  };

  // handleNext removed - auto-advance only

  const handlePrevious = () => {
    playClick();
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO 
        title="Free AI Readiness Assessment | Evaluate Your AI Potential"
        description="Take our free 5-minute AI readiness assessment. Get personalized insights on your organization's AI maturity, gaps & opportunities. Start your AI journey today."
        keywords="AI readiness assessment, AI maturity assessment, AI evaluation, AI readiness score, free AI assessment"
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-white hover:text-violet-400 transition-colors">
              nukleo.
            </a>
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 text-white hover:text-violet-400 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <FullScreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-950 pt-32 pb-20 px-4">
      <style>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeInSlide 0.4s ease-out;
        }
      `}</style>
      <div className="container">
        {state === 'intro' && (
          <AssessmentIntro onStart={handleStart} />
        )}

        {state === 'quiz' && (
          <div className="w-full max-w-4xl mx-auto">
            <ProgressBar 
              current={currentQuestionIndex + 1} 
              total={totalQuestions} 
            />

            <div 
              key={currentQuestionIndex}
              className="animate-fade-in"
              style={{
                animation: 'fadeInSlide 0.4s ease-out',
              }}
            >
              <QuestionCard
                question={currentQuestion}
                selectedOption={answers[currentQuestion.id] ?? null}
                onSelectOption={handleSelectOption}
              />
            </div>

            {/* Navigation Buttons - Only Previous */}
            <div className="flex items-center justify-start mt-12">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-medium rounded-full hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Previous
              </button>
            </div>
          </div>
        )}

        {state === 'email-capture' && (
          <div className="w-full max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Almost There!
              </h2>
              <p className="text-xl text-white/70">
                Enter your details to receive your personalized AI Readiness Report
              </p>
            </div>
          </div>
        )}

        {state === 'results' && results && (
          <div className="w-full max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Your AI Readiness Report
              </h2>
              <p className="text-xl text-white/70">
                Here's your comprehensive assessment across 6 key dimensions
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Left: Summary */}
              <div>
                <ResultsSummary results={results} />
              </div>

              {/* Right: Radar Chart */}
              <div>
                <ResultsRadar dimensionScores={results.dimensionScores} />
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="mb-12">
              <RecommendationsSection results={results} />
            </div>

            {/* CTA Section */}
            <div className="p-8 bg-gradient-to-r from-violet-500/10 to-rose-500/10 backdrop-blur-xl border border-white/10 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready for Your Detailed Roadmap?
              </h3>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                Get a comprehensive PDF report with personalized recommendations, 
                implementation timeline, and next steps tailored to your maturity level.
              </p>
              {!isSaved ? (
                <button
                  onClick={() => {
                    playClick();
                    setShowEmailModal(true);
                  }}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-500 to-rose-500 text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  Get Your Full Report
                </button>
              ) : (
                <div className="inline-flex items-center gap-3 px-8 py-4 bg-green-500/20 border border-green-500/30 text-green-400 font-bold rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  Report Saved! Check your email.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Email Capture Modal - Outside main container for proper z-index */}
    {showEmailModal && (
      <EmailCaptureModal
        onSubmit={handleEmailSubmit}
        onClose={() => {
          setShowEmailModal(false);
          playClick();
        }}
        onSkip={handleEmailCaptureSkip}
        showSkip={true}
      />
    )}
    </>
  );
}
