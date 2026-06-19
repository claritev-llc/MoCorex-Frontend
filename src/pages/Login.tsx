import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Zap, CheckCircle2 } from "lucide-react";
import LogoIcon from "@/components/LogoIcon";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginDemo } = useAuth();

  // Redirect if already authenticated (either wallet or demo)
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLoginDemo = () => {
    loginDemo();
    navigate("/dashboard", { replace: true });
  };

  const features = [
    {
      icon: Shield,
      title: "Secure & Non-Custodial",
      description: "Your keys, your crypto. We never have access to your funds.",
    },
    {
      icon: Zap,
      title: "Instant Access",
      description: "Connect your wallet and start trading immediately on testnet.",
    },
    {
      icon: CheckCircle2,
      title: "Testnet Ready",
      description: "Test all features safely on Sepolia testnet before going live.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <LogoIcon className="w-10 h-10 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">
              MoCore<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">X</span>
            </span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to MoCoreX
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Explore our decentralized perpetual exchange platform with demo mode. No wallet connection required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-900/60 border-slate-800/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Get Started</CardTitle>
              <CardDescription className="text-slate-400">
                Start exploring MoCoreX with demo mode
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button
                  onClick={handleLoginDemo}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-6 rounded-xl text-lg shadow-lg shadow-indigo-500/30"
                >
                  Continue as Demo User
                </Button>
                <p className="text-xs text-slate-500 text-center">
                  Demo mode allows you to explore all features without wallet connection
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800/50 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Why Connect?</CardTitle>
              <CardDescription className="text-slate-400">
                Benefits of wallet connection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-500">
            By connecting, you agree to our{" "}
            <Link to="/terms" className="text-blue-400 hover:text-blue-300">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
              Privacy Policy
            </Link>
          </p>
          <p className="text-xs text-slate-600 mt-2">
            Demo mode - All features available for exploration
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

