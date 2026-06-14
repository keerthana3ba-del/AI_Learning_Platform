/**
 * AI Pulse Service
 * ----------------
 * Auto-discovers "AI Pulse" entries – your notes on the latest AI tech, models,
 * tools and papers. Drop a markdown file into `src/AI-Pulse/` and it appears on
 * the AI Pulse tab automatically.
 *
 * Each file may start with a lightweight frontmatter block:
 *
 *   ---
 *   title: Claude Opus 4.8 is here
 *   date: 2026-06-10
 *   tags: models, anthropic
 *   summary: A quick look at what changed.
 *   emoji: 🧠
 *   ---
 *
 * Everything after the closing `---` is the markdown body.
 */

const rawEntries = import.meta.glob('../AI-Pulse/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const rawImages = import.meta.glob('../AI-Pulse/**/*.{png,jpg,jpeg,gif,svg,webp}', {
  query: '?url',
  import: 'default',
  eager: true,
});

const normalize = (fullPath) => fullPath.split('AI-Pulse/')[1] || fullPath;

const imageByPath = {};
const imageByName = {};
for (const [fullPath, url] of Object.entries(rawImages)) {
  const rel = normalize(fullPath);
  imageByPath[rel] = url;
  imageByName[rel.split('/').pop()] = url;
}

/** Parse a tiny `--- key: value ---` frontmatter block. */
const parseFrontmatter = (raw) => {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) meta[key] = value;
  }
  return { meta, body: match[2] };
};

const firstHeading = (body, fallback) => {
  const m = body.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
};

const entries = Object.entries(rawEntries)
  .map(([fullPath, raw]) => {
    const rel = normalize(fullPath);
    const slug = rel.replace(/\.md$/, '').replace(/\//g, '-');
    const fileName = rel.replace(/\.md$/, '').split('/').pop();
    const folder = rel.substring(0, rel.lastIndexOf('/'));
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug,
      folder,
      title: meta.title || firstHeading(body, fileName),
      date: meta.date || '',
      summary: meta.summary || body.replace(/[#*`>_-]/g, '').trim().slice(0, 160),
      tags: meta.tags ? meta.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      emoji: meta.emoji || '📰',
      body,
    };
  })
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

export const getAllPulse = () => entries;

export const getPulseEntry = (slug) => entries.find((e) => e.slug === slug) || null;

export const resolvePulseImage = (folder, src = '') => {
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src;
  const clean = src.replace(/^\.\//, '');
  const full = folder ? `${folder}/${clean}` : clean;
  return imageByPath[full] || imageByName[clean.split('/').pop()] || src;
};
