
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
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
      analysis: 'Strong fundamentals with revenue growth from new markets in Ethiopia.'
    },
    {
      id: 2,
      symbol: 'EABL',
      name: 'East African Breweries',
      confidence: 76,
      potentialReturn: '8.2%',
      trend: 'up',
      analysis: 'Expanding product line and strong brand presence across East Africa.'
    },
    {
      id: 3,
      symbol: 'EQTY',
      name: 'Equity Group Holdings',
      confidence: 72,
      potentialReturn: '7.8%',
      trend: 'up',
      analysis: 'Digital banking growth and regional expansion providing new revenue streams.'
    }
  ]);

  const openInvestModal = (stockId: number) => {
    // This would trigger the investment modal
    console.log(`Open investment modal for stock ID: ${stockId}`);
    // You would implement the modal logic here
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl text-teal-500 dark:text-teal-400">AI-Driven Recommendations</CardTitle>
            <CardDescription>Personalized stock picks for you</CardDescription>
          </div>
          <Lightbulb className="h-5 w-5 text-yellow-500" />
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-4">
          {recommendations.map(stock => (
            <div key={stock.id} className="bg-background rounded-lg p-4 hover:bg-secondary/50 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-medium">{stock.symbol} - {stock.name}</h3>
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
      </CardContent>
      <CardFooter className="border-t border-border pt-4 text-center">
        <Button variant="link" className="mx-auto text-teal-500">
          View All Recommendations
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AiRecommendations;
