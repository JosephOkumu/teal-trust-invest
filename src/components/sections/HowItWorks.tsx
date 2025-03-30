
import { Check, ArrowRight, UserPlus, FileText, Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: "01",
    title: "Register",
    description: "Create your account in minutes with just your email and phone number",
    icon: <UserPlus className="h-6 w-6 text-teal-500" />
  },
  {
    number: "02",
    title: "Create CDS Account",
    description: "We'll help you set up your CDS account automatically through our platform",
    icon: <FileText className="h-6 w-6 text-teal-500" />
  },
  {
    number: "03",
    title: "Browse Stocks",
    description: "Explore available stocks with real-time data and AI insights",
    icon: <Search className="h-6 w-6 text-teal-500" />
  },
  {
    number: "04",
    title: "Buy Stocks",
    description: "Invest in your chosen stocks easily with M-Pesa",
    icon: <ShoppingCart className="h-6 w-6 text-teal-500" />
  }
];

const benefits = [
  "Start with just KES 100",
  "No paperwork hassle",
  "Instant M-Pesa deposits"
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section bg-secondary/30">
      <div className="container-custom text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium border border-teal-500/20">
              Simple Process
            </span>
          </div>
          <h2 className="mb-4">Start Investing in 4 Easy Steps</h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Steps */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {steps.map((step, index) => (
                <div key={index} className="relative flex flex-col items-center">
                  {/* Circle with Icon */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 p-[2px]">
                      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                        {step.icon}
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-teal-500 border-4 border-background flex items-center justify-center text-white text-sm font-bold">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                  <p className="text-muted-foreground text-center text-sm">{step.description}</p>
                  
                  {/* Mobile Arrow */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden mt-6">
                      <ArrowRight className="h-8 w-8 text-teal-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12">
            <Link to="/register">
              <Button className="btn-primary rounded-full px-8 py-6 text-lg">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
