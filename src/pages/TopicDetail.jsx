import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ArrowRight, FileText, Clock, CheckCircle2, Circle, Home } from 'lucide-react';
import { getPhase, getTopic } from '../data/roadmapData';
import { getNotesInFolder } from '../services/contentService';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Topic not found</h2>
      <Link to="/" className="text-primary-600 dark:text-accent-400 font-medium">Back home</Link>
    </div>
  </div>
);

/** Find a discovered note that best matches a subtopic name. */
const matchNote = (notes, subtopic) => {
  const needle = subtopic.toLowerCase().replace(/[^a-z0-9]/g, '');
  return notes.find((n) => {
    const hay = `${n.fileName} ${n.title}`.toLowerCase().replace(/[^a-z0-9]/g, '');
    return hay.includes(needle);
  });
};

export const TopicDetail = () => {
  const { phaseId, topicId } = useParams();
  const phase = getPhase(phaseId);
  const topic = getTopic(phaseId, topicId);
  if (!phase || !topic) return <NotFound />;

  const notes = topic.folder ? getNotesInFolder(topic.folder) : [];
  const matchedIds = new Set();

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-primary-600 dark:hover:text-accent-400">
            <Home size={14} /> Home
          </Link>
          <span>/</span>
          <Link to={`/roadmap/${phase.id}`} className="hover:text-primary-600 dark:hover:text-accent-400">
            {phase.title}
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">{topic.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${phase.gradient} mb-3`}>
            {phase.name} · {phase.title}
          </span>
          <h1 className="text-3xl md:text-4xl font-display gradient-text dark:gradient-text-dark">
            {topic.title}
          </h1>
        </div>

        {/* Subtopics curriculum flow */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Curriculum</h2>
          <div className="flex flex-wrap items-stretch gap-3">
            {topic.subtopics.map((sub, idx) => {
              const note = matchNote(notes, sub);
              if (note) matchedIds.add(note.id);
              const inner = (
                <>
                  <span className="flex-shrink-0">
                    {note ? (
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    ) : (
                      <Circle size={18} className="text-gray-300 dark:text-gray-600" />
                    )}
                  </span>
                  <span className="text-sm font-medium">{sub}</span>
                  {note && <ArrowRight size={14} className="text-primary-500 dark:text-accent-400" />}
                </>
              );
              const base = 'flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all';
              return note ? (
                <Link
                  key={sub}
                  to={`/note/${note.id}`}
                  className={`${base} bg-white dark:bg-gray-800 border-primary-200 dark:border-gray-700 hover:border-primary-400 hover:shadow-md text-gray-900 dark:text-white`}
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={sub}
                  className={`${base} bg-gray-50 dark:bg-gray-800/50 border-dashed border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400`}
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        {/* Notes */}
        <section>
          <h2 className="text-xl font-bold mb-4">
            Notes <span className="text-gray-400 font-normal text-base">({notes.length})</span>
          </h2>

          {notes.length === 0 ? (
            <div className="card text-center py-12">
              <FileText size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-600 dark:text-gray-400 font-medium">No notes here yet.</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Add a markdown file under{' '}
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-xs">
                  src/AI-Learning/{topic.folder}/
                </code>{' '}
                and it will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notes.map((note) => (
                <Link key={note.id} to={`/note/${note.id}`} className="group card-hover">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <FileText size={18} className="text-primary-600 dark:text-accent-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2">
                        {note.title}
                      </h3>
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock size={12} /> {note.readingTime} min read
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
