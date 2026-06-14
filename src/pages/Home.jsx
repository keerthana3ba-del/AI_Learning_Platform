import { Link } from 'react-router-dom';
import { Sparkles, Map, BookOpen, ArrowRight, FileText, Layers, Newspaper } from 'lucide-react';
import { RoadmapFlow } from '../components/RoadmapFlow';
import { phases } from '../data/roadmapData';
import { getContentStats } from '../services/contentService';
import { getAllPulse } from '../services/pulseService';

const Stat = ({ icon: Icon, value, label }) => (
  <div className="flex items-center gap-3">
    <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-2xl font-bold leading-none">{value}</p>
      <p className="text-sm text-white/70 mt-1">{label}</p>
    </div>
  </div>
);

export const Home = () => {
  const stats = getContentStats();
  const pulseCount = getAllPulse().length;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 text-white">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-400/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-400/30 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-medium mb-6">
            <Sparkles size={16} /> My AI / ML learning journey, documented daily
          </div>
          <h1 className="text-4xl md:text-6xl font-display leading-tight max-w-3xl">
            From first principles to{' '}
            <span className="bg-gradient-to-r from-accent-200 to-white bg-clip-text text-transparent">
              production AI
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">
            A living knowledge base. Follow the roadmap, dive into any concept, and explore the
            notes, diagrams and code I build along the way.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#roadmap" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-700 font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              <Map size={18} /> Explore the Roadmap
            </a>
            <Link to="/courses" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/25 font-semibold hover:bg-white/20 transition-colors">
              <BookOpen size={18} /> Browse Courses
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            <Stat icon={Layers} value={phases.length} label="Phases" />
            <Stat icon={FileText} value={stats.totalNotes} label="Notes written" />
            <Stat icon={Newspaper} value={pulseCount} label="AI Pulse posts" />
          </div>
        </div>
      </section>

      {/* Roadmap flow */}
      <section id="roadmap" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="section-title">The Learning Roadmap</h2>
          <p className="section-subtitle mt-3">
            Each phase builds on the last. Click any phase to drill into its topics, then any topic
            to read the notes I've written.
          </p>
        </div>

        <RoadmapFlow />

        <div className="mt-16 text-center">
          <Link to="/ai-pulse" className="inline-flex items-center gap-2 text-primary-600 dark:text-accent-400 font-semibold hover:gap-3 transition-all">
            See what's new in AI on AI Pulse <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};
