import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Terminal, TestTube, Gauge } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  stats: {
    tests: number;
    coverage: string;
    gas: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, tech, github, live, stats }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black/50 rounded p-6 border border-green-500/20 transition-all duration-300 font-mono"
    >
      <div className="flex items-center gap-2 mb-4">
        <Terminal size={20} />
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      
      <p className="text-green-400/70 mb-6 font-sans leading-relaxed">{description}</p>
      
      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-3 text-green-400/70 bg-black/50 p-3 rounded">
          <TestTube size={16} />
          <span>Tests: {stats.tests}</span>
          <span className="mx-2">|</span>
          <span>Coverage: {stats.coverage}</span>
        </div>
        <div className="flex items-center gap-3 text-green-400/70 bg-black/50 p-3 rounded">
          <Gauge size={16} />
          <span>Gas: {stats.gas}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tech.map((item, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-black/50 rounded text-sm border border-green-500/20"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="flex space-x-4">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-green-400/70 hover:text-green-400 transition-colors bg-black/50 px-4 py-2 rounded"
        >
          <Github size={18} />
          <span className="text-sm">view source</span>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-green-400/70 hover:text-green-400 transition-colors bg-black/50 px-4 py-2 rounded"
        >
          <ExternalLink size={18} />
          <span className="text-sm">live demo</span>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;