/**
 * Content Service
 * ----------------
 * Auto-discovers every learning note (Markdown) and image placed under
 * `src/AI-Learning/`. Drop a new `.md` file (and any co-located images)
 * anywhere in that folder tree and it shows up on the site automatically –
 * no code changes required. This is what powers the "update the repo and the
 * website updates" workflow.
 */

// Eagerly import all markdown notes as raw strings.
const rawNotes = import.meta.glob('../AI-Learning/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// Eagerly import every image as a resolvable URL.
const rawImages = import.meta.glob('../AI-Learning/**/*.{png,jpg,jpeg,gif,svg,webp}', {
  query: '?url',
  import: 'default',
  eager: true,
});

/** Strip the path down to everything after `AI-Learning/`. */
const normalize = (fullPath) => fullPath.split('AI-Learning/')[1] || fullPath;

/** Turn `Day1_Vectors` / `Linear_Algebra` into "Day1 Vectors" / "Linear Algebra". */
export const humanize = (segment = '') =>
  segment
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

/** Pull the first markdown H1 as a friendly title, fall back to the file name. */
const extractTitle = (raw, fallback) => {
  const match = raw.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : humanize(fallback);
};

// Build the image lookup: normalized path -> url, plus a basename fallback.
const imageByPath = {};
const imageByName = {};
for (const [fullPath, url] of Object.entries(rawImages)) {
  const rel = normalize(fullPath);
  imageByPath[rel] = url;
  imageByName[rel.split('/').pop()] = url;
}

// Build the note index.
const notes = Object.entries(rawNotes)
  .map(([fullPath, raw]) => {
    const rel = normalize(fullPath); // e.g. Mathematics/Linear_Algebra/Day1_Vectors.md
    const id = rel.replace(/\.md$/, ''); // Mathematics/Linear_Algebra/Day1_Vectors
    const parts = id.split('/');
    const fileName = parts.pop();
    const folder = parts.join('/');
    return {
      id,
      path: rel,
      folder,
      fileName,
      segments: parts,
      title: extractTitle(raw, fileName),
      raw,
      readingTime: Math.max(1, Math.round(raw.split(/\s+/).length / 200)),
    };
  })
  .sort((a, b) => a.fileName.localeCompare(b.fileName, undefined, { numeric: true }));

const noteById = Object.fromEntries(notes.map((n) => [n.id, n]));

/** All discovered notes. */
export const getAllNotes = () => notes;

/** A single note by its id (path without extension). */
export const getNote = (id) => noteById[id] || null;

/**
 * Every note whose folder lives under the given prefix.
 * e.g. getNotesInFolder('Mathematics/Linear_Algebra')
 */
export const getNotesInFolder = (folderPrefix) => {
  if (!folderPrefix) return notes;
  return notes.filter(
    (n) => n.folder === folderPrefix || n.folder.startsWith(`${folderPrefix}/`)
  );
};

/** Images that sit in the same folder as a note (used for the gallery). */
export const getFolderImages = (folder) =>
  Object.entries(imageByPath)
    .filter(([p]) => p.substring(0, p.lastIndexOf('/')) === folder)
    .map(([p, url]) => ({ name: p.split('/').pop(), url }));

/**
 * Resolve an image referenced inside markdown (relative to the note's folder)
 * to a bundled URL. Falls back to a basename match, then the original src.
 */
export const resolveImage = (folder, src = '') => {
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src;
  const clean = src.replace(/^\.\//, '');
  const full = folder ? `${folder}/${clean}` : clean;
  return imageByPath[full] || imageByName[clean.split('/').pop()] || src;
};

/** Total counts, handy for dashboards. */
export const getContentStats = () => ({
  totalNotes: notes.length,
  totalImages: Object.keys(imageByPath).length,
});
