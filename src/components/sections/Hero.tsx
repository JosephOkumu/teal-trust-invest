
import { ArrowRight, LineChart, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="pt-32 pb-16 md:py-36 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent -z-10" />
      
      {/* Animated shapes */}
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl animate-pulse-subtle -z-10" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 rounded-full bg-teal-400/10 blur-3xl animate-pulse-subtle -z-10" />
      
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 md:pr-8">
            <div className="inline-block animate-slide-in-top">
              <span className="px-4 py-2 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium border border-teal-500/20">
                Kenyan Stock Market Simplified
              </span>
            </div>
            
            <h1 className="animate-slide-in-top [animation-delay:100ms]">
              <span className="text-gradient">Invest Smarter</span> in Kenyan Stocks with AI & Blockchain
            </h1>
            
            <p className="text-lg text-muted-foreground animate-slide-in-top [animation-delay:200ms]">
              KenyaStocks eliminates the need for a CDS account, bringing AI-powered analysis and secure 
              Hedera blockchain technology to Kenya's stock market for simple, secure investing.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-slide-in-top [animation-delay:300ms]">
              <Link to="/register">
                <Button className="btn-primary rounded-full px-8 py-6 text-lg">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" className="rounded-full px-8 py-6 text-lg">
                  Learn How It Works
                </Button>
              </a>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4 animate-slide-in-top [animation-delay:400ms]">
              <div className="flex flex-col items-center text-center p-3">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mb-2">
                  <LineChart className="h-6 w-6 text-teal-500" />
                </div>
                <span className="text-sm font-medium">AI Analysis</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mb-2">
                  <Shield className="h-6 w-6 text-teal-500" />
                </div>
                <span className="text-sm font-medium">Secure Blockchain</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-teal-500" />
                </div>
                <span className="text-sm font-medium">Easy Trading</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-float">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1642790305523-5843a4806772?q=80&w=1000" 
                alt="Trading Dashboard" 
                className="w-full h-auto rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-teal-500/30 rounded-3xl blur-xl -z-1" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 md:w-28 md:h-28 bg-teal-400/20 rounded-full blur-xl -z-1" />
            
            {/* Stats card */}
            <div className="absolute -bottom-6 md:-bottom-10 -right-6 md:-right-10 glass-card rounded-xl p-4 shadow-lg animate-slide-in-top [animation-delay:500ms]">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">NSE Index</div>
                  <div className="text-lg font-bold">+4.7%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
