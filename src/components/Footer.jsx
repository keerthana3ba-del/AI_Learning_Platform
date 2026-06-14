import { Link } from 'react-router-dom';
import { Sparkles, Github } from 'lucide-react';

export const Footer = () => (
  <footer className="mt-auto border-t border-gray-100 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
            <Sparkles className="text-white" size={16} />
          </div>
          <span className="font-display text-sm bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            AI Learning Platform
          </span>
        </div>

        <nav className="flex items-center gap-5 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-primary-600 dark:hover:text-accent-400">Roadmap</Link>
          <Link to="/courses" className="hover:text-primary-600 dark:hover:text-accent-400">Courses</Link>
          <Link to="/ai-pulse" className="hover:text-primary-600 dark:hover:text-accent-400">AI Pulse</Link>
        </nav>

        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
          <Github size={14} /> Built &amp; documented daily
        </p>
      </div>
    </div>
  </footer>
);
