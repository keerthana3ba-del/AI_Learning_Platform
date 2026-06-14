import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Tag } from 'lucide-react';
import { getPulseEntry, resolvePulseImage } from '../services/pulseService';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

const formatDate = (d) => {
  if (!d) return '';
  const date = new Date(d);
  return Number.isNaN(date.getTime())
    ? d
    : date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

export const AIPulseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const entry = getPulseEntry(slug);

  if (!entry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post not found</h2>
          <Link to="/ai-pulse" className="text-primary-600 dark:text-accent-400 font-medium">
            Back to AI Pulse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-accent-400 mb-6"
        >
          <ChevronLeft size={18} /> Back to AI Pulse
        </button>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{entry.emoji}</span>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            {entry.date && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} /> {formatDate(entry.date)}
              </span>
            )}
            {entry.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-primary-50 dark:bg-gray-700 text-primary-700 dark:text-accent-300">
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>
        </div>

        <article className="card md:p-8">
          <MarkdownRenderer content={entry.body} folder={entry.folder} resolveImg={resolvePulseImage} />
        </article>
      </div>
    </div>
  );
};
