
import { 
  BarChart3, Brain, CreditCard, Shield, Globe, Coins, 
  TrendingUp, Clock, LightbulbIcon, PieChart, History, Wallet 
} from 'lucide-react';

const features = [
  {
    icon: <BarChart3 className="h-6 w-6 text-teal-500" />,
    title: "Stock Viewing",
    description: "Browse and analyze the entire Kenyan stock market with real-time data and historical trends."
  },
  {
    icon: <Brain className="h-6 w-6 text-teal-500" />,
    title: "AI Analysis",
    description: "Receive intelligent stock recommendations and market insights powered by advanced AI algorithms."
  },
  {
    icon: <CreditCard className="h-6 w-6 text-teal-500" />,
    title: "Simplified Trading",
    description: "Buy and sell stocks with a few taps, without the complexity of traditional brokerage accounts."
  },
  {
    icon: <PieChart className="h-6 w-6 text-teal-500" />,
    title: "Portfolio Management",
    description: "Track performance, analyze diversification, and optimize your investment strategy."
  },
  {
    icon: <Shield className="h-6 w-6 text-teal-500" />,
    title: "Blockchain Security",
    description: "Enjoy the security of Hedera blockchain technology for all your transactions and holdings."
  },
  {
    icon: <LightbulbIcon className="h-6 w-6 text-teal-500" />,
    title: "Expert Insights",
    description: "Access personalized investment advice and market education tailored to your goals."
  },
  {
    icon: <History className="h-6 w-6 text-teal-500" />,
    title: "Transaction History",
    description: "View your complete trading history with detailed performance metrics and tax reporting."
  },
  {
    icon: <Wallet className="h-6 w-6 text-teal-500" />,
    title: "Integrated Wallet",
    description: "Manage your funds securely and easily deposit or withdraw using popular payment methods."
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
