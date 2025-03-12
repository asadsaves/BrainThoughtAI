import ChatInterface from './components/ChatInterface';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <ThemeToggle />
      <ChatInterface />
    </main>
  );
}
