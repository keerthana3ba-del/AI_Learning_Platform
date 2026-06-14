import { Link, NavLink } from 'react-router-dom';
import { Menu, Moon, Sun, X, Sparkles, Map, BookOpen, Newspaper } from 'lucide-react';
import { useState } from 'react';
import { useLearning } from '../contexts/LearningContext';

const navItems = [
  { label: 'Roadmap', path: '/', icon: Map, end: true },
  { label: 'Courses', path: '/courses', icon: BookOpen },
  { label: 'AI Pulse', path: '/ai-pulse', icon: Newspaper },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, setDarkMode } = useLearning();

  const linkClasses = ({ isActive }) =>
    `inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-primary-50 dark:bg-gray-800 text-primary-600 dark:text-accent-400'
        : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-accent-400'
    }`;

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
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} end={item.end} className={linkClasses}>
                <item.icon size={16} /> {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1 animate-slideIn">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 dark:bg-gray-800 text-primary-600 dark:text-accent-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-800'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={16} /> {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
