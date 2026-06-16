import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Wallet, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/contexts/WalletContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoIcon from "@/components/LogoIcon";

const Navigation = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const { isConnected, formattedAddress } = useWallet();

  const handleConnectWallet = () => {
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
              <LogoIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              MoCore<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">X</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-slate-300 hover:text-white transition-colors font-medium text-sm"
            >
              Features
            </a>
            <a 
              href="#tokens" 
              className="text-slate-300 hover:text-white transition-colors font-medium text-sm"
            >
              Tokens
            </a>
            <Link 
              to="/markets" 
              className="text-slate-300 hover:text-white transition-colors font-medium text-sm"
            >
              Markets
            </Link>
            <Link 
              to="/trading" 
              className="text-slate-300 hover:text-white transition-colors font-medium text-sm"
            >
              Trade
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            {isAuthenticated && isConnected ? (
              <>
                <Link to="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 hidden sm:flex">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-slate-700 text-white hover:bg-slate-800/50 rounded-xl font-medium"
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      {formattedAddress}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800">
                    <DropdownMenuItem 
                      onClick={logout}
                      className="text-red-400 hover:text-red-300 hover:bg-slate-800 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Disconnect
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button 
                onClick={handleConnectWallet}
                className="bg-slate-700/80 hover:bg-slate-700 text-white rounded-xl font-semibold border border-slate-600/50"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
