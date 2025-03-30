
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import InvestPopupModal from '@/components/modals/InvestPopupModal';

const AiRecommendations = () => {
  // This would come from your API
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      symbol: 'SCOM',
      name: 'Safaricom PLC',
      confidence: 87,
      potentialReturn: '12.5%',
      trend: 'up',
      analysis: 'Strong fundamentals with revenue growth from new markets in Ethiopia.',
      price: 31.25 // Added price for the modal
    },
    {
      id: 2,
      symbol: 'EABL',
      name: 'East African Breweries',
      confidence: 76,
      potentialReturn: '8.2%',
      trend: 'up',
      analysis: 'Expanding product line and strong brand presence across East Africa.',
      price: 165.25 // Added price for the modal
    },
    {
      id: 3,
      symbol: 'EQTY',
      name: 'Equity Group Holdings',
      confidence: 72,
      potentialReturn: '7.8%',
      trend: 'up',
      analysis: 'Digital banking growth and regional expansion providing new revenue streams.',
      price: 56.50 // Added price for the modal
    }
  ]);

  // State for the invest modal
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<any>(null);

  const openInvestModal = (stockId: number) => {
    const stock = recommendations.find(stock => stock.id === stockId);
    if (stock) {
      setSelectedStock(stock);
      setIsInvestModalOpen(true);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border">
        {/* Left Column - Recommendations List */}
        <div className="lg:col-span-2">
          <div className="p-5 border-b border-border">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-teal-500 dark:text-teal-400">Smart Stock Picks</h3>
                <p className="text-sm text-muted-foreground">Personalized recommendations based on your profile</p>
              </div>
              <Lightbulb className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          
          <div className="divide-y divide-border">
            {recommendations.map(stock => (
              <div key={stock.id} className="p-4 hover:bg-secondary/20 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-lg">{stock.symbol} - {stock.name}</h3>
                    <div className="flex items-center mt-1 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-500 font-medium">+{stock.potentialReturn} potential</span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => openInvestModal(stock.id)}
                    className="bg-teal-500 hover:bg-teal-600 text-white"
                  >
                    Invest
                  </Button>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>AI Confidence</span>
                    <span className="font-medium">{stock.confidence}%</span>
                  </div>
                  <Progress value={stock.confidence} className="h-2" />
                </div>
                
                <p className="mt-3 text-sm text-muted-foreground">{stock.analysis}</p>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-border text-center">
            <Button variant="outline" className="text-teal-500 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/20">
              View All Recommendations
            </Button>
          </div>
        </div>
        
        {/* Right Column - AI Insights */}
        <div className="p-5">
          <h3 className="text-lg font-medium mb-4">Why These Picks?</h3>
          
          <div className="space-y-4">
            <div className="bg-teal-50 dark:bg-teal-950/30 p-4 rounded-lg border border-teal-100 dark:border-teal-900">
              <h4 className="font-medium flex items-center text-teal-700 dark:text-teal-300">
                <AlertCircle className="h-4 w-4 mr-2" />
                Market Analysis
              </h4>
              <p className="mt-2 text-sm text-teal-600 dark:text-teal-400">
                Our AI has analyzed recent market trends and identified these stocks as having strong growth potential based on current economic indicators.
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
              <h4 className="font-medium flex items-center text-blue-700 dark:text-blue-300">
                <Lightbulb className="h-4 w-4 mr-2" />
                Portfolio Fit
              </h4>
              <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                These recommendations are tailored to complement your existing investments and help diversify your portfolio for optimal risk management.
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="text-sm font-medium mb-2">Recommendation Confidence</h4>
            <div className="text-xs text-muted-foreground">
              Our AI model's confidence score is based on historical data analysis, market trends, and company fundamentals. Higher scores indicate stronger conviction in the recommendation.
            </div>
          </div>
        </div>
      </div>

      {/* Invest Popup Modal */}
      {selectedStock && (
        <InvestPopupModal
          isOpen={isInvestModalOpen}
          onClose={() => setIsInvestModalOpen(false)}
          stock={selectedStock}
        />
      )}
    </div>
  );
};

export default AiRecommendations;
