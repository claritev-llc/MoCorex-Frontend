import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/contexts/WalletContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoIcon from "@/components/LogoIcon";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user, loginDemo } = useAuth();
  const { isConnected, formattedAddress, disconnect } = useWallet();

  const handleConnectWallet = () => {
    // Navigate to login page for wallet connection or demo mode
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    if (isConnected && disconnect) {
      disconnect();
    }
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Trading", href: "/trading" },
    { name: "Markets", href: "/markets" },
    { name: "Wallet", href: "/wallet" },
    { name: "Settings", href: "/settings" },
    { name: "Doc", href: "https://trust.supply/files/TrustSupply_Masternodes_Lightpaper.pdf", external: true },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
              <LogoIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-white">Mo</span><span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">Core</span><span className="text-white font-extrabold text-2xl">X</span>
            </span>
          </Link>

          {/* Navigation Links - centered */}
          <nav className="flex-1 flex justify-center items-center space-x-1">
            {navigation.map((item) => {
              const isActive = !item.external && location.pathname === item.href;
              if (item.external) {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-slate-400 hover:text-white"
                  >
                    {item.name}
                  </a>
                );
              }
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 hover:text-white"
                    }
                  `}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-slate-700 text-white hover:bg-slate-800/50 rounded-xl font-medium"
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">
                        {isConnected ? formattedAddress : user?.name || "Demo User"}
                      </span>
                      <span className="sm:hidden">User</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800">
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-400 hover:text-red-300 hover:bg-slate-800 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {user?.isDemo ? "Exit Demo" : "Disconnect"}
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
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
