import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ChainSection from "@/components/ChainSection";
import EcosystemTokens from "@/components/EcosystemTokens";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <Hero />
      <Features />
      <ChainSection />
      <EcosystemTokens />
      <Footer />
    </div>
  );
};

export default Index;
