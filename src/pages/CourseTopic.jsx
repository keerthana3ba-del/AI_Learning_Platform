import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, PlayCircle, Home } from 'lucide-react';
import { getCourseById, getModuleById, getTopicById } from '../data/coursesData';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Lesson not found</h2>
      <Link to="/courses" className="text-primary-600 dark:text-accent-400 font-medium">Back to Courses</Link>
    </div>
  </div>
);

export const CourseTopic = () => {
  const { courseId, moduleId, topicId } = useParams();
  const course = getCourseById(courseId);
  const module = getModuleById(courseId, moduleId);
  const topic = getTopicById(courseId, moduleId, topicId);
  if (!course || !module || !topic) return <NotFound />;

  const idx = module.topics.findIndex((t) => t.id === topicId);
  const prev = idx > 0 ? module.topics[idx - 1] : null;
  const next = idx < module.topics.length - 1 ? module.topics[idx + 1] : null;
  const topicLink = (t) => `/courses/${courseId}/modules/${moduleId}/topics/${t.id}`;

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/courses" className="inline-flex items-center gap-1 hover:text-primary-600 dark:hover:text-accent-400">
            <Home size={14} /> Courses
          </Link>
          <span>/</span>
          <Link to={`/courses/${courseId}`} className="hover:text-primary-600 dark:hover:text-accent-400 line-clamp-1">
            {course.shortTitle}
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium line-clamp-1">{module.title}</span>
        </nav>

        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${course.color}`}>
            {module.title}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display mb-3">{topic.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {topic.duration}</span>
          <span className="inline-flex items-center gap-1.5">
            {topic.completed ? <CheckCircle2 size={14} className="text-emerald-500" /> : <PlayCircle size={14} />}
            {topic.completed ? 'Completed' : 'Not started'}
          </span>
        </div>

        <article className="card md:p-8">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{topic.content}</p>

          <div className="mt-8 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              📚 Detailed lesson notes for this topic will appear here as you add them.
            </p>
          </div>
        </article>

        {/* Prev / Next */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {prev ? (
            <Link to={topicLink(prev)} className="btn-secondary inline-flex items-center gap-2 max-w-[45%]">
              <ChevronLeft size={18} /> <span className="line-clamp-1">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={topicLink(next)} className="btn-primary inline-flex items-center gap-2 max-w-[45%]">
              <span className="line-clamp-1">{next.title}</span> <ChevronRight size={18} />
            </Link>
          ) : (
            <Link to={`/courses/${courseId}`} className="btn-primary inline-flex items-center gap-2">
              Finish module <ChevronRight size={18} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
