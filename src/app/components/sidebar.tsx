import Image from 'next/image';
import Link from 'next/link';
import { MenuIcon, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

const menuItems = [
  { id: 'about', label: 'About', emoji: '👤' },
  { id: 'experience', label: 'Experience', emoji: '💼' },
  { id: 'projects', label: 'Projects', emoji: '🛠️' },
  { id: 'certifications', label: 'Certifications', emoji: '📜' },
  { id: 'blog', label: 'Blog', emoji: '✍️' },
  { id: 'progress', label: 'Progress', emoji: '📈' },
];

interface SidebarProps {
  onSectionChange: (section: string) => void;
  activeSection: string;
}

export default function Sidebar({ onSectionChange, activeSection }: SidebarProps) {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="w-80 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-800 dark:text-white">Jaya Tripathi</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Software Developer</p>
            </div>
          </div>
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      <nav className="mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 ${
              activeSection === item.id ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            <span className="mr-3 text-xl">{item.emoji}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}