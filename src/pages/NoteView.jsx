import { useParams, Link } from 'react-router-dom';
import { Clock, Home, Maximize2, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getNote, getFolderImages, resolveImage, humanize } from '../services/contentService';
import { getTopicByFolder } from '../data/roadmapData';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { useLightbox } from '../contexts/LightboxContext';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Note not found</h2>
      <Link to="/" className="text-primary-600 dark:text-accent-400 font-medium">Back home</Link>
    </div>
  </div>
);

/** Remove the leading H1 from the body (we show it in the header instead). */
const stripLeadingH1 = (raw) => raw.replace(/^\s*#\s+.+\n?/, '');

export const NoteView = () => {
  const params = useParams();
  const noteId = params['*'];
  const note = getNote(noteId);
  const { openLightbox } = useLightbox();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setProgress(scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [noteId]);

  if (!note) return <NotFound />;

  const owner = getTopicByFolder(note.folder);
  const body = stripLeadingH1(note.raw);
  // Only show images that belong to this note (share its file-name prefix,
  // e.g. Day2_Foo.png / Day2_Foo_Diagram.png for Day2_Foo.md) and aren't
  // already referenced inline — so sibling notes in the same folder don't
  // leak their visuals into each other.
  const images = getFolderImages(note.folder)
    .filter((img) => img.name.replace(/\.[^.]+$/, '').startsWith(note.fileName))
    .filter((img) => !note.raw.includes(img.name));

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-primary-500 via-accent-400 to-primary-500 transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Soft header band */}
      <header className="relative overflow-hidden border-b border-gray-100 dark:border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-slate-950 dark:to-gray-900" />
        <div className="absolute -top-20 -right-16 w-72 h-72 bg-accent-300/20 dark:bg-accent-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <Link to="/" className="inline-flex items-center gap-1 hover:text-primary-600 dark:hover:text-accent-400">
              <Home size={14} /> Home
            </Link>
            {owner ? (
              <>
                <span>/</span>
                <Link to={`/roadmap/${owner.phase.id}`} className="hover:text-primary-600 dark:hover:text-accent-400">
                  {owner.phase.title}
                </Link>
                <span>/</span>
                <Link to={`/roadmap/${owner.phase.id}/${owner.topic.id}`} className="hover:text-primary-600 dark:hover:text-accent-400">
                  {owner.topic.title}
                </Link>
              </>
            ) : (
              <>
                <span>/</span>
                <span>{note.segments.map(humanize).join(' › ')}</span>
              </>
            )}
          </nav>

          <h1 className="text-3xl md:text-5xl font-display leading-tight text-gray-900 dark:text-white">
            {note.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
              <Clock size={14} /> {note.readingTime} min read
            </span>
            {owner && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-semibold bg-gradient-to-r ${owner.phase.gradient}`}>
                {owner.topic.title}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Featured visuals — shown prominently and uncropped */}
        {images.length > 0 && (
          <section className="mb-10 space-y-4">
            {images.map((img) => (
              <figure key={img.name} className="group">
                <button
                  onClick={() => openLightbox(img.url, humanize(img.name))}
                  className="relative block w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow cursor-zoom-in"
                >
                  <img
                    src={img.url}
                    alt={humanize(img.name)}
                    loading="lazy"
                    className="w-full max-h-[34rem] object-contain p-3"
                  />
                  <span className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur">
                    <Maximize2 size={16} />
                  </span>
                </button>
                <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                  {humanize(img.name)}
                </figcaption>
              </figure>
            ))}
          </section>
        )}

        {/* Article */}
        <article className="rounded-2xl bg-white dark:bg-gray-800/80 shadow-sm border border-gray-100 dark:border-gray-700/60 px-6 py-8 md:px-10 md:py-10">
          <MarkdownRenderer content={body} folder={note.folder} resolveImg={resolveImage} />
        </article>

        {/* Bottom navigation */}
        <div className="mt-10 flex items-center justify-between">
          {owner ? (
            <Link
              to={`/roadmap/${owner.phase.id}/${owner.topic.id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-accent-400 hover:gap-3 transition-all"
            >
              <ArrowLeft size={16} /> Back to {owner.topic.title}
            </Link>
          ) : (
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-accent-400">
              <ArrowLeft size={16} /> Back home
            </Link>
          )}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm text-gray-400 hover:text-primary-600 dark:hover:text-accent-400"
          >
            ↑ Top
          </button>
        </div>
      </div>
    </div>
  );
};
