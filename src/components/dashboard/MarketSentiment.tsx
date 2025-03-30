
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const MarketSentiment = () => {
  // Dummy data - would come from API
  const marketSentiment = 68; // 0-100, where >50 is bullish
  const trendingStocks = [
    { symbol: 'SCOM', name: 'Safaricom', change: 2.4, volume: '2.5M' },
    { symbol: 'EQTY', name: 'Equity Group', change: 1.8, volume: '1.2M' },
    { symbol: 'EABL', name: 'East African Breweries', change: -1.2, volume: '890K' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-teal-500 dark:text-teal-400">Market Sentiment</CardTitle>
        <CardDescription>Overall market mood and trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-red-500">Bearish</span>
            <span className="text-sm text-green-500">Bullish</span>
          </div>
          <Progress value={marketSentiment} className="h-2" />
          <div className="mt-2 text-center">
            <span className="inline-flex items-center text-sm font-medium">
              {marketSentiment > 50 ? (
                <>
                  <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                  <span className="text-green-500">Bullish</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
                  <span className="text-red-500">Bearish</span>
                </>
              )}
              <span className="mx-1 text-muted-foreground">•</span>
              <span className="text-muted-foreground">{marketSentiment}% Sentiment Score</span>
            </span>
          </div>
        </div>

        <h3 className="font-medium mb-3">Trending Stocks</h3>
        <div className="space-y-3">
          {trendingStocks.map((stock) => (
            <div key={stock.symbol} className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50">
              <div>
                <p className="font-medium">{stock.symbol}</p>
                <p className="text-xs text-muted-foreground">{stock.name}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-xs text-muted-foreground">{stock.volume}</div>
                <div className={`flex items-center ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  <span>{stock.change >= 0 ? '+' : ''}{stock.change}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md p-3">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Market Alert</p>
              <p className="text-xs text-amber-700 dark:text-amber-400">NSE 20 index up 1.2% in morning trading after Central Bank announcement.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSentiment;
