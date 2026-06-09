import { SAMPLE_PROJECTS } from '../data/constants';
import { useLearning } from '../contexts/LearningContext';
import { Code2, ExternalLink, Check } from 'lucide-react';

export const Projects = () => {
  const { learningData } = useLearning();
  const projects = learningData.projects.length > 0 ? learningData.projects : SAMPLE_PROJECTS;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'badge-success';
      case 'in-progress':
        return 'badge-warning';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in-progress':
        return '→';
      default:
        return '○';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
              <Code2 className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display">Projects</h1>
              <p className="text-gray-600 dark:text-gray-400">Showcase your learning achievements</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full card text-center py-16">
              <Code2 size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No projects added yet. Start building!</p>
            </div>
          ) : (
            projects.map(project => (
              <div key={project.id} className="card-hover group border-t-4 border-primary-500 hover:border-accent-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-lg">
                      <Code2 className="text-primary-600 dark:text-primary-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:gradient-text transition-all">{project.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Phase {project.phase}</p>
                    </div>
                  </div>
                  <span className={`badge ${getStatusColor(project.status)} flex-shrink-0`}>
                    {getStatusIcon(project.status)} {project.status}
                  </span>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-5 line-clamp-3">{project.description}</p>

                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="flex-1 btn-secondary text-sm flex items-center justify-center gap-2 group/btn hover:bg-primary-50 dark:hover:bg-gray-700">
                    <ExternalLink size={16} className="group-hover/btn:text-primary-600 transition-colors" /> View
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
