import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Brain, Blocks, BookText } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'home', icon: Terminal, label: '~/home' },
    { id: 'about', icon: Brain, label: '~/about' },
    { id: 'projects', icon: Blocks, label: '~/projects' },
    { id: 'blog', icon: BookText, label: '~/blog' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-green-500/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Terminal size={20} />
            <span>k4ush4l@web3:~$</span>
          </motion.div>
          
          <div className="flex space-x-4 md:space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-2 font-mono px-3 py-1 rounded transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'bg-green-500/10 border border-green-500/30' 
                    : 'text-green-400/70 hover:bg-black/50'
                }`}
              >
                <item.icon size={18} />
                <span className="text-sm hidden md:inline">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;