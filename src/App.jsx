import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LearningProvider } from './contexts/LearningContext';
import { LightboxProvider } from './contexts/LightboxContext';
import { Navbar } from './components/Navbar';
import { MainLayout } from './layouts/MainLayout';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { PhaseDetail } from './pages/PhaseDetail';
import { TopicDetail } from './pages/TopicDetail';
import { NoteView } from './pages/NoteView';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { CourseTopic } from './pages/CourseTopic';
import { AIPulse } from './pages/AIPulse';
import { AIPulseDetail } from './pages/AIPulseDetail';

// Scroll back to top whenever the route changes.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <LearningProvider>
      <LightboxProvider>
      <Router>
        <ScrollToTop />
        <MainLayout>
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/roadmap/:phaseId" element={<PhaseDetail />} />
              <Route path="/roadmap/:phaseId/:topicId" element={<TopicDetail />} />
              <Route path="/note/*" element={<NoteView />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetail />} />
              <Route
                path="/courses/:courseId/modules/:moduleId/topics/:topicId"
                element={<CourseTopic />}
              />
              <Route path="/ai-pulse" element={<AIPulse />} />
              <Route path="/ai-pulse/:slug" element={<AIPulseDetail />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </MainLayout>
      </Router>
      </LightboxProvider>
    </LearningProvider>
  );
}

export default App;
