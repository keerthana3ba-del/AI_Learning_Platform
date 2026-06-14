import { Link } from 'react-router-dom';
import {
  Code2, Sigma, BarChart3, Brain, Layers, MessageSquare,
  Sparkles, Bot, Settings, Rocket, ArrowRight, FileText,
} from 'lucide-react';
import { phases, statusMeta } from '../data/roadmapData';
import { getNotesInFolder } from '../services/contentService';

const ICONS = { Code2, Sigma, BarChart3, Brain, Layers, MessageSquare, Sparkles, Bot, Settings, Rocket };

const phaseNoteCount = (phase) =>
  phase.topics.reduce((sum, t) => sum + (t.folder ? getNotesInFolder(t.folder).length : 0), 0);

const PhaseCard = ({ phase, align }) => {
  const Icon = ICONS[phase.icon] || Sparkles;
  const status = statusMeta[phase.status] || statusMeta.upcoming;
  const noteCount = phaseNoteCount(phase);

  return (
    <Link
      to={`/roadmap/${phase.id}`}
      className={`group block card-hover relative overflow-hidden text-left ${align === 'right' ? 'md:text-right' : ''}`}
    >
      {/* top gradient accent */}
      <span className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${phase.gradient}`} />

      <div className={`flex items-start gap-4 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${phase.gradient} flex items-center justify-center text-white shadow-lg`}>
          <Icon size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`flex items-center gap-2 ${align === 'right' ? 'md:justify-end' : ''}`}>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {phase.name}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">• {phase.duration}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors">
            {phase.title}
          </h3>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{phase.summary}</p>

      {/* topic chips */}
      <div className={`mt-4 flex flex-wrap gap-1.5 ${align === 'right' ? 'md:justify-end' : ''}`}>
        {phase.topics.map((t) => (
          <span
            key={t.id}
            className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300"
          >
            {t.title}
          </span>
        ))}
      </div>

      {/* footer */}
      <div className={`mt-5 flex items-center gap-3 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
        <span className={`badge ${status.badge} !text-xs`}>{status.label}</span>
        {noteCount > 0 && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            <FileText size={13} /> {noteCount} note{noteCount > 1 ? 's' : ''}
          </span>
        )}
        <span className={`inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-accent-400 ${align === 'right' ? 'md:mr-auto' : 'ml-auto'} group-hover:gap-2 transition-all`}>
          Explore <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
};

/**
 * The learning journey as an alternating vertical flow diagram.
 * - Mobile: single column with a left rail.
 * - Desktop: zig-zag timeline around a central gradient spine.
 */
export const RoadmapFlow = () => {
  return (
    <div className="relative">
      {/* spine */}
      <div className="absolute top-0 bottom-0 left-[27px] md:left-1/2 md:-translate-x-1/2 w-1 rounded-full bg-gradient-to-b from-sky-400 via-fuchsia-400 to-red-400 opacity-60" />

      <div className="space-y-8 md:space-y-12">
        {phases.map((phase, idx) => {
          const align = idx % 2 === 0 ? 'left' : 'right';
          return (
            <div key={phase.id} className="relative md:grid md:grid-cols-2 md:items-center md:gap-16">
              {/* node marker on the spine */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-2 md:top-1/2 md:-translate-y-1/2 z-10">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${phase.gradient} ring-4 ring-white dark:ring-slate-950 shadow-lg flex items-center justify-center text-white font-display`}>
                  <span className="text-lg font-bold">{phase.order}</span>
                </div>
              </div>

              {/* card – placed on alternating sides for desktop */}
              <div
                className={`pl-20 md:pl-0 ${
                  align === 'left'
                    ? 'md:col-start-1 md:pr-16'
                    : 'md:col-start-2 md:pl-16'
                }`}
              >
                <PhaseCard phase={phase} align={align} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
