import { Award, Code2, BookOpen, Briefcase, Zap } from 'lucide-react';

export const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-16 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
              <Briefcase className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display">My Portfolio</h1>
              <p className="text-gray-600 dark:text-gray-400">Showcasing AI/ML projects and achievements</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          <div className="card-gradient border-l-4 border-primary-500">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <Code2 className="text-primary-600 dark:text-primary-400" size={24} />
              </div>
              <span className="text-xs font-bold text-primary-600 dark:text-primary-400">+12%</span>
            </div>
            <p className="text-3xl font-bold mb-1">20+</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Projects Built</p>
          </div>

          <div className="card-gradient border-l-4 border-accent-500">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <BookOpen className="text-accent-600 dark:text-accent-400" size={24} />
              </div>
              <span className="text-xs font-bold text-accent-600 dark:text-accent-400">+5%</span>
            </div>
            <p className="text-3xl font-bold mb-1">300+</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Learning Notes</p>
          </div>

          <div className="card-gradient border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <Award className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400">New</span>
            </div>
            <p className="text-3xl font-bold mb-1">5+</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">Major Projects</p>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-primary-600 to-accent-500 rounded-full"></div>
            <h2 className="text-3xl font-bold">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'AI Knowledge Assistant',
                description: 'RAG-based system trained on personal learning notes. Implements semantic search, embeddings, and context injection.',
                tags: ['Python', 'RAG', 'LLM', 'Pinecone'],
                icon: '🤖',
                status: 'In Progress',
              },
              {
                title: 'Multi-Agent Research System',
                description: 'Autonomous agents for research and information gathering. Coordinates multiple AI agents for complex tasks.',
                tags: ['Agents', 'LangGraph', 'API', 'Orchestration'],
                icon: '🔍',
                status: 'In Progress',
              },
              {
                title: 'AI Resume Reviewer',
                description: 'AI-powered resume analysis and improvement suggestions. Provides real-time feedback and optimization tips.',
                tags: ['NLP', 'React', 'FastAPI', 'Claude'],
                icon: '📄',
                status: 'Completed',
              },
              {
                title: 'Production RAG System',
                description: 'Scalable RAG implementation with vector database. Deployed with monitoring and production-ready architecture.',
                tags: ['RAG', 'Docker', 'K8s', 'Monitoring'],
                icon: '📦',
                status: 'Completed',
              },
            ].map((project, idx) => (
              <div key={idx} className="card-hover group border-t-4 border-primary-500 hover:border-accent-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl mb-2">{project.icon}</div>
                  <span
                    className={`badge ${
                      project.status === 'Completed' ? 'badge-success' : 'badge-warning'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">{project.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-5 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="card-gradient border-l-4 border-accent-500">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-accent-600 dark:text-accent-400" size={24} />
            <h3 className="text-2xl font-bold">Key Achievements</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              '✨ Built comprehensive AI Learning Platform',
              '🏆 12-month structured learning journey',
              '📚 300+ documented learning concepts',
              '🚀 5 production-ready projects',
              '🤖 AI-powered knowledge assistant',
              '💾 Vector database integration',
            ].map((achievement, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50">
                <div className="text-xl">{achievement.split(' ')[0]}</div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">{achievement.slice(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="btn-primary px-8">Download Resume</button>
        </div>
      </div>
    </div>
  );
};
