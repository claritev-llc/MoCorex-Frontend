import { Link } from "react-router-dom";
import { Github, Twitter, Send, Mail, FileText, Shield, HelpCircle, ExternalLink } from "lucide-react";
import LogoIcon from "@/components/LogoIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-xl mt-24">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <LogoIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Mo</span><span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">Core</span><span className="text-white font-extrabold text-2xl">X</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed max-w-md">
              MoCoreX is a decentralized perpetual exchange platform enabling secure, transparent, and efficient trading of cryptocurrencies with up to 100x leverage.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800/50 rounded-xl flex items-center justify-center hover:bg-slate-800 hover:scale-110 transition-all duration-300 text-slate-400 hover:text-white border border-slate-700/50 hover:border-blue-500/50"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800/50 rounded-xl flex items-center justify-center hover:bg-slate-800 hover:scale-110 transition-all duration-300 text-slate-400 hover:text-white border border-slate-700/50 hover:border-blue-500/50"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800/50 rounded-xl flex items-center justify-center hover:bg-slate-800 hover:scale-110 transition-all duration-300 text-slate-400 hover:text-white border border-slate-700/50 hover:border-blue-500/50"
                aria-label="Telegram"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href="mailto:support@mocorex.com"
                className="w-10 h-10 bg-slate-800/50 rounded-xl flex items-center justify-center hover:bg-slate-800 hover:scale-110 transition-all duration-300 text-slate-400 hover:text-white border border-slate-700/50 hover:border-blue-500/50"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/trading" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <ExternalLink className="w-3 h-3" />
                  Perpetual Trading
                </Link>
              </li>
              <li>
                <Link to="/markets" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <ExternalLink className="w-3 h-3" />
                  Markets
                </Link>
              </li>
              <li>
                <Link to="/wallet" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <ExternalLink className="w-3 h-3" />
                  Wallet
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <ExternalLink className="w-3 h-3" />
                  API Trading
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <FileText className="w-3 h-3" />
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <HelpCircle className="w-3 h-3" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2">
                  <ExternalLink className="w-3 h-3" />
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Risk Disclosure
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-500 text-sm">
              © {currentYear} MoCoreX. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Testnet Mode
              </span>
              <span>Version 1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
