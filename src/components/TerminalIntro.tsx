import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TerminalIntroProps {
  onComplete: () => void;
}

const TerminalIntro: React.FC<TerminalIntroProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const hasRun = useRef(false);

  const bootSequence = [
    "Connecting you with the K4USH4l SYSTEM",
    "Loading kernel modules...",
    "Mounting blockchain interfaces...",
    "Starting Web3 services...",
    "Connecting to Ethereum network...",
    "Loading developer profile...",
    "System ready.",
  ];

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (index === bootSequence.length - 1) {
          // After the last line, wait a bit and then trigger completion
          setTimeout(() => {
            onComplete();
          }, 1000);
        }
      }, index * 400);
    });
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-cyber-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl bg-black/50 rounded-lg border border-cyber-blue/20 p-4 font-mono"
      >
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm md:text-base"
          >
            <span className="text-cyber-blue">{">"}</span>
            <span className="text-cyber-purple ml-2">~</span>
            <span className="text-white/70 ml-2">{line}</span>
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="mt-2 w-3 h-5 bg-cyber-blue inline-block"
        />
      </motion.div>
    </div>
  );
};

export default TerminalIntro;
