import React from 'react';
import { motion } from 'framer-motion';
import { Clock, FolderGit2, DivideIcon as LucideIcon } from 'lucide-react';

interface SkillCardProps {
  category: string;
  items: string[];
  experience: string;
  projects: number;
  icon: LucideIcon;
}

const SkillCard: React.FC<SkillCardProps> = ({ category, items, experience, projects, icon: Icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-black/50 rounded p-6 border border-green-500/20 font-mono"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-black/50 rounded">
          <Icon size={24} />
        </div>
        <h3 className="text-lg font-bold">{category}</h3>
      </div>
      
      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-2 text-green-400/70 bg-black/50 p-3 rounded">
          <Clock size={16} />
          <span>{experience}</span>
        </div>
        <div className="flex items-center gap-2 text-green-400/70 bg-black/50 p-3 rounded">
          <FolderGit2 size={16} />
          <span>{projects} projects</span>
        </div>
      </div>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="text-green-400/70 flex items-center space-x-2 before:content-['$'] before:text-green-500 text-sm bg-black/50 p-3 rounded hover:bg-black/70 transition-colors duration-200"
          >
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SkillCard;