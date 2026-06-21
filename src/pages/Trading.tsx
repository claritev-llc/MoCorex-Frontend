import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { tradingAPI, marketsAPI } from "@/services/api";
import { 
  TrendingUp, 
  TrendingDown, 
  Menu, 
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  BookOpen,
  Trophy,
  Zap
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/contexts/WalletContext";

const Trading = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pair, setPair] = useState(searchParams.get("pair") || "ETH/USDT");
  const [orderBook, setOrderBook] = useState<any>(null);
  const [recentTrades, setRecentTrades] = useState<any[]>([]);
  const [marketData, setMarketData] = useState<any>(null);
  const [orderType, setOrderType] = useState<"market" | "limit" | "trigger">("market");
  const [tradeType, setTradeType] = useState<"long" | "short" | "swap">("long");
  const [loading, setLoading] = useState(false);
  const [chartLoading, setChartLoading] = useState(true);
  const { isAuthenticated, user, loginDemo } = useAuth();
  const { isConnected } = useWallet();

  // Form state
  const [payAmount, setPayAmount] = useState("");
  const [sizeAmount, setSizeAmount] = useState("");
  const [payCurrency, setPayCurrency] = useState("ETH");
  const [sizeCurrency, setSizeCurrency] = useState("ETH");
  const [leverage, setLeverage] = useState([2]);
  const [showChartPositions, setShowChartPositions] = useState(false);

  useEffect(() => {
    loadTradingData();
    const interval = setInterval(loadTradingData, 5000);
    return () => clearInterval(interval);
  }, [pair]);

  // Simulate chart loading
  useEffect(() => {
    const timer = setTimeout(() => setChartLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [pair]);

  const loadTradingData = async () => {
    try {
      const [orderBookRes, tradesRes, marketRes] = await Promise.all([
        tradingAPI.getOrderBook(pair),
        tradingAPI.getRecentTrades(pair),
        marketsAPI.getMarket(pair),
      ]);
      setOrderBook(orderBookRes.data);
      setRecentTrades(tradesRes.data);
      setMarketData(marketRes.data);
    } catch (error: any) {
      console.error("Error loading trading data:", error);
    }
  };

  const handleTrade = async () => {
    if (!payAmount || !sizeAmount) {
      toast.error("Please fill in all fields");
      return;
    }

    // Use demo mode if not authenticated
    if (!isAuthenticated) {
      loginDemo();
      toast.success("Using demo mode for trading");
    }

    setLoading(true);
    try {
      await tradingAPI.placeOrder({
        pair,
        type: tradeType === "long" ? "buy" : "sell",
        orderType: orderType === "market" ? "market" : "limit",
        amount: parseFloat(sizeAmount),
        price: orderType === "limit" ? parseFloat(marketData?.price || "0") : undefined,
      });
      toast.success(`${tradeType === "long" ? "Long" : "Short"} order placed successfully!`);
      setPayAmount("");
      setSizeAmount("");
      loadTradingData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const currentPrice = marketData?.price || 3615.85;
  const priceChange = marketData?.priceChange24h || 0;
  const priceChangePercent = marketData?.priceChangePercent24h || 0;
  const leverageValue = leverage[0];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-[50px] py-6 bg-slate-900/40 border-b border-slate-800/30 backdrop-blur-xl sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Menu className="w-5 h-5 text-slate-400" />
            <Select value={pair} onValueChange={(value) => {
              setPair(value);
              setSearchParams({ pair: value });
              setChartLoading(true);
            }}>
              <SelectTrigger className="w-[150px] bg-slate-800/50 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="BTC/USDT">BTC/USDT</SelectItem>
                <SelectItem value="ETH/USDT">ETH/USDT</SelectItem>
                <SelectItem value="BNB/USDT">BNB/USDT</SelectItem>
                <SelectItem value="SOL/USDT">SOL/USDT</SelectItem>
                <SelectItem value="ADA/USDT">ADA/USDT</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <div className="text-2xl font-bold text-white">{currentPrice.toLocaleString()}</div>
              <div className="text-sm text-slate-400">${(currentPrice * 0.9).toLocaleString()}</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-slate-400">24h Change</div>
                <Badge
                  className={
                    priceChange >= 0
                      ? "bg-green-500/10 text-green-400/80 border-green-500/20"
                      : "bg-red-500/10 text-red-400/80 border-red-500/20"
                  }
                >
                  {priceChange >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {priceChangePercent.toFixed(2)}%
                </Badge>
              </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">24h High</div>
              <div className="text-sm text-white">{marketData?.high24h?.toLocaleString() || "-"}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">24h Low</div>
              <div className="text-sm text-white">{marketData?.low24h?.toLocaleString() || "-"}</div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6 pl-[50px] pr-[50px]">
          {/* Left Side - Chart and Tabs */}
          <div className="flex-1 flex flex-col">
            {/* Chart Area */}
            <div className="bg-slate-900/30 border border-slate-800/30 rounded-lg flex items-center justify-center min-h-[500px] mb-6">
              {chartLoading ? (
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                        <div
                      key={i}
                      className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                      ))}
                    </div>
              ) : (
                <div className="text-center text-slate-400">
                  <div className="text-lg mb-2">Chart will be displayed here</div>
                  <div className="text-sm">Chart integration coming soon</div>
                </div>
              )}
                  </div>

            {/* Tabs Section */}
            <div className="bg-slate-900/40 border border-slate-800/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <Tabs defaultValue="positions" className="w-full">
                  <TabsList className="bg-slate-800/50">
                    <TabsTrigger value="positions" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-white">
                      Positions (0)
                    </TabsTrigger>
                    <TabsTrigger value="orders" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-white">
                      Open Orders (0)
                    </TabsTrigger>
                    <TabsTrigger value="history" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-white">
                      Trade History
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex items-center gap-2 ml-4">
                  <Switch
                    checked={showChartPositions}
                    onCheckedChange={setShowChartPositions}
                  />
                  <Label className="text-sm text-slate-400">Chart positions</Label>
                </div>
                  </div>

              {/* Positions Display */}
              {!isAuthenticated ? (
                <Card className="bg-slate-800/50 border-slate-700/50">
                  <CardContent className="pt-6 pb-6 text-center">
                    <Wallet className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Demo Mode Available</h3>
                    <p className="text-slate-400 mb-4">Connect wallet or use demo mode to view your positions</p>
                    <Button
                      onClick={loginDemo}
                      className="bg-blue-500/15 hover:bg-blue-500/20 text-blue-400/80 border border-blue-500/25"
                    >
                      Use Demo Mode
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center text-slate-400 py-8">
                  {user?.isDemo && (
                    <div className="mb-2 text-blue-400 text-sm">Demo Mode Active</div>
                  )}
                  No positions or orders to display
                        </div>
              )}
                    </div>
                  </div>

          {/* Right Sidebar - Trading Panel */}
          <div className="w-full lg:w-96">
            <div className="bg-slate-900/40 border border-slate-800/30 rounded-lg p-4 space-y-6">
              {/* Trade Type Selection */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => setTradeType("long")}
                  className={`${
                    tradeType === "long"
                      ? "bg-green-500/10 text-green-400/70 border border-green-500/20 hover:bg-green-500/15"
                      : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700/50"
                  }`}
                >
                  Long
                </Button>
                <Button
                  onClick={() => setTradeType("short")}
                  className={`${
                    tradeType === "short"
                      ? "bg-red-500/10 text-red-400/70 border border-red-500/20 hover:bg-red-500/15"
                      : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700/50"
                  }`}
                >
                  Short
                </Button>
                <Button
                  onClick={() => setTradeType("swap")}
                  className={`${
                    tradeType === "swap"
                      ? "bg-blue-500/10 text-blue-400/70 border border-blue-500/20 hover:bg-blue-500/15"
                      : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700/50"
                  }`}
                >
                  Swap
                </Button>
                </div>

              {/* Order Type Selection */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  onClick={() => setOrderType("market")}
                  variant={orderType === "market" ? "default" : "outline"}
                  className={orderType === "market" ? "bg-slate-700/30 text-slate-300 border border-slate-600/50 hover:bg-slate-700/40" : "border-slate-700/50 text-slate-400 hover:bg-slate-800/30"}
                >
                  Market
                </Button>
                <Button
                  onClick={() => setOrderType("limit")}
                  variant={orderType === "limit" ? "default" : "outline"}
                  className={orderType === "limit" ? "bg-slate-700/30 text-slate-300 border border-slate-600/50 hover:bg-slate-700/40" : "border-slate-700/50 text-slate-400 hover:bg-slate-800/30"}
                      >
                  Limit
                </Button>
                <Button
                  onClick={() => setOrderType("trigger")}
                  variant={orderType === "trigger" ? "default" : "outline"}
                  className={orderType === "trigger" ? "bg-slate-700/30 text-slate-300 border border-slate-600/50 hover:bg-slate-700/40" : "border-slate-700/50 text-slate-400 hover:bg-slate-800/30"}
                >
                  Trigger
                </Button>
          </div>

              {/* Pay Input */}
              <div className="space-y-2">
                <Label className="text-slate-300">Pay</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white flex-1"
                  />
                  <Select value={payCurrency} onValueChange={setPayCurrency}>
                    <SelectTrigger className="w-24 bg-slate-800/50 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-xs text-slate-400">Balance: 0.0</div>
              </div>

              {/* Size Input */}
                      <div className="space-y-2">
                <Label className="text-slate-300">Size</Label>
                <div className="flex gap-2">
                        <Input
                          type="number"
                    placeholder="0.0"
                    value={sizeAmount}
                    onChange={(e) => setSizeAmount(e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white flex-1"
                        />
                  <Select value={sizeCurrency} onValueChange={setSizeCurrency}>
                    <SelectTrigger className="w-24 bg-slate-800/50 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Leverage Control */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Leverage: {leverageValue.toFixed(2)}x</Label>
                  <Switch />
                      </div>
                <Slider
                  value={leverage}
                  onValueChange={setLeverage}
                  min={1}
                  max={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1x</span>
                  <span>10x</span>
                  <span>20x</span>
                  <span>30x</span>
                  <span>40x</span>
                  <span>50x</span>
                      </div>
                    </div>

              {/* Trade Details */}
              <Card className="bg-slate-800/30 border-slate-700/30">
                <CardContent className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Collateral In</span>
                    <span className="text-white">USD</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Leverage</span>
                    <span className="text-white">-</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Entry Price</span>
                    <span className="text-white">${currentPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Liq. Price</span>
                    <span className="text-white">-</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Fees</span>
                    <span className="text-white">-</span>
                  </div>
                </CardContent>
              </Card>

              {/* Connect Wallet or Trade Button */}
              {!isAuthenticated ? (
                <div className="space-y-2">
                  <Button
                    className="w-full bg-slate-700/80 hover:bg-slate-700 text-white font-semibold py-6 border border-slate-600/50"
                    onClick={() => window.location.href = "/login"}
                  >
                    <Wallet className="mr-2 h-5 w-5" />
                    Connect Wallet
                  </Button>
                  <Button
                    onClick={loginDemo}
                    className="w-full bg-slate-700/30 hover:bg-slate-700/40 text-slate-300 font-semibold py-6 border border-slate-600/50"
                  >
                    Use Demo Mode
                  </Button>
                </div>
              ) : (
                    <Button
                  onClick={handleTrade}
                      disabled={loading}
                  className={`w-full font-semibold py-6 ${
                    tradeType === "long"
                      ? "bg-green-500/10 hover:bg-green-500/15 text-green-400/70 border border-green-500/20"
                      : tradeType === "short"
                      ? "bg-red-500/10 hover:bg-red-500/15 text-red-400/70 border border-red-500/20"
                      : "bg-blue-500/10 hover:bg-blue-500/15 text-blue-400/70 border border-blue-500/20"
                  }`}
                    >
                  {loading ? "Processing..." : `${tradeType === "long" ? "Long" : tradeType === "short" ? "Short" : "Swap"} ${pair.split("/")[0]}`}
                    </Button>
              )}

              {/* Long ETH Information */}
              <Card className="bg-slate-800/30 border-slate-700/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-white">
                    {tradeType === "long" ? "Long" : tradeType === "short" ? "Short" : "Swap"} {pair.split("/")[0]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Entry Price</span>
                    <span className="text-white">${currentPrice.toLocaleString()}</span>
                      </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Exit Price</span>
                    <span className="text-white">${(currentPrice * 0.9).toLocaleString()}</span>
                    </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Borrow Fee</span>
                    <span className="text-white">0.0000% / 1h</span>
                      </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Available Liquidity</span>
                    <span className="text-white">$65,134,268.56</span>
                    </div>
                </CardContent>
              </Card>

              {/* Useful Links */}
              <Card className="bg-slate-800/30 border-slate-700/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-white">Useful Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-700/50"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Trading guide
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-700/50"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Leaderboard
                  </Button>
                    <Button
                    variant="ghost"
                    className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-700/50"
                    >
                    <Zap className="w-4 h-4 mr-2" />
                    Speed up page loading
                    </Button>
              </CardContent>
            </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Trading;
