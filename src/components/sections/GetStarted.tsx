
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const benefits = [
  "No CDS account required",
  "Start with as little as KSh 1,000",
  "Free AI-powered investment advice",
  "Trade NSE stocks instantly"
];

const GetStarted = () => {
  return (
    <section className="section bg-gradient-to-b from-transparent to-secondary/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium border border-teal-500/20">
              Ready to Invest?
            </span>
          </div>
          
          <h2>Start Your Investment Journey Today</h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of Kenyans who are growing their wealth through smart, 
            AI-guided stock market investments. It only takes minutes to get started.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 bg-background rounded-full px-4 py-2 border border-border">
                <CheckCircle className="h-5 w-5 text-teal-500" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="pt-6">
            <Link to="/register">
              <Button className="btn-primary rounded-full px-8 py-6 text-lg">
                Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
