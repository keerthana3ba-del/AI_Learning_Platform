import { useState } from 'react';
import { Send, Plus, MessageCircle, Sparkles } from 'lucide-react';

export const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '👋 Hello! I\'m your AI Learning Assistant. Ask me anything about your learning materials, concepts, projects, or interviews. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: '💡 This is a demo response. In a real implementation, this would be powered by your AI assistant trained on your personal learning notes and knowledge base.',
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  const suggestedPrompts = [
    'Explain Linear Regression',
    'What is backpropagation?',
    'Tips for interviews',
    'Best practices for ML',
  ];

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark flex flex-col">
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display">AI Chat Assistant</h1>
              <p className="text-gray-600 dark:text-gray-400">Ask anything about your learning</p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6 overflow-y-auto flex flex-col space-y-4 max-h-[500px] md:max-h-[600px]">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <Sparkles size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Start a conversation...</p>
              </div>
            </div>
          ) : (
            messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideIn`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-50 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-50 px-4 py-3 rounded-lg rounded-bl-none">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          {messages.length <= 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(prompt);
                  }}
                  className="card-hover text-left text-sm hover:bg-primary-50 dark:hover:bg-gray-800"
                >
                  <p className="text-gray-700 dark:text-gray-300">{prompt}</p>
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="input flex-1 placeholder-gray-400 dark:placeholder-gray-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="btn-primary flex-shrink-0"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
