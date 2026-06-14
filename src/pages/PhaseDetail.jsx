import { useParams, Link } from 'react-router-dom';
import {
  Code2, Sigma, BarChart3, Brain, Layers, MessageSquare, Sparkles, Bot, Settings, Rocket,
  ChevronLeft, ArrowRight, FileText, Home,
} from 'lucide-react';
import { getPhase, statusMeta } from '../data/roadmapData';
import { getNotesInFolder } from '../services/contentService';

const ICONS = { Code2, Sigma, BarChart3, Brain, Layers, MessageSquare, Sparkles, Bot, Settings, Rocket };

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Phase not found</h2>
      <Link to="/" className="text-primary-600 dark:text-accent-400 font-medium">Back home</Link>
    </div>
  </div>
);

export const PhaseDetail = () => {
  const { phaseId } = useParams();
  const phase = getPhase(phaseId);
  if (!phase) return <NotFound />;

  const Icon = ICONS[phase.icon] || Sparkles;
  const status = statusMeta[phase.status] || statusMeta.upcoming;

  return (
    <div className="min-h-screen">
      {/* Hero band */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${phase.gradient} text-white`}>
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-6">
            <Link to="/" className="inline-flex items-center gap-1 hover:text-white">
              <Home size={14} /> Home
            </Link>
            <span>/</span>
            <span className="text-white">{phase.title}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center flex-shrink-0">
              <Icon size={32} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1 text-white/80 text-sm font-medium">
                <span className="uppercase tracking-wider">{phase.name}</span>
                <span>• {phase.duration}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display">{phase.title}</h1>
              <p className="mt-3 text-white/85 max-w-2xl">{phase.summary}</p>
              <span className="inline-flex items-center gap-2 mt-4 px-3 py-1 rounded-full bg-white/15 text-sm font-medium">
                <span className={`w-2 h-2 rounded-full ${status.dot}`} /> {status.label}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h2 className="text-2xl font-bold mb-2">Topics in this phase</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Pick a topic to see its subtopics and the notes written so far.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {phase.topics.map((topic, idx) => {
            const noteCount = topic.folder ? getNotesInFolder(topic.folder).length : 0;
            return (
              <Link
                key={topic.id}
                to={`/roadmap/${phase.id}/${topic.id}`}
                className="group card-hover relative overflow-hidden"
              >
                <span className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${phase.gradient}`} />
                <div className="flex items-center justify-between mb-3 pl-2">
                  <div className="flex items-center gap-3">
                    <span className={`w-9 h-9 rounded-lg bg-gradient-to-br ${phase.gradient} text-white flex items-center justify-center text-sm font-bold`}>
                      {idx + 1}
                    </span>
                    <h3 className="text-lg font-bold group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors">
                      {topic.title}
                    </h3>
                  </div>
                  <ArrowRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="pl-2 flex flex-wrap gap-1.5 mb-4">
                  {topic.subtopics.slice(0, 6).map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300">
                      {s}
                    </span>
                  ))}
                  {topic.subtopics.length > 6 && (
                    <span className="px-2 py-0.5 text-xs text-gray-400">+{topic.subtopics.length - 6}</span>
                  )}
                </div>
                <div className="pl-2 flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <FileText size={13} />
                  {noteCount > 0 ? `${noteCount} note${noteCount > 1 ? 's' : ''}` : 'No notes yet'}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};
