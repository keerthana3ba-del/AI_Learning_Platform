import { useState } from 'react';
import { SAMPLE_CONCEPTS } from '../data/constants';
import { useLearning } from '../contexts/LearningContext';
import { Plus, Book, Check } from 'lucide-react';

export const ConceptsLibrary = () => {
  const [selectedConcept, setSelectedConcept] = useState(null);
  const { learningData } = useLearning();
  const concepts = learningData.concepts.length > 0 ? learningData.concepts : SAMPLE_CONCEPTS;

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
              <Book className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display">Concepts Library</h1>
              <p className="text-gray-600 dark:text-gray-400">Master fundamental AI/ML concepts</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Concepts List */}
          <div className="lg:col-span-2 space-y-4">
            {concepts.length === 0 ? (
              <div className="card text-center py-12">
                <Book size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No concepts added yet. Start building your knowledge!</p>
              </div>
            ) : (
              concepts.map(concept => (
                <div
                  key={concept.id}
                  onClick={() => setSelectedConcept(concept)}
                  className="card-hover cursor-pointer border-l-4 border-primary-500 hover:border-accent-500"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold">{concept.title}</h3>
                        {concept.status === 'completed' && (
                          <Check className="text-green-500 flex-shrink-0" size={20} />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Phase {concept.phase}</p>
                    </div>
                    <span
                      className={`badge ${
                        concept.status === 'completed' ? 'badge-success' : 'badge-warning'
                      }`}
                    >
                      {concept.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{concept.definition}</p>
                </div>
              ))
            )}
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-gradient border-l-4 border-accent-500 sticky top-24">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Book size={20} /> Details
              </h2>

              {selectedConcept ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{selectedConcept.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Phase {selectedConcept.phase}</p>
                  </div>
                  <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Definition:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedConcept.definition}</p>
                  </div>
                  <button className="btn-primary w-full">View Full Documentation</button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Book size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select a concept to view details</p>
                  <button className="btn-accent w-full flex items-center justify-center gap-2">
                    <Plus size={18} /> Add Concept
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
