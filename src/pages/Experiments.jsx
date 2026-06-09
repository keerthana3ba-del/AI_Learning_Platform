import { Plus, TestTube } from 'lucide-react';

export const Experiments = () => {
  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
              <TestTube className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display">Experiments</h1>
              <p className="text-gray-600 dark:text-gray-400">Log and track your learning experiments</p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="card-gradient border-l-4 border-accent-500 text-center py-16">
          <div className="mb-6">
            <TestTube size={64} className="mx-auto text-accent-300 opacity-50" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No experiments yet</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-md mx-auto">
            Document your experiments, tests, and learning discoveries here. Track your progress and learn from your attempts.
          </p>
          <button className="btn-accent inline-flex items-center gap-2">
            <Plus size={20} /> Create Experiment
          </button>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="card">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">0</div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">Total Experiments</p>
          </div>
          <div className="card">
            <div className="text-4xl font-bold text-accent-600 dark:text-accent-400 mb-2">0</div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">Successful Runs</p>
          </div>
          <div className="card">
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">0%</div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">Success Rate</p>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-12 card border-l-4 border-primary-500">
          <h3 className="text-lg font-bold mb-3">💡 Tips for Great Experiments</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>✓ Define clear objectives before starting</li>
            <li>✓ Document your methodology and parameters</li>
            <li>✓ Record results and observations</li>
            <li>✓ Note any learnings or insights</li>
            <li>✓ Compare results across experiments</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
