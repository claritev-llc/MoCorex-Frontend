import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Users, ArrowUpRight } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { useAuth } from "@/contexts/AuthContext";

const Hero = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const { isAuthenticated, loginDemo } = useAuth();

  const handleStartTrading = () => {
    if (isAuthenticated) {
      // User is authenticated (either wallet or demo), go to trading
      navigate("/trading");
    } else {
      // Not authenticated, enable demo mode and go to trading
      loginDemo();
      navigate("/trading");
    }
  };

  const stats = [
    {
      label: "Total trading volume",
      value: "$2,323,323,000",
      icon: DollarSign,
      iconColor: "bg-orange-500",
      trend: "up" as const,
    },
    {
      label: "Total Fees",
      value: "$5,000,000",
      icon: DollarSign,
      iconColor: "bg-pink-500",
    },
    {
      label: "Open Interest",
      value: "$4,323,323,000",
      icon: DollarSign,
      iconColor: "bg-red-500",
      trend: "up" as const,
    },
    {
      label: "Total user",
      value: "1,000,000",
      icon: Users,
      iconColor: "bg-blue-500",
      },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        {/* Stars effect */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 3;
            return (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
            <span className="text-white">Mo</span><span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">CoreX</span><span className="text-white"> is </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Decentralized</span>
            <span className="text-white"> Perpetual </span>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Exchange</span>
          </h1>
          
          <p className="text-sm md:text-base text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Trade BTC, ETH, BNB, SOL and other top cryptocurrencies with up to 100x leverage directly from your wallet.
          </p>
          
          <div className="flex justify-center mb-20">
            <Button 
              size="lg" 
              onClick={handleStartTrading}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-lg px-10 py-7 rounded-xl font-semibold text-base md:text-lg shadow-lg shadow-indigo-500/30"
            >
              START TRADING
              </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-4 md:p-6 hover:scale-105 hover:border-blue-500/50 transition-all duration-300 min-h-[140px]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.iconColor} rounded-full flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  {stat.trend === "up" && (
                    <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5 text-green-400 flex-shrink-0" />
                  )}
              </div>
                <div className="text-left overflow-hidden">
                  <div className="text-base md:text-lg lg:text-xl font-bold text-white mb-1 break-all leading-tight">
                    {stat.value}
            </div>
                  <div className="text-xs text-slate-400 font-medium leading-tight mt-1">
                    {stat.label}
              </div>
            </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
