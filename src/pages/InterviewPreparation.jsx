import { useState } from 'react';
import { INTERVIEW_QUESTIONS } from '../data/constants';
import { ChevronDown, Zap, HelpCircle } from 'lucide-react';

export const InterviewPreparation = () => {
  const [expandedId, setExpandedId] = useState(null);
  const categories = [...new Set(INTERVIEW_QUESTIONS.map(q => q.category))];

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
              <HelpCircle className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display">Interview Prep</h1>
              <p className="text-gray-600 dark:text-gray-400">Master common interview questions</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {categories.map((category, categoryIdx) => (
            <div key={category}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-lg flex items-center justify-center">
                  <Zap className="text-primary-600 dark:text-primary-400" size={20} />
                </div>
                <h2 className="text-2xl font-bold">{category}</h2>
                <div className="flex-1 h-1 bg-gradient-to-r from-primary-200 to-transparent dark:from-primary-800 dark:to-transparent"></div>
              </div>

              {/* Questions */}
              <div className="space-y-3 mb-8">
                {INTERVIEW_QUESTIONS.filter(q => q.category === category).map(question => (
                  <div key={question.id} className="card-hover group">
                    <button
                      onClick={() => setExpandedId(expandedId === question.id ? null : question.id)}
                      className="w-full flex items-start justify-between gap-4 text-left"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-gray-50 group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2">
                          {question.question}
                        </p>
                      </div>
                      <ChevronDown
                        size={24}
                        className={`flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-all duration-300 ${
                          expandedId === question.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {expandedId === question.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-slideIn">
                        <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg p-4">
                          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{question.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tip */}
        <div className="mt-12 card-gradient border-l-4 border-accent-500">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Zap size={20} className="text-accent-600 dark:text-accent-400" />
            Pro Tip
          </h3>
          <p className="text-gray-800 dark:text-gray-200">
            Regular practice with these questions will boost your confidence. Try to answer each question out loud before checking the answer!
          </p>
        </div>
      </div>
    </div>
  );
};
