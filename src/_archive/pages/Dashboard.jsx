import { TrendingUp, Zap, BookOpen, Code, Target, ArrowRight } from 'lucide-react';
import { useLearning } from '../contexts/LearningContext';
import { Link } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, color, trend }) => (
  <div className="card-hover group">
    <div className="flex items-start justify-between mb-3">
      <div className={`p-3 rounded-xl text-white shadow-lg ${color}`}>
        <Icon size={24} />
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
          <TrendingUp size={16} /> {trend}%
        </div>
      )}
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{label}</p>
    <p className="text-3xl font-bold mt-1">{value}</p>
  </div>
);

const QuickActionCard = ({ icon: Icon, title, description, link, color }) => (
  <Link
    to={link}
    className="card-hover group border-l-4 h-full hover:shadow-lg"
    style={{ borderColor: color }}
  >
    <div className="flex items-start gap-3">
      <div className={`p-2.5 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`${color}`} size={24} />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-1 group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      <ArrowRight size={20} className="text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-accent-400 transition-colors" />
    </div>
  </Link>
);

export const Dashboard = () => {
  const { learningData } = useLearning();

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-12 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
              <Target className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Track your learning journey</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatCard
            icon={Zap}
            label="Learning Streak"
            value={`${learningData.streak} days`}
            color="bg-gradient-to-br from-amber-500 to-orange-500"
            trend={5}
          />
          <StatCard
            icon={TrendingUp}
            label="Total Hours"
            value={learningData.totalHours}
            color="bg-gradient-to-br from-primary-600 to-primary-500"
            trend={12}
          />
          <StatCard
            icon={BookOpen}
            label="Topics Completed"
            value={learningData.topicsCompleted}
            color="bg-gradient-to-br from-emerald-500 to-teal-500"
            trend={8}
          />
          <StatCard
            icon={Code}
            label="Projects Completed"
            value={learningData.projectsCompleted}
            color="bg-gradient-to-br from-violet-500 to-purple-500"
            trend={3}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Current Focus */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Focus Card */}
            <div className="card-gradient border-l-4 border-primary-500">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Current Focus</h2>
                  <p className="text-primary-600 dark:text-accent-400 font-semibold text-lg">
                    {learningData.currentFocus}
                  </p>
                </div>
                <div className="badge badge-primary">Active</div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phase Progress</span>
                    <span className="text-sm font-bold text-primary-600 dark:text-accent-400">45%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-primary-200 dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Topics</p>
                    <p className="text-xl font-bold">8/15</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Projects</p>
                    <p className="text-xl font-bold">3/5</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Est. Time</p>
                    <p className="text-xl font-bold">2 wks</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-3">
                {learningData.dailyLogs.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">No recent activity. Start logging your learning!</p>
                  </div>
                ) : (
                  learningData.dailyLogs.slice(0, 5).map((log, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-400"></div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-gray-50">{log.topic}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{log.date} • {log.timeSpent} min</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <QuickActionCard
                  icon={BookOpen}
                  title="Start Learning"
                  description="Begin a new session"
                  link="/journal"
                  color="text-primary-600 dark:text-primary-400"
                />
                <QuickActionCard
                  icon={Code}
                  title="Browse Concepts"
                  description="Explore topics"
                  link="/concepts"
                  color="text-accent-600 dark:text-accent-400"
                />
                <QuickActionCard
                  icon={Zap}
                  title="AI Chat"
                  description="Ask questions"
                  link="/chat"
                  color="text-amber-600 dark:text-amber-400"
                />
              </div>
            </div>

            {/* Weekly Goal */}
            <div className="card-gradient border-l-4 border-accent-500">
              <h3 className="font-semibold mb-3">Weekly Goal</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">Target Hours</span>
                  <span className="font-bold">10/15</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '67%' }}></div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">5 more hours to reach your goal!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
