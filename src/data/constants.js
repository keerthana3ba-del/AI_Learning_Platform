export const ROADMAP_PHASES = [
  {
    id: 0,
    name: 'Phase 0',
    title: 'Learning System Setup',
    duration: 'Week 1',
    topics: ['Build Dashboard', 'Daily Journal'],
  },
  {
    id: 1,
    name: 'Phase 1',
    title: 'Programming Foundations',
    duration: 'Month 1-2',
    topics: ['Python', 'Git & GitHub', 'SQL'],
  },
  {
    id: 2,
    name: 'Phase 2',
    title: 'Mathematics',
    duration: 'Month 3',
    topics: ['Linear Algebra', 'Statistics', 'Probability', 'Calculus'],
  },
  {
    id: 3,
    name: 'Phase 3',
    title: 'Data Science',
    duration: 'Month 4',
    topics: ['NumPy', 'Pandas', 'Visualization', 'EDA'],
  },
  {
    id: 4,
    name: 'Phase 4',
    title: 'Machine Learning',
    duration: 'Month 5-6',
    topics: ['ML Fundamentals', 'Supervised Learning', 'Unsupervised Learning'],
  },
  {
    id: 5,
    name: 'Phase 5',
    title: 'Deep Learning',
    duration: 'Month 7',
    topics: ['Neural Networks', 'Activation Functions', 'CNN', 'RNN'],
  },
  {
    id: 6,
    name: 'Phase 6',
    title: 'NLP',
    duration: 'Month 8',
    topics: ['Text Processing', 'NLP Techniques', 'Transformers', 'NLP Tasks'],
  },
  {
    id: 7,
    name: 'Phase 7',
    title: 'Generative AI',
    duration: 'Month 9',
    topics: ['LLM Fundamentals', 'Prompt Engineering', 'Embeddings', 'RAG'],
  },
  {
    id: 8,
    name: 'Phase 8',
    title: 'AI Agents',
    duration: 'Month 10',
    topics: ['Agent Concepts', 'Frameworks', 'Agent Architectures'],
  },
  {
    id: 9,
    name: 'Phase 9',
    title: 'MLOps',
    duration: 'Month 11',
    topics: ['Deployment', 'CI/CD', 'Monitoring'],
  },
  {
    id: 10,
    name: 'Phase 10',
    title: 'Final Product',
    duration: 'Month 12',
    topics: ['AI Learning Platform', 'Capstone Projects'],
  },
];

export const CONCEPTS_TEMPLATE = {
  definition: '',
  whyNeeded: '',
  prerequisites: [],
  howItWorks: '',
  mathBehind: '',
  codeExample: '',
  realWorldApplications: [],
  advantages: [],
  limitations: [],
  interviewQuestions: [],
  references: [],
  myNotes: '',
  myUnderstanding: '',
};

export const SAMPLE_CONCEPTS = [
  {
    id: 1,
    title: 'Variables',
    phase: 1,
    definition: 'Named containers that store data values',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Linear Regression',
    phase: 4,
    definition: 'Supervised learning algorithm for predicting continuous values',
    status: 'in-progress',
  },
];

export const SAMPLE_PROJECTS = [
  {
    id: 1,
    title: 'Calculator',
    phase: 1,
    status: 'completed',
    description: 'Basic calculator with operations',
  },
  {
    id: 2,
    title: 'House Price Prediction',
    phase: 4,
    status: 'in-progress',
    description: 'ML model for predicting house prices',
  },
];

export const INTERVIEW_QUESTIONS = [
  {
    id: 1,
    category: 'Python Basics',
    question: 'What is the difference between a list and a tuple in Python?',
    answer: 'Lists are mutable (can be changed), while tuples are immutable (cannot be changed after creation).',
  },
  {
    id: 2,
    category: 'Machine Learning',
    question: 'Explain overfitting and how to prevent it?',
    answer: 'Overfitting occurs when a model learns noise in training data. It can be prevented through regularization, cross-validation, and using more training data.',
  },
];
