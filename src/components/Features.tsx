import { Card } from "@/components/ui/card";
import { DollarSign, ArrowUpDown, Coins, Eye, CheckCircle2, ArrowUp, ArrowDown } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "LOW COST",
    description: "Experience minimal trading fees and reduced price impact. Our optimized smart contracts ensure you keep more of your profits with industry-leading fee structures.",
    iconElements: [ArrowUp, ArrowDown],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Coins,
    title: "MULTI COLLATERAL",
    description: "Flexibility at its finest. Deposit various cryptocurrencies as collateral including BTC, ETH, BNB, SOL and more. Trade with the assets you already hold.",
    iconElements: [ArrowUp, ArrowDown],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Eye,
    title: "TRANSPARENCY",
    description: "All smart contracts are transparent, open-source, and verifiable on-chain. Every transaction is publicly auditable, ensuring complete trust and security.",
    iconElements: [CheckCircle2],
    color: "from-blue-500 to-cyan-500"
  }
];

const Features = () => {
  return (
    <section className="py-24 relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" id="features">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 p-8 hover:scale-105 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg relative`}>
                  <feature.icon className="h-10 w-10 text-white z-10" />
                  {feature.iconElements && feature.iconElements.length > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {feature.iconElements.map((Icon, i) => (
                        <Icon 
                          key={i} 
                          className={`h-4 w-4 text-white/80 absolute ${
                            i === 0 ? 'top-2' : 'bottom-2'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
