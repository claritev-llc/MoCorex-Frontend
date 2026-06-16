import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface Token {
  name: string;
  symbol: string;
  price: string;
  description: string;
  logo: string;
}

const tokens: Token[] = [
  {
    name: "MoCoreX",
    symbol: "MCX",
    price: "$14.40",
    description: "MCX is the native coin of the MoCoreX Chain, used for transaction fees, staking, and governance. It powers the entire ecosystem and provides utility for all network operations.",
    logo: "M",
  },
  {
    name: "MoCoreX Token",
    symbol: "MTX",
    price: "$14.40",
    description: "MTX is the utility and governance token of MoCoreX Exchange. Holders gain access to exclusive features, reduced trading fees, and voting rights on platform decisions.",
    logo: "M",
  },
  {
    name: "MoCoreX LP",
    symbol: "MLP",
    price: "$14.40",
    description: "MLP is a composite token representing a diversified pool of assets. It's used for swaps and leverage trading, providing liquidity and stability to the platform.",
    logo: "M",
  },
];

const EcosystemTokens = () => {
  return (
    <section className="py-24 relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" id="tokens">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Ecosystem <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Tokens</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {tokens.map((token, index) => (
            <Card
              key={index}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 p-8 hover:scale-105 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">{token.logo}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{token.name}</h3>
                  <div className="text-lg font-semibold text-slate-400">{token.symbol}</div>
                </div>
              </div>

              <div className="text-3xl font-bold text-white mb-6">{token.price}</div>

              <p className="text-sm text-slate-400 leading-relaxed mb-6 min-h-[80px]">
                {token.description}
              </p>

              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold"
                  onClick={() => window.location.href = "/trading"}
                >
                  Buy
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-slate-700 text-white hover:bg-slate-800/50 rounded-xl font-semibold"
                  onClick={() => toast.info(`Learn more about ${token.symbol}`)}
                >
                  Read More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemTokens;
