import { ROADMAP_PHASES } from '../data/constants';
import { CheckCircle, Circle, MapPin } from 'lucide-react';

export const Roadmaps = () => {
  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
              <MapPin className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display">Learning Roadmap</h1>
              <p className="text-gray-600 dark:text-gray-400">12-month journey to AI mastery</p>
            </div>
          </div>
        </div>

        {/* Phases Grid */}
        <div className="space-y-4">
          {ROADMAP_PHASES.map((phase, index) => {
            const isCompleted = phase.id < 3;
            const isInProgress = phase.id >= 3 && phase.id < 6;
            const progress = isCompleted ? 100 : isInProgress ? 50 : 25;

            return (
              <div
                key={phase.id}
                className={`card-hover border-l-4 transition-all duration-300 ${
                  isCompleted
                    ? 'border-green-500'
                    : isInProgress
                      ? 'border-accent-500'
                      : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {isCompleted ? (
                        <CheckCircle className="text-green-500" size={24} />
                      ) : (
                        <Circle className="text-gray-400 dark:text-gray-500" size={24} />
                      )}
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold">
                          {phase.name}: <span className="gradient-text dark:gradient-text-dark">{phase.title}</span>
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{phase.duration}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className={`badge ${
                        isCompleted
                          ? 'badge-success'
                          : isInProgress
                            ? 'badge-warning'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {isCompleted ? '✓ Done' : isInProgress ? '→ Active' : 'Not Started'}
                    </span>
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-5">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Topics:</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                          isCompleted
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{progress}%</span>
                  </div>
                  <div className="progress-bar h-2.5">
                    <div
                      className={`progress-fill ${
                        isCompleted
                          ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                          : 'bg-gradient-to-r from-accent-500 to-primary-400'
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-12 card bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700 border-none">
          <h3 className="font-bold mb-4">Legend</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
              <span className="text-sm text-gray-700 dark:text-gray-300">Completed</span>
            </div>
            <div className="flex items-center gap-3">
              <Circle className="text-accent-500 flex-shrink-0" size={20} />
              <span className="text-sm text-gray-700 dark:text-gray-300">In Progress</span>
            </div>
            <div className="flex items-center gap-3">
              <Circle className="text-gray-400 dark:text-gray-500 flex-shrink-0" size={20} />
              <span className="text-sm text-gray-700 dark:text-gray-300">Not Started</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
