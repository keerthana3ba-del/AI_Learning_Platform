# AI Learning Platform

A comprehensive React-based learning platform for tracking AI and Machine Learning education journey. This platform helps you organize learning materials, track progress, document concepts, manage projects, and interact with an AI assistant.

## Features

✨ **Complete Learning System:**
- **Dashboard** - Track learning metrics (hours, streak, topics, projects)
- **Daily Journal** - Log daily learning sessions with structured entries
- **Roadmaps** - Follow a 12-phase AI/ML learning roadmap
- **Concepts Library** - Organize learning with structured concept documentation
- **Projects** - Showcase mini and major projects
- **Experiments** - Log and track experiments
- **Resources** - Curated learning resources library
- **Interview Preparation** - Questions and answers for interview prep
- **AI Chat** - Chat interface for learning assistance
- **Portfolio** - Display achievements and major projects

## Tech Stack

- **Framework:** React 18
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **State Management:** Context API
- **Build Tool:** Vite
- **Icons:** Lucide React

## Project Structure

```
src/
├── components/           # Reusable UI components
│   └── Navbar.jsx
├── pages/               # Page components
│   ├── Dashboard.jsx
│   ├── DailyJournal.jsx
│   ├── Roadmaps.jsx
│   ├── ConceptsLibrary.jsx
│   ├── Projects.jsx
│   ├── Resources.jsx
│   ├── InterviewPreparation.jsx
│   ├── AIChat.jsx
│   ├── Portfolio.jsx
│   └── Experiments.jsx
├── layouts/             # Layout wrappers
│   └── MainLayout.jsx
├── contexts/            # Context API providers
│   └── LearningContext.jsx
├── data/               # Data and constants
│   └── constants.js
├── styles/             # Global styles
│   └── globals.css
├── App.jsx             # Main app component
└── main.jsx            # React entry point
```

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Usage

### Dashboard
- View your learning metrics at a glance
- Track total hours, learning streaks, and progress
- See your current focus phase

### Daily Journal
- Log your daily learning sessions
- Record topics, time spent, what you learned
- Add resources, code, questions, and next steps
- Review all previous entries

### Roadmaps
- Follow the 12-phase learning path
- Track progress for each phase
- See topics covered in each phase

### Concepts Library
- Store and organize learning concepts
- Use the structured documentation template
- Track concept completion status

### Projects
- Showcase your projects
- Track project status (completed, in-progress)
- Associate projects with learning phases

### Interview Preparation
- Access interview questions by category
- Read and learn from answers
- Expand to review detailed explanations

### AI Chat
- Ask questions about your learning materials
- Get assistance with concepts
- Search your personal learning notes

### Portfolio
- Display your achievements
- Showcase your best projects
- Share your learning journey

## Context API State

The `LearningContext` manages:
- Learning metrics (hours, streak, topics completed)
- Daily journal logs
- Concepts and projects
- Dark mode toggle

## Customization

### Adding New Concepts

Edit `src/data/constants.js` and add to `SAMPLE_CONCEPTS`:

```javascript
{
  id: 3,
  title: 'Your Concept',
  phase: 1,
  definition: 'Description',
  status: 'in-progress',
}
```

### Adding New Projects

Edit `src/data/constants.js` and add to `SAMPLE_PROJECTS`:

```javascript
{
  id: 3,
  title: 'Project Name',
  phase: 1,
  status: 'in-progress',
  description: 'Project description',
}
```

### Theming

Tailwind CSS theme can be customized in `tailwind.config.js`.

## Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Database persistence
- [ ] Real AI chat with LLM integration
- [ ] Export/import learning data
- [ ] Progress analytics and visualizations
- [ ] Community features
- [ ] Mobile app version

## License

MIT

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

---

Built with ❤️ for AI learners
