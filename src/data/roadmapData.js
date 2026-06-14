/**
 * Roadmap Data
 * ------------
 * The structured learning journey rendered as the home-page flow diagram.
 * Hierarchy: Phase -> Topic -> Subtopic.
 *
 * `folder` on a topic maps it to a directory under `src/AI-Learning/`. Notes
 * dropped into that folder are auto-discovered (see contentService) and shown
 * on the topic page, and matched to subtopics by name. To add a new note you
 * only need to create the markdown file – no edits here are required.
 *
 * `status` is a soft hint for colour/ordering ('completed' | 'in-progress' |
 * 'upcoming'); the UI also shows live note counts from discovered content.
 */

export const phases = [
  {
    id: 'phase-1',
    order: 1,
    name: 'Phase 1',
    title: 'Programming Foundations',
    summary: 'The bedrock: Python, version control and databases.',
    duration: 'Month 1–2',
    icon: 'Code2',
    gradient: 'from-sky-500 to-blue-600',
    accent: '#0ea5e9',
    status: 'completed',
    topics: [
      {
        id: 'python',
        title: 'Python',
        folder: 'Programming/Python',
        subtopics: ['Basics', 'Control Flow', 'Functions', 'Data Structures', 'OOP', 'Advanced'],
      },
      {
        id: 'git-github',
        title: 'Git & GitHub',
        folder: 'Programming/Git',
        subtopics: ['Repository', 'Commit', 'Branch', 'Merge', 'Pull Request', 'Git Workflow'],
      },
      {
        id: 'sql',
        title: 'SQL',
        folder: 'Programming/SQL',
        subtopics: ['SELECT', 'WHERE', 'ORDER BY', 'GROUP BY', 'JOINS', 'Indexing', 'Normalization'],
      },
    ],
  },
  {
    id: 'phase-2',
    order: 2,
    name: 'Phase 2',
    title: 'Mathematics',
    summary: 'The language of ML: algebra, stats, probability and calculus.',
    duration: 'Month 3',
    icon: 'Sigma',
    gradient: 'from-violet-500 to-purple-600',
    accent: '#8b5cf6',
    status: 'in-progress',
    topics: [
      {
        id: 'linear-algebra',
        title: 'Linear Algebra',
        folder: 'Mathematics/Linear_Algebra',
        subtopics: ['Scalars', 'Vectors', 'Matrices', 'Matrix Multiplication', 'Dot Product', 'Eigenvalues', 'Eigenvectors'],
      },
      {
        id: 'statistics',
        title: 'Statistics',
        folder: 'Mathematics/Statistics',
        subtopics: ['Mean', 'Median', 'Mode', 'Variance', 'Standard Deviation', 'Distribution'],
      },
      {
        id: 'probability',
        title: 'Probability',
        folder: 'Mathematics/Probability',
        subtopics: ['Probability Rules', 'Conditional Probability', 'Bayes Theorem', 'Random Variables'],
      },
      {
        id: 'calculus',
        title: 'Calculus',
        folder: 'Mathematics/Calculus',
        subtopics: ['Derivatives', 'Gradients', 'Chain Rule', 'Optimization'],
      },
    ],
  },
  {
    id: 'phase-3',
    order: 3,
    name: 'Phase 3',
    title: 'Data Science',
    summary: 'Wrangle, explore and visualise real-world data.',
    duration: 'Month 4',
    icon: 'BarChart3',
    gradient: 'from-emerald-500 to-teal-600',
    accent: '#10b981',
    status: 'upcoming',
    topics: [
      { id: 'numpy', title: 'NumPy', folder: 'DataScience/NumPy', subtopics: ['Arrays', 'Broadcasting', 'Vectorization'] },
      { id: 'pandas', title: 'Pandas', folder: 'DataScience/Pandas', subtopics: ['DataFrames', 'Cleaning', 'Filtering', 'Aggregation'] },
      { id: 'visualization', title: 'Visualization', folder: 'DataScience/Visualization', subtopics: ['Matplotlib', 'Seaborn', 'Plotly'] },
      { id: 'eda', title: 'EDA', folder: 'DataScience/EDA', subtopics: ['Missing Values', 'Outlier Detection', 'Feature Analysis'] },
    ],
  },
  {
    id: 'phase-4',
    order: 4,
    name: 'Phase 4',
    title: 'Machine Learning',
    summary: 'Supervised, unsupervised learning and model evaluation.',
    duration: 'Month 5–6',
    icon: 'Brain',
    gradient: 'from-amber-500 to-orange-600',
    accent: '#f59e0b',
    status: 'upcoming',
    topics: [
      { id: 'ml-fundamentals', title: 'ML Fundamentals', folder: 'MachineLearning/Fundamentals', subtopics: ['ML Lifecycle', 'Bias-Variance', 'Overfitting', 'Underfitting'] },
      { id: 'supervised', title: 'Supervised Learning', folder: 'MachineLearning/Supervised', subtopics: ['Linear Regression', 'Logistic Regression', 'KNN', 'Decision Tree', 'Random Forest', 'XGBoost'] },
      { id: 'unsupervised', title: 'Unsupervised Learning', folder: 'MachineLearning/Unsupervised', subtopics: ['K-Means', 'Hierarchical Clustering', 'DBSCAN', 'PCA'] },
      { id: 'model-evaluation', title: 'Model Evaluation', folder: 'MachineLearning/Evaluation', subtopics: ['Accuracy', 'Precision', 'Recall', 'F1 Score', 'ROC-AUC', 'Cross Validation'] },
    ],
  },
  {
    id: 'phase-5',
    order: 5,
    name: 'Phase 5',
    title: 'Deep Learning',
    summary: 'Neural networks, CNNs, RNNs and the major frameworks.',
    duration: 'Month 7',
    icon: 'Layers',
    gradient: 'from-rose-500 to-pink-600',
    accent: '#f43f5e',
    status: 'upcoming',
    topics: [
      { id: 'neural-networks', title: 'Neural Networks', folder: 'DeepLearning/NeuralNetworks', subtopics: ['Neurons', 'Layers', 'Forward Propagation', 'Backpropagation'] },
      { id: 'activation-functions', title: 'Activation Functions', folder: 'DeepLearning/Activations', subtopics: ['ReLU', 'Sigmoid', 'Tanh', 'Softmax'] },
      { id: 'frameworks', title: 'Frameworks', folder: 'DeepLearning/Frameworks', subtopics: ['TensorFlow', 'PyTorch'] },
      { id: 'cnn', title: 'CNN', folder: 'DeepLearning/CNN', subtopics: ['Convolution', 'Pooling', 'Feature Extraction'] },
      { id: 'rnn', title: 'RNN', folder: 'DeepLearning/RNN', subtopics: ['Sequence Modeling', 'LSTM', 'GRU'] },
    ],
  },
  {
    id: 'phase-6',
    order: 6,
    name: 'Phase 6',
    title: 'NLP',
    summary: 'Text processing, embeddings and transformer architectures.',
    duration: 'Month 8',
    icon: 'MessageSquare',
    gradient: 'from-cyan-500 to-sky-600',
    accent: '#06b6d4',
    status: 'upcoming',
    topics: [
      { id: 'text-processing', title: 'Text Processing', folder: 'NLP/TextProcessing', subtopics: ['Tokenization', 'Stemming', 'Lemmatization'] },
      { id: 'nlp-techniques', title: 'NLP Techniques', folder: 'NLP/Techniques', subtopics: ['Bag of Words', 'TF-IDF', 'Word Embeddings'] },
      { id: 'transformers', title: 'Transformers', folder: 'NLP/Transformers', subtopics: ['Attention', 'Self-Attention', 'Encoder', 'Decoder'] },
      { id: 'nlp-tasks', title: 'NLP Tasks', folder: 'NLP/Tasks', subtopics: ['Sentiment Analysis', 'Named Entity Recognition', 'Text Classification'] },
    ],
  },
  {
    id: 'phase-7',
    order: 7,
    name: 'Phase 7',
    title: 'Generative AI',
    summary: 'LLMs, prompt engineering, embeddings, vector DBs and RAG.',
    duration: 'Month 9',
    icon: 'Sparkles',
    gradient: 'from-fuchsia-500 to-purple-600',
    accent: '#d946ef',
    status: 'upcoming',
    topics: [
      { id: 'llm-fundamentals', title: 'LLM Fundamentals', folder: 'GenAI/LLM', subtopics: ['Transformers', 'Tokens', 'Context Window', 'Fine Tuning'] },
      { id: 'prompt-engineering', title: 'Prompt Engineering', folder: 'GenAI/PromptEngineering', subtopics: ['Zero Shot', 'Few Shot', 'Chain of Thought'] },
      { id: 'embeddings', title: 'Embeddings', folder: 'GenAI/Embeddings', subtopics: ['Similarity Search', 'Semantic Search'] },
      { id: 'vector-databases', title: 'Vector Databases', folder: 'GenAI/VectorDB', subtopics: ['ChromaDB', 'Pinecone', 'Weaviate'] },
      { id: 'rag', title: 'RAG', folder: 'GenAI/RAG', subtopics: ['Retrieval', 'Chunking', 'Embeddings', 'Context Injection'] },
    ],
  },
  {
    id: 'phase-8',
    order: 8,
    name: 'Phase 8',
    title: 'AI Agents',
    summary: 'Planning, tool use, memory and multi-agent systems.',
    duration: 'Month 10',
    icon: 'Bot',
    gradient: 'from-indigo-500 to-blue-600',
    accent: '#6366f1',
    status: 'upcoming',
    topics: [
      { id: 'agent-concepts', title: 'Agent Concepts', folder: 'Agents/Concepts', subtopics: ['Planning', 'Tool Use', 'Memory', 'Reflection'] },
      { id: 'agent-frameworks', title: 'Frameworks', folder: 'Agents/Frameworks', subtopics: ['LangGraph', 'LangChain', 'CrewAI'] },
      { id: 'agent-architectures', title: 'Agent Architectures', folder: 'Agents/Architectures', subtopics: ['Single Agent', 'Multi-Agent'] },
    ],
  },
  {
    id: 'phase-9',
    order: 9,
    name: 'Phase 9',
    title: 'MLOps',
    summary: 'Deployment, CI/CD and production monitoring.',
    duration: 'Month 11',
    icon: 'Settings',
    gradient: 'from-lime-500 to-green-600',
    accent: '#84cc16',
    status: 'upcoming',
    topics: [
      { id: 'deployment', title: 'Deployment', folder: 'MLOps/Deployment', subtopics: ['FastAPI', 'Flask', 'Docker'] },
      { id: 'cicd', title: 'CI/CD', folder: 'MLOps/CICD', subtopics: ['GitHub Actions', 'Automated Deployment'] },
      { id: 'monitoring', title: 'Monitoring', folder: 'MLOps/Monitoring', subtopics: ['Logs', 'Metrics', 'Alerts'] },
    ],
  },
  {
    id: 'phase-10',
    order: 10,
    name: 'Phase 10',
    title: 'Final Product',
    summary: 'Capstone projects and the production AI portfolio.',
    duration: 'Month 12',
    icon: 'Rocket',
    gradient: 'from-red-500 to-orange-600',
    accent: '#ef4444',
    status: 'upcoming',
    topics: [
      { id: 'ai-learning-platform', title: 'AI Learning Platform', folder: 'FinalProduct/Platform', subtopics: ['Knowledge Graph', 'AI Chat with Notes', 'Progress Tracking', 'Quiz Generator', 'Flashcards'] },
      { id: 'capstone-projects', title: 'Capstone Projects', folder: 'FinalProduct/Capstone', subtopics: ['AI Knowledge Assistant', 'Multi-Agent Research System', 'AI Resume Reviewer', 'Production RAG System'] },
    ],
  },
];

export const getPhase = (id) => phases.find((p) => p.id === id) || null;

/** Find the phase + topic that owns a given content folder. */
export const getTopicByFolder = (folder) => {
  for (const phase of phases) {
    const topic = phase.topics.find((t) => t.folder && (folder === t.folder || folder.startsWith(`${t.folder}/`)));
    if (topic) return { phase, topic };
  }
  return null;
};

export const getTopic = (phaseId, topicId) => {
  const phase = getPhase(phaseId);
  return phase ? phase.topics.find((t) => t.id === topicId) || null : null;
};

export const statusMeta = {
  completed: { label: 'Completed', badge: 'badge-success', dot: 'bg-emerald-500' },
  'in-progress': { label: 'In Progress', badge: 'badge-warning', dot: 'bg-amber-500' },
  upcoming: { label: 'Upcoming', badge: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300', dot: 'bg-gray-400' },
};
