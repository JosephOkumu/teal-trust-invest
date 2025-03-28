
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import AboutUs from "@/components/sections/AboutUs";
import GetStarted from "@/components/sections/GetStarted";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AboutUs />
        <GetStarted />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
