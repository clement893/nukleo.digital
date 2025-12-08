import { Question, QuestionOption } from '@/lib/assessment/questions';
import { Check } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

interface QuestionCardProps {
  question: Question;
  selectedOption: number | null;
  onSelectOption: (points: number) => void;
}

export default function QuestionCard({ question, selectedOption, onSelectOption }: QuestionCardProps) {
  const { playClick } = useSound();

  const handleOptionClick = (option: QuestionOption) => {
    playClick();
    onSelectOption(option.points);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === option.points;
          
          return (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`
                w-full text-left p-6 rounded-2xl border-2 transition-all duration-300
                ${isSelected 
                  ? 'border-accent bg-accent/10 backdrop-blur-xl' 
                  : 'border-white/10 bg-white/5 backdrop-blur-xl hover:border-white/30 hover:bg-white/10'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <span className={`text-lg ${isSelected ? 'text-white font-medium' : 'text-white/80'}`}>
                  {option.label}
                </span>
                
                {isSelected && (
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
