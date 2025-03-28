
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Lightbulb } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';

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
      analysis: 'Strong fundamentals with revenue growth from new markets.'
    },
    {
      id: 2,
      symbol: 'EABL',
      name: 'East African Breweries',
      confidence: 76,
      potentialReturn: '8.2%',
      trend: 'up',
      analysis: 'Expanding product line and strong brand presence.'
    }
  ]);

  const openInvestModal = (stockId: number) => {
    // This would trigger the investment modal
    console.log(`Open investment modal for stock ID: ${stockId}`);
    // You would implement the modal logic here
  };

  return (
    <Card className="h-full">
      <CardHeader className="py-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg text-teal-500 dark:text-teal-400">AI Recommendations</CardTitle>
            <CardDescription className="text-xs">Personalized stock picks</CardDescription>
          </div>
          <Lightbulb className="h-4 w-4 text-yellow-500" />
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-3">
          {recommendations.map(stock => (
            <div key={stock.id} className="bg-background rounded-lg p-3 hover:bg-secondary/50 transition-colors">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <h3 className="text-sm font-medium">{stock.symbol} - {stock.name}</h3>
                  <div className="flex items-center mt-1 text-xs">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">+{stock.potentialReturn} potential</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => openInvestModal(stock.id)}
                  className="bg-teal-500 hover:bg-teal-600 text-white h-7 text-xs px-2"
                >
                  Invest
                </Button>
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between mb-1 text-xs">
                  <span>AI Confidence</span>
                  <span className="font-medium">{stock.confidence}%</span>
                </div>
                <Progress value={stock.confidence} className="h-1" />
              </div>
              
              <p className="mt-2 text-xs text-muted-foreground">{stock.analysis}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-border pt-2 justify-center">
        <Button variant="link" size="sm" className="text-teal-500 text-xs py-0">
          View All Recommendations
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AiRecommendations;
