import { Link } from 'react-router-dom';
import { Menu, Moon, Sun, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useLearning } from '../contexts/LearningContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, setDarkMode } = useLearning();

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Journal', path: '/journal' },
    { label: 'Roadmaps', path: '/roadmaps' },
    { label: 'Concepts', path: '/concepts' },
    { label: 'Projects', path: '/projects' },
    { label: 'Resources', path: '/resources' },
    { label: 'Interview', path: '/interview' },
    { label: 'Chat', path: '/chat' },
    { label: 'Portfolio', path: '/portfolio' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-glow">
              <Sparkles className="text-white" size={24} />
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-lg bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                AI Learning
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-accent-400 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-1 animate-slideIn">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-accent-400 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
