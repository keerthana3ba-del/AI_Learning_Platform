import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Maximize2 } from 'lucide-react';
import { useLightbox } from '../contexts/LightboxContext';

/**
 * Renders a markdown string with the platform's styling. Images are resolved
 * through `resolveImg(folder, src)` so co-located images in the notes folder
 * load correctly. Pass `folder` (the note's directory) for image resolution.
 * Inline images are framed and open in a full-screen lightbox on click.
 */
export const MarkdownRenderer = ({ content, folder = '', resolveImg }) => {
  const resolve = (src) => (resolveImg ? resolveImg(folder, src) : src);
  const { openLightbox } = useLightbox();

  return (
    <div className="text-[15px] md:text-[17px] leading-7 md:leading-8 text-gray-700 dark:text-gray-300/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl md:text-4xl font-display gradient-text dark:gradient-text-dark mt-2 mb-5">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-2">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4 mb-2">
              {children}
            </h4>
          ),
          p: ({ children }) => <p className="my-3">{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-accent-400 font-medium underline decoration-primary-300 dark:decoration-accent-600 underline-offset-2 hover:decoration-2"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="my-3 ml-5 space-y-1.5 list-disc marker:text-primary-500 dark:marker:text-accent-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-3 ml-5 space-y-1.5 list-decimal marker:text-primary-500 dark:marker:text-accent-400 marker:font-semibold">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-accent-400 bg-accent-50/60 dark:bg-accent-900/10 rounded-r-lg px-4 py-2 italic text-gray-700 dark:text-gray-300">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-8 border-gray-200 dark:border-gray-700" />,
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
          ),
          pre: ({ children }) => (
            <pre className="my-4 overflow-x-auto rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-4 text-sm text-slate-800 dark:text-slate-100 shadow-sm">
              {children}
            </pre>
          ),
          code: ({ className, children }) => {
            const isBlock = /language-/.test(className || '');
            if (isBlock) {
              return <code className="font-mono text-[0.92em] leading-relaxed text-slate-800 dark:text-slate-100">{children}</code>;
            }
            return (
              <code className="font-mono text-[0.85em] px-1.5 py-0.5 rounded-md bg-primary-50 dark:bg-gray-800 text-primary-700 dark:text-accent-300 border border-primary-100 dark:border-gray-700">
                {children}
              </code>
            );
          },
          img: ({ src, alt }) => {
            const resolved = resolve(src);
            return (
              <figure className="my-7 group">
                <button
                  type="button"
                  onClick={() => openLightbox(resolved, alt || '')}
                  className="relative block w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow cursor-zoom-in"
                >
                  <img
                    src={resolved}
                    alt={alt || ''}
                    loading="lazy"
                    className="w-full max-h-[34rem] object-contain p-3"
                  />
                  <span className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur">
                    <Maximize2 size={16} />
                  </span>
                </button>
                {alt && (
                  <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          },
          table: ({ children }) => (
            <div className="my-5 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50 dark:bg-gray-800 text-left">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2.5 font-semibold text-gray-900 dark:text-white">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2.5 border-t border-gray-100 dark:border-gray-700">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
