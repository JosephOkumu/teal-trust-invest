
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Sign up in minutes with just your email and phone number."
  },
  {
    number: "02",
    title: "Fund Wallet",
    description: "Deposit funds using M-Pesa or bank transfer securely."
  },
  {
    number: "03",
    title: "Explore & Invest",
    description: "Browse stocks and receive AI-powered recommendations."
  },
  {
    number: "04",
    title: "Track Performance",
    description: "Monitor your portfolio's performance in real-time."
  }
];

const benefits = [
  "No need for a CDS account",
  "Lower fees than traditional brokers",
  "AI-powered investment advice",
  "Secure blockchain transactions"
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section bg-secondary/30 py-12 md:py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium border border-teal-500/20">
                Simple Process
              </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold">How KenyaStocks Works</h2>
            
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
            
            <Link to="/register">
              <Button className="btn-primary rounded-full px-6 py-2 text-base">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="bg-background rounded-xl border border-border p-4 flex flex-col card-hover"
              >
                <div className="mb-2">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500 font-bold text-sm">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
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
