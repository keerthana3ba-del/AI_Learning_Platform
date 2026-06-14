import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { coursesData } from '../data/coursesData';
import { BookOpen, Clock, BarChart3, ArrowRight, Star } from 'lucide-react';

export const Courses = () => {
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredCourses = selectedLevel === 'all'
    ? coursesData.courses
    : coursesData.courses.filter(course => course.level.includes(selectedLevel.split(' ')[0]));

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
              <BookOpen className="text-white" size={28} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Learning Courses
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Comprehensive courses to master AI, ML, and cloud technologies. Learn at your own pace with structured modules and hands-on projects.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-10 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedLevel === 'all'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            All Courses
          </button>
          <button
            onClick={() => setSelectedLevel('Beginner')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedLevel === 'Beginner'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setSelectedLevel('Intermediate')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedLevel === 'Intermediate'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            Intermediate
          </button>
          <button
            onClick={() => setSelectedLevel('Advanced')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedLevel === 'Advanced'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            Advanced
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div
              key={course.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header with gradient */}
              <div className={`h-32 bg-gradient-to-br ${course.color} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20 pattern-dots"></div>
                <div className="absolute bottom-0 right-0 text-7xl opacity-20 font-bold">
                  {course.icon}
                </div>
                <div className="relative p-6 h-full flex flex-col justify-between">
                  <div className="text-5xl">{course.icon}</div>
                  <div
                    className={`inline-flex w-fit px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      course.status
                    )}`}
                  >
                    {getStatusLabel(course.status)}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="space-y-3 mb-6 py-4 border-t border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <BookOpen size={16} />
                      <span className="text-sm">Modules</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {course.modules.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock size={16} />
                      <span className="text-sm">Duration</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <BarChart3 size={16} />
                      <span className="text-sm">Progress</span>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {course.progress}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Progress
                    </span>
                    <span className="text-xs font-bold text-primary-600 dark:text-accent-400">
                      {course.completedLessons}/{course.totalLessons} lessons
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{course.level}</span>
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-200 group-hover:gap-3"
                  >
                    <span>Start</span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No courses found for this level.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
