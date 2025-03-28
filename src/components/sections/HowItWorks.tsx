
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up in minutes with just your email and phone number. No paperwork, no CDS account needed."
  },
  {
    number: "02",
    title: "Fund Your Wallet",
    description: "Deposit funds using M-Pesa, bank transfer, or other popular payment methods securely."
  },
  {
    number: "03",
    title: "Explore Stocks & AI Insights",
    description: "Browse Kenyan stocks and receive personalized AI-powered recommendations based on your goals."
  },
  {
    number: "04",
    title: "Trade & Track Performance",
    description: "Buy and sell stocks with ease, then monitor your portfolio's performance in real-time."
  }
];

const benefits = [
  "No need for a CDS account",
  "Lower fees than traditional brokers",
  "AI-powered investment advice",
  "Secure blockchain transactions",
  "Real-time market data",
  "User-friendly interface"
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section bg-secondary/30">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium border border-teal-500/20">
                Simple Process
              </span>
            </div>
            
            <h2>How KenyaStocks Works</h2>
            
            <p className="text-lg text-muted-foreground">
              Our platform simplifies stock market investing in Kenya with cutting-edge technology 
              and a user-friendly approach that eliminates traditional barriers.
            </p>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            
            <Link to="/register">
              <Button className="btn-primary rounded-full px-8 py-6 text-lg">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="bg-background rounded-xl border border-border p-6 flex space-x-6 card-hover"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500 font-bold">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
