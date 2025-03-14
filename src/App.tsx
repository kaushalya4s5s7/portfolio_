import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import kc from "./assets/kc.jpg";
import {
  Code2,
  Brain,
  Blocks,
  BookText,
  Github,
  ExternalLink,
  Wallet,
  Terminal,
  Coffee,
  Mail,
  Linkedin,
  Twitter,
} from "lucide-react";
import Navigation from "./components/Navigation";
import ProjectCard from "./components/ProjectCard";
import SkillCard from "./components/SkillCard";
import TerminalIntro from "./components/TerminalIntro";
import MatrixBackground from "./components/MatrixBackground";
import CommandTerminal from "./components/CommandTerminal";

declare global {
  interface Window {
    ethereum?: any;
  }
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showContent, setShowContent] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [networkError, setNetworkError] = useState("");
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Check if already connected
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          // Get the network
          const chainId = await window.ethereum.request({
            method: "eth_chainId",
          });

          // Check if we're on a supported network (Mainnet: 0x1, Sepolia: 0xaa36a7)
          if (chainId !== "0x1" && chainId !== "0xaa36a7") {
            setNetworkError(
              "Please connect to Ethereum Mainnet or Sepolia Testnet"
            );
            return;
          }

          setWalletAddress(accounts[0]);
          setWalletConnected(true);
          setNetworkError("");
          setShowContent(true);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
        setNetworkError("Error connecting to network");
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // Get the network
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        // Check if we're on a supported network
        if (chainId !== "0x1" && chainId !== "0xaa36a7") {
          setNetworkError(
            "Please connect to Ethereum Mainnet or Sepolia Testnet"
          );
          return;
        }

        setWalletAddress(accounts[0]);
        setWalletConnected(true);
        setNetworkError("");
        setShowContent(true);

        // Subscribe to network changes
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        // Subscribe to account changes
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Error connecting wallet:", error);
        setNetworkError("Error connecting to network");
      }
    } else {
      setNetworkError("Please install MetaMask!");
    }
  };

  const handleCommand = (command: string) => {
    switch (command) {
      case "cd about":
        setActiveSection("about");
        break;
      case "cd projects":
        setActiveSection("projects");
        break;
      case "cd blog":
        setActiveSection("blog");
        break;
      case "cd contact":
        setActiveSection("contact");
        break;
      case "cd ..":
        setActiveSection("home");
        break;
      case "clear":
        // The terminal component handles clearing internally
        break;
      case "help":
        // Help command is handled by the terminal component
        break;
      default:
        console.log("Unknown command:", command);
    }
  };

  const buyMeCoffee = () => {
    window.open("https://buymeacoffee.com/chaudharikd?new=1", "_blank");
  };

  if (!introComplete) {
    return <TerminalIntro onComplete={() => setIntroComplete(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-blue-500 font-mono relative">
      <MatrixBackground />

      {/* Initial Connection Screen */}
      {!walletConnected && (
        <div className="h-screen flex items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex flex-col items-center text-center">
              <img src={kc} alt="Custom" className="w-48 mb-4" />
              <h1 className="text-3xl mb-8">KC Welcome's You</h1>
            </div>

            {networkError && (
              <div className="text-red-500 mb-4 p-4 bg-black/50 rounded">
                {networkError}
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={connectWallet}
              className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 px-8 py-4 rounded-lg flex items-center gap-3 mx-auto transition-colors"
            >
              <Wallet size={24} />
              <span>Connect MetaMask</span>
            </motion.button>
            <p className="mt-4 text-sm text-green-400/70">
              Connect your wallet to access the terminal
            </p>
          </motion.div>
        </div>
      )}

      {/* Main Content (Only visible after wallet connection) */}
      {walletConnected && (
        <>
          <Navigation
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          <div className="container mx-auto px-4 pt-20">
            <CommandTerminal
              onCommand={handleCommand}
              walletAddress={walletAddress}
              activeSection={activeSection}
            />
          </div>

          {/* Sections */}
          <div
            className={`mt-8 ${activeSection === "about" ? "block" : "hidden"}`}
          >
            {/* About Section Content */}
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="bg-black/50 p-8 rounded-lg border border-green-500/20">
                  <TypeAnimation
                    sequence={[
                      `Hi, I'm Kaushal 👋\n\nI'm a passionate Web3 developer with expertise in DeFi and Smart Contract Security. With over 3 years of experience in blockchain development, I've contributed to various DeFi protocols and NFT projects.\n\nMy focus areas include:\n- Smart Contract Development\n- DeFi Protocol Design\n- Security Auditing\n- Frontend dApp Development`,
                      1000,
                    ]}
                    wrapper="pre"
                    speed={50}
                    className="text-lg leading-relaxed"
                    style={{ display: "block" }}
                    repeat={1}
                  />
                </div>
              </div>
            </section>
          </div>

          <div
            className={`mt-8 ${
              activeSection === "projects" ? "block" : "hidden"
            }`}
          >
            {/* Projects Section */}
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "DeFi Yield Optimizer",
                      description:
                        "Smart contract system for automated yield farming across multiple protocols",
                      tech: ["Solidity", "Hardhat", "The Graph"],
                      github: "https://github.com/username/defi-yield",
                      live: "https://defi-yield.eth",
                      stats: {
                        tests: 142,
                        coverage: "98%",
                        gas: "~120k",
                      },
                    },
                    {
                      title: "NFT Marketplace",
                      description:
                        "Decentralized marketplace for NFT trading with low gas fees",
                      tech: ["Next.js", "IPFS", "Ethers.js"],
                      github: "https://github.com/username/nft-market",
                      live: "https://nft-market.eth",
                      stats: {
                        tests: 98,
                        coverage: "95%",
                        gas: "~180k",
                      },
                    },
                  ].map((project, index) => (
                    <ProjectCard key={index} {...project} />
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div
            className={`mt-8 ${activeSection === "blog" ? "block" : "hidden"}`}
          >
            {/* Blog Section */}
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      title:
                        "Understanding EIP-4626: The Tokenized Vault Standard",
                      date: "2024-03-01",
                      excerpt:
                        "Deep dive into EIP-4626 and its implications for DeFi composability",
                      readTime: "8 min read",
                      link: "#",
                    },
                    {
                      title: "Gas Optimization Techniques for Smart Contracts",
                      date: "2024-02-15",
                      excerpt:
                        "Learn advanced techniques to optimize your smart contracts for gas efficiency",
                      readTime: "12 min read",
                      link: "#",
                    },
                  ].map((post, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="bg-black/50 p-6 rounded-lg border border-green-500/20"
                    >
                      <h3 className="text-xl mb-2">{post.title}</h3>
                      <p className="text-green-400/70 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-green-400/50">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div
            className={`mt-8 ${
              activeSection === "contact" ? "block" : "hidden"
            }`}
          >
            {/* Contact Section */}
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Github,
                      label: "GitHub",
                      link: "https://x.com/Kaushaly4s5s7",
                    },
                    {
                      icon: Linkedin,
                      label: "LinkedIn",
                      link: "https://www.linkedin.com/in/kaushal-chaudhari-21b83a1b0/",
                    },
                    {
                      icon: Twitter,
                      label: "Twitter",
                      link: "https://github.com/kaushalya4s5s7",
                    },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3 bg-black/50 p-6 rounded-lg border border-green-500/20 hover:bg-black/70 transition-colors"
                    >
                      <social.icon size={24} />
                      <span>{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="py-8 px-4 border-t border-green-500/20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Terminal size={18} />
                <span className="text-sm">
                  Connected as: {walletAddress.slice(0, 6)}...
                  {walletAddress.slice(-4)}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={buyMeCoffee}
                className="bg-black/50 hover:bg-black/70 border border-green-500/20 px-4 py-2 rounded flex items-center gap-2 text-sm"
              >
                <Coffee size={16} />
                <span>Buy me a coffee</span>
              </motion.button>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
