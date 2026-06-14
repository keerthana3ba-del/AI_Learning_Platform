// Comprehensive AWS Certified AI Practitioner (AIF-C01) Course Data
export const coursesData = {
  courses: [
    {
      id: 'aws-aif-c01',
      title: 'AWS Certified AI Practitioner (AIF-C01)',
      shortTitle: 'AWS AI Practitioner',
      description: 'Master AWS AI/ML services and generative AI concepts',
      icon: '🤖',
      color: 'from-orange-500 to-red-500',
      duration: '40-60 hours',
      level: 'Beginner to Intermediate',
      instructor: 'AWS Learning',
      progress: 0,
      totalLessons: 47,
      completedLessons: 0,
      status: 'in-progress',
      startDate: new Date().toISOString(),
      modules: [
        {
          id: 'module-1',
          title: 'Fundamentals of AI & ML',
          description: 'Core concepts of Artificial Intelligence and Machine Learning',
          lessons: 8,
          completed: 0,
          topics: [
            {
              id: 'topic-1-1',
              title: 'What is AI and ML?',
              duration: '45 min',
              completed: false,
              content: 'Understanding the difference between AI and ML, and their applications'
            },
            {
              id: 'topic-1-2',
              title: 'Supervised vs Unsupervised Learning',
              duration: '60 min',
              completed: false,
              content: 'Classification, regression, clustering, and dimensionality reduction'
            },
            {
              id: 'topic-1-3',
              title: 'Deep Learning Basics',
              duration: '50 min',
              completed: false,
              content: 'Neural networks, layers, activation functions'
            },
            {
              id: 'topic-1-4',
              title: 'Generative AI Concepts',
              duration: '55 min',
              completed: false,
              content: 'GANs, VAEs, diffusion models, and generative models'
            },
            {
              id: 'topic-1-5',
              title: 'Responsible AI & Ethics',
              duration: '40 min',
              completed: false,
              content: 'Bias, fairness, transparency, and ethical considerations'
            },
            {
              id: 'topic-1-6',
              title: 'ML Workflow & Project Lifecycle',
              duration: '50 min',
              completed: false,
              content: 'Data preparation, training, evaluation, and deployment'
            },
            {
              id: 'topic-1-7',
              title: 'Common Use Cases',
              duration: '40 min',
              completed: false,
              content: 'Computer vision, NLP, forecasting, recommendations'
            },
            {
              id: 'topic-1-8',
              title: 'Quiz: Fundamentals Review',
              duration: '30 min',
              completed: false,
              content: 'Test your understanding of AI/ML fundamentals'
            }
          ]
        },
        {
          id: 'module-2',
          title: 'AWS AI/ML Services Overview',
          description: 'Comprehensive overview of AWS AI and ML services',
          lessons: 9,
          completed: 0,
          topics: [
            {
              id: 'topic-2-1',
              title: 'AWS AI Services Landscape',
              duration: '50 min',
              completed: false,
              content: 'Overview of all AWS AI/ML services and their use cases'
            },
            {
              id: 'topic-2-2',
              title: 'Amazon SageMaker Basics',
              duration: '60 min',
              completed: false,
              content: 'Fully managed ML platform - overview and key features'
            },
            {
              id: 'topic-2-3',
              title: 'Amazon Textract & Comprehend',
              duration: '45 min',
              completed: false,
              content: 'Document processing and natural language understanding'
            },
            {
              id: 'topic-2-4',
              title: 'Amazon Rekognition & Lookout',
              duration: '50 min',
              completed: false,
              content: 'Computer vision services for image and video analysis'
            },
            {
              id: 'topic-2-5',
              title: 'Amazon Forecast & Lookout for Metrics',
              duration: '45 min',
              completed: false,
              content: 'Time series forecasting and anomaly detection'
            },
            {
              id: 'topic-2-6',
              title: 'Amazon Personalize',
              duration: '40 min',
              completed: false,
              content: 'Build personalized recommendations at scale'
            },
            {
              id: 'topic-2-7',
              title: 'Amazon CodeWhisperer',
              duration: '35 min',
              completed: false,
              content: 'AI pair programming assistant'
            },
            {
              id: 'topic-2-8',
              title: 'Amazon Bedrock Introduction',
              duration: '55 min',
              completed: false,
              content: 'Foundation models and generative AI on AWS'
            },
            {
              id: 'topic-2-9',
              title: 'Quiz: AWS Services Review',
              duration: '30 min',
              completed: false,
              content: 'Test your knowledge of AWS AI/ML services'
            }
          ]
        },
        {
          id: 'module-3',
          title: 'Generative AI & Large Language Models',
          description: 'Deep dive into Generative AI and LLMs',
          lessons: 8,
          completed: 0,
          topics: [
            {
              id: 'topic-3-1',
              title: 'Introduction to Generative AI',
              duration: '50 min',
              completed: false,
              content: 'What is generative AI and how it differs from traditional ML'
            },
            {
              id: 'topic-3-2',
              title: 'Large Language Models (LLMs)',
              duration: '60 min',
              completed: false,
              content: 'Architecture, training, and capabilities of LLMs'
            },
            {
              id: 'topic-3-3',
              title: 'Foundation Models on AWS Bedrock',
              duration: '55 min',
              completed: false,
              content: 'Available models and their characteristics'
            },
            {
              id: 'topic-3-4',
              title: 'Prompt Engineering Best Practices',
              duration: '50 min',
              completed: false,
              content: 'Effective prompting techniques and strategies'
            },
            {
              id: 'topic-3-5',
              title: 'Retrieval-Augmented Generation (RAG)',
              duration: '55 min',
              completed: false,
              content: 'Building AI systems with domain-specific knowledge'
            },
            {
              id: 'topic-3-6',
              title: 'Fine-tuning & Customization',
              duration: '50 min',
              completed: false,
              content: 'Adapting models for specific use cases'
            },
            {
              id: 'topic-3-7',
              title: 'Agents & Autonomous AI',
              duration: '50 min',
              completed: false,
              content: 'Building AI agents with reasoning and tool use'
            },
            {
              id: 'topic-3-8',
              title: 'Quiz: Generative AI Deep Dive',
              duration: '30 min',
              completed: false,
              content: 'Assess your generative AI knowledge'
            }
          ]
        },
        {
          id: 'module-4',
          title: 'Data Management & Governance',
          description: 'Data preparation, quality, and governance for AI/ML',
          lessons: 7,
          completed: 0,
          topics: [
            {
              id: 'topic-4-1',
              title: 'Data Collection & Preparation',
              duration: '50 min',
              completed: false,
              content: 'Strategies for gathering and preparing data'
            },
            {
              id: 'topic-4-2',
              title: 'Data Quality & Validation',
              duration: '45 min',
              completed: false,
              content: 'Ensuring data accuracy and consistency'
            },
            {
              id: 'topic-4-3',
              title: 'Feature Engineering',
              duration: '55 min',
              completed: false,
              content: 'Creating meaningful features for ML models'
            },
            {
              id: 'topic-4-4',
              title: 'AWS Glue & Data Integration',
              duration: '50 min',
              completed: false,
              content: 'Integrating data from multiple sources'
            },
            {
              id: 'topic-4-5',
              title: 'Data Privacy & Compliance',
              duration: '45 min',
              completed: false,
              content: 'GDPR, HIPAA, and data protection considerations'
            },
            {
              id: 'topic-4-6',
              title: 'Data Governance Best Practices',
              duration: '40 min',
              completed: false,
              content: 'Metadata, cataloging, and data lineage'
            },
            {
              id: 'topic-4-7',
              title: 'Quiz: Data Management',
              duration: '25 min',
              completed: false,
              content: 'Test your data governance knowledge'
            }
          ]
        },
        {
          id: 'module-5',
          title: 'Building & Deploying ML Solutions',
          description: 'Practical ML development with SageMaker and deployment',
          lessons: 8,
          completed: 0,
          topics: [
            {
              id: 'topic-5-1',
              title: 'SageMaker Training & Tuning',
              duration: '60 min',
              completed: false,
              content: 'Training models at scale on SageMaker'
            },
            {
              id: 'topic-5-2',
              title: 'Model Evaluation Metrics',
              duration: '50 min',
              completed: false,
              content: 'Accuracy, precision, recall, F1-score, AUC'
            },
            {
              id: 'topic-5-3',
              title: 'Deploying Models to Production',
              duration: '55 min',
              completed: false,
              content: 'Endpoints, auto-scaling, and monitoring'
            },
            {
              id: 'topic-5-4',
              title: 'Model Monitoring & Drift Detection',
              duration: '50 min',
              completed: false,
              content: 'Detecting data drift and model performance degradation'
            },
            {
              id: 'topic-5-5',
              title: 'Batch Transform & Real-time Inference',
              duration: '45 min',
              completed: false,
              content: 'Different deployment strategies'
            },
            {
              id: 'topic-5-6',
              title: 'Serverless ML with Lambda & Bedrock',
              duration: '50 min',
              completed: false,
              content: 'Building serverless ML applications'
            },
            {
              id: 'topic-5-7',
              title: 'Cost Optimization for ML',
              duration: '40 min',
              completed: false,
              content: 'Reducing ML infrastructure costs'
            },
            {
              id: 'topic-5-8',
              title: 'Quiz: ML Development & Deployment',
              duration: '30 min',
              completed: false,
              content: 'Verify your practical ML knowledge'
            }
          ]
        },
        {
          id: 'module-6',
          title: 'Security, Compliance & Best Practices',
          description: 'Securing ML systems and following best practices',
          lessons: 7,
          completed: 0,
          topics: [
            {
              id: 'topic-6-1',
              title: 'IAM & Access Control for ML',
              duration: '45 min',
              completed: false,
              content: 'Identity and access management for ML workloads'
            },
            {
              id: 'topic-6-2',
              title: 'Encryption & Data Protection',
              duration: '50 min',
              completed: false,
              content: 'Data in transit and at rest encryption'
            },
            {
              id: 'topic-6-3',
              title: 'Audit Logging & Monitoring',
              duration: '45 min',
              completed: false,
              content: 'CloudTrail, CloudWatch for ML operations'
            },
            {
              id: 'topic-6-4',
              title: 'Model Security & Adversarial Attacks',
              duration: '50 min',
              completed: false,
              content: 'Protecting models from adversarial examples'
            },
            {
              id: 'topic-6-5',
              title: 'Compliance & Industry Standards',
              duration: '45 min',
              completed: false,
              content: 'Regulatory requirements and certifications'
            },
            {
              id: 'topic-6-6',
              title: 'AI Responsible & Governance',
              duration: '50 min',
              completed: false,
              content: 'Building trustworthy AI systems'
            },
            {
              id: 'topic-6-7',
              title: 'Quiz: Security & Compliance',
              duration: '25 min',
              completed: false,
              content: 'Test your security knowledge'
            }
          ]
        }
      ]
    },
    {
      id: 'claude-101',
      title: 'Claude 101: Foundation Models & LLM Development',
      shortTitle: 'Claude 101',
      description: 'Master Claude and foundation model development',
      icon: '🧠',
      color: 'from-purple-500 to-pink-500',
      duration: '30-40 hours',
      level: 'Beginner to Intermediate',
      instructor: 'Anthropic',
      progress: 0,
      totalLessons: 25,
      completedLessons: 0,
      status: 'not-started',
      startDate: null,
      modules: []
    },
    {
      id: 'mlops-advanced',
      title: 'MLOps: Advanced ML Engineering',
      shortTitle: 'MLOps Advanced',
      description: 'Production ML systems and MLOps practices',
      icon: '⚙️',
      color: 'from-green-500 to-blue-500',
      duration: '35-50 hours',
      level: 'Advanced',
      instructor: 'AWS Learning',
      progress: 0,
      totalLessons: 30,
      completedLessons: 0,
      status: 'not-started',
      startDate: null,
      modules: []
    }
  ]
};

// Helper functions
export const getCourseById = (courseId) => {
  return coursesData.courses.find(course => course.id === courseId);
};

export const getModuleById = (courseId, moduleId) => {
  const course = getCourseById(courseId);
  return course?.modules.find(module => module.id === moduleId);
};

export const getTopicById = (courseId, moduleId, topicId) => {
  const module = getModuleById(courseId, moduleId);
  return module?.topics.find(topic => topic.id === topicId);
};
