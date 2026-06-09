import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LearningProvider } from './contexts/LearningContext';
import { Navbar } from './components/Navbar';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { DailyJournal } from './pages/DailyJournal';
import { Roadmaps } from './pages/Roadmaps';
import { ConceptsLibrary } from './pages/ConceptsLibrary';
import { Projects } from './pages/Projects';
import { Resources } from './pages/Resources';
import { InterviewPreparation } from './pages/InterviewPreparation';
import { AIChat } from './pages/AIChat';
import { Portfolio } from './pages/Portfolio';
import { Experiments } from './pages/Experiments';

function App() {
  return (
    <LearningProvider>
      <Router>
        <MainLayout>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/journal" element={<DailyJournal />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
            <Route path="/concepts" element={<ConceptsLibrary />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experiments" element={<Experiments />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/interview" element={<InterviewPreparation />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </MainLayout>
      </Router>
    </LearningProvider>
  );
}

export default App;
