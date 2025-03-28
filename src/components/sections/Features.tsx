
import { 
  BarChart3, Brain, CreditCard, Shield
} from 'lucide-react';

const features = [
  {
    icon: <BarChart3 className="h-6 w-6 text-teal-500" />,
    title: "Stock Viewing",
    description: "Browse and analyze the entire Kenyan stock market with real-time data."
  },
  {
    icon: <Brain className="h-6 w-6 text-teal-500" />,
    title: "AI Analysis",
    description: "Receive intelligent stock recommendations powered by advanced AI."
  },
  {
    icon: <CreditCard className="h-6 w-6 text-teal-500" />,
    title: "Simplified Trading",
    description: "Buy and sell stocks with a few taps, without traditional complexity."
  },
  {
    icon: <Shield className="h-6 w-6 text-teal-500" />,
    title: "Blockchain Security",
    description: "Enjoy the security of Hedera blockchain technology for all transactions."
  }
];

const Features = () => {
  return (
    <section id="features" className="section py-12 md:py-16">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium border border-teal-500/20">
              Powerful Features
            </span>
          </div>
          <h2 className="mt-4 mb-3 text-2xl md:text-3xl">Everything You Need to Invest with Confidence</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-background rounded-xl border border-border p-4 card-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center mb-3">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
