import React from "react";
import { motion } from "framer-motion";

const CLITerminal = ({
  commandHistory,
  currentInput,
  setCurrentInput,
  handleCommandInput,
  setIsCLI,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 z-50 flex flex-col"
    >
      <div className="flex-1 overflow-auto p-4 space-y-2">
        {commandHistory.map((line, index) => (
          <pre key={index} className="text-green-500 font-mono">
            {line}
          </pre>
        ))}
      </div>

      <div className="p-4 border-t border-green-500/20 flex gap-2">
        <span className="text-green-500 font-bold">$</span>
        <input
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCommandInput(currentInput);
            }
          }}
          className="flex-1 bg-transparent text-green-500 font-mono outline-none"
          autoFocus
        />
      </div>
    </motion.div>
  );
};

export default CLITerminal;
