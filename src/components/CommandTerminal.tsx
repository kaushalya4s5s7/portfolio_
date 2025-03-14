import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';

interface CommandTerminalProps {
  onCommand: (command: string) => void;
  walletAddress: string;
  activeSection?: string;
}

const CommandTerminal: React.FC<CommandTerminalProps> = ({ onCommand, walletAddress, activeSection = 'home' }) => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      setCommandHistory([...commandHistory, currentCommand]);
      onCommand(currentCommand.trim().toLowerCase());
      setCurrentCommand('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const getPrompt = () => {
    if (activeSection === 'home') {
      return '~';
    }
    return `~/portfolio/${activeSection}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/80 border border-green-500/20 rounded-lg p-4 w-full max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-2 mb-4 text-green-400">
        <TerminalIcon size={18} />
        <span>Connected as: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
      </div>
      <div
        ref={terminalRef}
        className="h-[400px] overflow-y-auto mb-4 font-mono text-sm"
      >
        <div className="text-green-400 mb-4">
          Welcome to the Web3 Portfolio Terminal! Available commands:
          <br />
          - cd about: Navigate to About section
          <br />
          - cd projects: Navigate to Projects section
          <br />
          - cd blog: Navigate to Blog section
          <br />
          - cd contact: Navigate to Contact section
          <br />
          - cd ..: Return to home
          <br />
          - clear: Clear terminal history
          <br />
          - help: Show this help message
        </div>
        {commandHistory.map((cmd, index) => (
          <div key={index} className="mb-2">
            <span className="text-green-400">{getPrompt()}$</span>
            <span className="text-white ml-2">{cmd}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-green-400">{getPrompt()}$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono"
          autoFocus
        />
      </div>
    </motion.div>
  );
};

export default CommandTerminal;
