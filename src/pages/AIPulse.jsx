import { Link } from 'react-router-dom';
import { Newspaper, ArrowRight, Calendar, Tag } from 'lucide-react';
import { getAllPulse } from '../services/pulseService';

const formatDate = (d) => {
  if (!d) return '';
  const date = new Date(d);
  return Number.isNaN(date.getTime())
    ? d
    : date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

export const AIPulse = () => {
  const entries = getAllPulse();

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white">
              <Newspaper size={26} />
            </div>
            <h1 className="text-4xl md:text-5xl font-display gradient-text dark:gradient-text-dark">
              AI Pulse
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            The latest in AI that caught my eye — new models, tools, papers and ideas worth
            remembering.
          </p>
        </div>

        {entries.length === 0 ? (
          <div className="card text-center py-16">
            <Newspaper size={44} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-600 dark:text-gray-400 font-medium">No posts yet.</p>
            <p className="text-sm text-gray-500 mt-2">
              Add a markdown file under{' '}
              <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-xs">src/AI-Pulse/</code>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {entries.map((entry) => (
              <Link key={entry.slug} to={`/ai-pulse/${entry.slug}`} className="group card-hover flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{entry.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2">
                      {entry.title}
                    </h2>
                    {entry.date && (
                      <p className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <Calendar size={12} /> {formatDate(entry.date)}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 flex-1">
                  {entry.summary}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {entry.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-primary-50 dark:bg-gray-700 text-primary-700 dark:text-accent-300">
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
