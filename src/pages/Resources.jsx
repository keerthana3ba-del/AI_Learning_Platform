import { BookOpen, ExternalLink, Link2 } from 'lucide-react';

const RESOURCES = [
  {
    id: 1,
    title: 'Python Documentation',
    category: 'Python',
    url: 'https://docs.python.org',
    description: 'Official Python documentation and guides',
  },
  {
    id: 2,
    title: '3Blue1Brown - Mathematics',
    category: 'Mathematics',
    url: 'https://www.youtube.com/3blue1brown',
    description: 'Visual mathematics explanations and animations',
  },
  {
    id: 3,
    title: 'Scikit-learn Documentation',
    category: 'Machine Learning',
    url: 'https://scikit-learn.org',
    description: 'ML library documentation with examples',
  },
  {
    id: 4,
    title: 'TensorFlow Tutorials',
    category: 'Deep Learning',
    url: 'https://www.tensorflow.org/tutorials',
    description: 'Official TensorFlow learning resources',
  },
];

export const Resources = () => {
  const categories = [...new Set(RESOURCES.map(r => r.category))];

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
              <Link2 className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display">Learning Resources</h1>
              <p className="text-gray-600 dark:text-gray-400">Curated links and materials</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {categories.map((category, categoryIdx) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-primary-600 to-accent-500 rounded-full"></div>
                <h2 className="text-3xl font-bold">{category}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {RESOURCES.filter(r => r.category === category).map(resource => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-hover group border-l-4 border-primary-500 hover:border-accent-500"
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <div className="p-3 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-lg flex-shrink-0">
                        <BookOpen className="text-primary-600 dark:text-primary-400 group-hover:text-accent-600 dark:group-hover:text-accent-300 transition-colors" size={24} />
                      </div>
                      <h3 className="font-bold text-lg group-hover:gradient-text transition-all line-clamp-2">{resource.title}</h3>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">{resource.description}</p>

                    <div className="flex items-center gap-2 text-primary-600 dark:text-accent-400 font-medium group-hover:gap-3 transition-all">
                      Visit <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 card-gradient border-l-4 border-accent-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Want to add more resources?</h3>
              <p className="text-gray-700 dark:text-gray-300">Share your favorite learning materials with the community</p>
            </div>
            <button className="btn-accent flex-shrink-0">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
