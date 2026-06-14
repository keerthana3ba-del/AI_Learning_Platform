import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCourseById } from '../data/coursesData';
import { ChevronLeft, BookOpen, Clock, Users, CheckCircle2, Lock, Play, ArrowRight } from 'lucide-react';

export const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = getCourseById(courseId);
  const [expandedModule, setExpandedModule] = useState(0);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Course not found
          </h2>
          <Link to="/courses" className="text-primary-600 hover:text-primary-700 font-medium">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const totalProgress = course.modules.length > 0
    ? Math.round((course.completedLessons / course.totalLessons) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className={`bg-gradient-to-br ${course.color} text-white py-12 md:py-16 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20 pattern-dots"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>

          <div className="flex items-start justify-between gap-8">
            <div>
              <div className="text-6xl mb-4">{course.icon}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-white/90 max-w-2xl mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <div>
                    <p className="text-white/70 text-sm">Duration</p>
                    <p className="font-semibold">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={20} />
                  <div>
                    <p className="text-white/70 text-sm">Modules</p>
                    <p className="font-semibold">{course.modules.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <div>
                    <p className="text-white/70 text-sm">Difficulty</p>
                    <p className="font-semibold">{course.level}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="hidden lg:block bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 min-w-64">
              <div className="mb-6">
                <p className="text-white/70 text-sm mb-2">Overall Progress</p>
                <p className="text-5xl font-bold">{totalProgress}%</p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-white/70 text-sm mb-2">Lessons Completed</p>
                  <p className="text-2xl font-bold">
                    {course.completedLessons}/{course.totalLessons}
                  </p>
                </div>
                <button
                  className="w-full bg-white text-primary-600 hover:bg-gray-100 py-3 rounded-lg font-semibold transition-colors"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Modules */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Course Modules
            </h2>

            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <div
                  key={module.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <button
                    onClick={() => setExpandedModule(expandedModule === index ? -1 : index)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start gap-4 text-left">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {module.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {module.description}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            {module.lessons} Lessons
                          </span>
                          <div className="flex-1 max-w-xs">
                            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                                style={{
                                  width: `${module.topics.length > 0
                                    ? (module.topics.filter(t => t.completed).length /
                                      module.topics.length) *
                                    100
                                    : 0
                                    }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                            {module.topics.filter(t => t.completed).length}/{module.topics.length}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronLeft
                      className={`flex-shrink-0 transition-transform duration-300 ${
                        expandedModule === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  {/* Module Topics */}
                  {expandedModule === index && (
                    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 p-4 space-y-2">
                      {module.topics.map((topic, topicIndex) => (
                        <Link
                          key={topic.id}
                          to={`/courses/${courseId}/modules/${module.id}/topics/${topic.id}`}
                          className="flex items-center gap-4 p-4 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors group"
                        >
                          <div className="flex-shrink-0">
                            {topic.completed ? (
                              <CheckCircle2 size={20} className="text-green-500" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center">
                                <span className="text-xs text-gray-400">{topicIndex + 1}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600">
                              {topic.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {topic.duration}
                            </p>
                          </div>
                          <Play size={18} className="text-gray-400 group-hover:text-primary-600 transition-colors" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Course Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Course Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Instructor</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{course.instructor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">
                    {course.status.replace('-', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Lessons</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{course.totalLessons}</p>
                </div>
              </div>
            </div>

            {/* Progress Card - Mobile */}
            <div className="lg:hidden bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Your Progress
              </h3>
              <div className="text-center mb-6">
                <p className="text-5xl font-bold text-primary-600">{totalProgress}%</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {course.completedLessons}/{course.totalLessons} lessons completed
                </p>
              </div>
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors">
                Continue Learning
              </button>
            </div>

            {/* What You'll Learn */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                What You'll Learn
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Master AI and Machine Learning fundamentals
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Work with AWS AI/ML services and SageMaker
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Build and deploy production ML models
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Understand generative AI and foundation models
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
