import { useState } from 'react';
import { useLearning } from '../contexts/LearningContext';
import { Plus, Trash2, BookOpen, Calendar } from 'lucide-react';

export const DailyJournal = () => {
  const { learningData, addDailyLog } = useLearning();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    topic: '',
    timeSpent: '',
    whatLearned: '',
    resources: '',
    codeWritten: '',
    questions: '',
    nextStep: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDailyLog(formData);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      topic: '',
      timeSpent: '',
      whatLearned: '',
      resources: '',
      codeWritten: '',
      questions: '',
      nextStep: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-10 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
              <BookOpen className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display">Daily Journal</h1>
              <p className="text-gray-600 dark:text-gray-400">Document your learning journey</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="card-gradient border-l-4 border-primary-500 mb-10">
          <h2 className="text-2xl font-bold mb-8">New Entry</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date and Topic */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-50">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="input pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-50">Topic</label>
                <input
                  type="text"
                  name="topic"
                  placeholder="e.g., Python Lists"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
            </div>

            {/* Time Spent */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-50">Time Spent (minutes)</label>
              <input
                type="number"
                name="timeSpent"
                placeholder="45"
                value={formData.timeSpent}
                onChange={handleChange}
                className="input"
              />
            </div>

            {/* What I Learned */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-50">What I Learned</label>
              <textarea
                name="whatLearned"
                placeholder="Describe what you learned today..."
                value={formData.whatLearned}
                onChange={handleChange}
                rows="4"
                className="input resize-none"
              ></textarea>
            </div>

            {/* Resources and Code */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-50">Resources</label>
                <input
                  type="text"
                  name="resources"
                  placeholder="URLs, books, etc."
                  value={formData.resources}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-50">Code Written</label>
                <input
                  type="text"
                  name="codeWritten"
                  placeholder="Repository or file link"
                  value={formData.codeWritten}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>

            {/* Questions and Next Step */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-50">Questions</label>
                <textarea
                  name="questions"
                  placeholder="Any doubts or questions?"
                  value={formData.questions}
                  onChange={handleChange}
                  rows="3"
                  className="input resize-none"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-gray-50">Next Step</label>
                <textarea
                  name="nextStep"
                  placeholder="What's next?"
                  value={formData.nextStep}
                  onChange={handleChange}
                  rows="3"
                  className="input resize-none"
                ></textarea>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
              <Plus size={20} /> Add Entry
            </button>
          </form>
        </div>

        {/* Recent Entries */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Recent Entries</h2>
          {learningData.dailyLogs.length === 0 ? (
            <div className="card text-center py-12">
              <BookOpen size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">No entries yet. Start logging your learning journey!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {learningData.dailyLogs.map((log, idx) => (
                <div key={idx} className="card-hover group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold mb-1">{log.topic}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <Calendar size={16} /> {log.date} • {log.timeSpent} min
                      </p>
                    </div>
                    <button className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  {log.whatLearned && (
                    <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <p className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">What I Learned:</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{log.whatLearned}</p>
                    </div>
                  )}
                  {log.questions && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">❓ {log.questions}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
