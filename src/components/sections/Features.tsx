
import {
  Brain, MessageSquare, Shield, Wallet
} from 'lucide-react';

const features = [
  {
    icon: <Brain className="h-6 w-6 text-teal-500" />,
    title: "Agent Driven AI Analysis",
    description: "Get intelligent insights and recommendations from our advanced AI-powered analysis system."
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-teal-500" />,
    title: "Process & Chat Assistant",
    description: "24/7 support with our intelligent chat assistant to guide you through every investment step."
  },
  {
    icon: <Shield className="h-6 w-6 text-teal-500" />,
    title: "Hedera Blockchain Technology",
    description: "Secure and transparent transactions powered by enterprise-grade Hedera blockchain."
  },
  {
    icon: <Wallet className="h-6 w-6 text-teal-500" />,
    title: "M-Pesa Support",
    description: "Seamless deposits and withdrawals through M-Pesa for convenient trading."
  }
];

const Features = () => {
  return (
    <section id="features" className="section">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium border border-teal-500/20">
              Powerful Features
            </span>
          </div>
          <h2 className="mt-6 mb-4">Everything You Need to Invest with Confidence</h2>
          <p className="text-muted-foreground text-lg">
            Our platform combines cutting-edge technology with user-friendly design to make stock 
            market investing accessible, secure, and intelligent.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background rounded-xl border border-border p-6 card-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
