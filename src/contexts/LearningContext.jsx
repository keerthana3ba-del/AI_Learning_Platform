import { createContext, useContext, useState } from 'react';

const LearningContext = createContext();

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

  const [darkMode, setDarkMode] = useState(false);

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
