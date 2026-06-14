import { createContext, useContext, useState, useEffect } from 'react';

const LearningContext = createContext();

const getInitialDarkMode = () => {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem('darkMode');
  if (stored !== null) return stored === 'true';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const LearningProvider = ({ children }) => {
  const [learningData, setLearningData] = useState({
    totalHours: 0,
    streak: 0,
    topicsCompleted: 0,
    projectsCompleted: 0,
    currentFocus: 'Phase 1 - Programming Foundations',
    dailyLogs: [],
    concepts: [],
    projects: [],
  });

  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  // Apply the theme to <html> (Tailwind class strategy) and <body> (gradient).
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', darkMode);
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('light', !darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const updateLearningData = (key, value) => {
    setLearningData(prev => ({ ...prev, [key]: value }));
  };

  const addDailyLog = (log) => {
    setLearningData(prev => ({
      ...prev,
      dailyLogs: [log, ...prev.dailyLogs],
    }));
  };

  const addConcept = (concept) => {
    setLearningData(prev => ({
      ...prev,
      concepts: [...prev.concepts, concept],
    }));
  };

  const addProject = (project) => {
    setLearningData(prev => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  return (
    <LearningContext.Provider value={{
      learningData,
      updateLearningData,
      addDailyLog,
      addConcept,
      addProject,
      darkMode,
      setDarkMode,
    }}>
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within LearningProvider');
  }
  return context;
};
