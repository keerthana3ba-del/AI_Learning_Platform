import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LightboxContext = createContext();

/**
 * App-wide image lightbox. Any component can call `openLightbox(url, caption)`
 * to show a full-screen, zoomable view. A single overlay is rendered here so we
 * never duplicate the markup (used by the markdown renderer and note pages).
 */
export const LightboxProvider = ({ children }) => {
  const [image, setImage] = useState(null); // { src, caption }

  const openLightbox = useCallback((src, caption = '') => setImage({ src, caption }), []);
  const closeLightbox = useCallback(() => setImage(null), []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeLightbox();
    if (image) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [image, closeLightbox]);

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}
      {image && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn cursor-zoom-out"
          onClick={closeLightbox}
        >
          <img
            src={image.src}
            alt={image.caption}
            className="max-h-[88vh] max-w-full rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          {image.caption && (
            <p className="mt-4 text-sm text-white/80 text-center max-w-2xl">{image.caption}</p>
          )}
        </div>
      )}
    </LightboxContext.Provider>
  );
};

export const useLightbox = () => {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used within LightboxProvider');
  return ctx;
};
