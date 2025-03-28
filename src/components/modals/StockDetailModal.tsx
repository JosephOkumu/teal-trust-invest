
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { TrendingUp, TrendingDown, Clock, Activity } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
);

interface StockDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: any;
}

const StockDetailModal = ({ isOpen, onClose, stock }: StockDetailModalProps) => {
  if (!stock) return null;

  // Generate some dummy chart data
  const generateDummyData = () => {
    const basePrice = stock.buyPrice;
    const dates = Array.from({length: 30}, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (30 - i));
      return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
    });
    
    // Generate somewhat realistic price movement
    let currentPrice = basePrice;
    const prices = dates.map((_, i) => {
      const change = (Math.random() - 0.5) * 2; // Random change between -1 and 1
      currentPrice = Math.max(currentPrice + change, basePrice * 0.8); // Don't go below 80% of base price
      return currentPrice;
    });
    
    // Make sure the last price matches the current price
    prices[prices.length - 1] = stock.currentPrice;
    
    return { dates, prices };
  };
  
  const { dates, prices } = generateDummyData();
  
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Price (KSh)',
        data: prices,
        borderColor: stock.profit >= 0 ? '#20c997' : '#dc3545',
        backgroundColor: stock.profit >= 0 ? 'rgba(32, 201, 151, 0.1)' : 'rgba(220, 53, 69, 0.1)',
        tension: 0.3,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 2,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 5,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value: any) {
            return 'KSh ' + value;
          },
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  // Market stats - dummy data
  const marketStats = {
    dayRange: `KSh ${(stock.currentPrice * 0.97).toFixed(2)} - KSh ${(stock.currentPrice * 1.03).toFixed(2)}`,
    yearRange: `KSh ${(stock.currentPrice * 0.7).toFixed(2)} - KSh ${(stock.currentPrice * 1.3).toFixed(2)}`,
    volume: '1.2M shares',
    marketCap: 'KSh 1.25T',
    peRatio: '15.2'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <div>
              <span className="text-xl">{stock.symbol} - {stock.name}</span>
            </div>
            <div className={`flex items-center ${stock.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock.profit >= 0 ? (
                <TrendingUp className="w-5 h-5 mr-1" />
              ) : (
                <TrendingDown className="w-5 h-5 mr-1" />
              )}
              <span className="text-lg">
                KSh {stock.currentPrice.toFixed(2)} 
                <span className="text-sm ml-1">
                  ({stock.profit >= 0 ? '+' : ''}{stock.profitPercent}%)
                </span>
              </span>
            </div>
          </DialogTitle>
          <DialogDescription className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>Last updated: Today at 15:30 EAT</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="h-[300px] my-4">
          <Line data={chartData} options={chartOptions} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Your Position</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shares Owned:</span>
                <span className="font-medium">{stock.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Buy Price:</span>
                <span className="font-medium">KSh {stock.buyPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Value:</span>
                <span className="font-medium">KSh {(stock.quantity * stock.currentPrice).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Profit/Loss:</span>
                <span className={`font-medium ${stock.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.profit >= 0 ? '+' : ''}KSh {stock.profit.toLocaleString()} ({stock.profit >= 0 ? '+' : ''}{stock.profitPercent}%)
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Market Statistics</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Day Range:</span>
                <span className="font-medium">{marketStats.dayRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">52-Week Range:</span>
                <span className="font-medium">{marketStats.yearRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volume:</span>
                <span className="font-medium">{marketStats.volume}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Market Cap:</span>
                <span className="font-medium">{marketStats.marketCap}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">P/E Ratio:</span>
                <span className="font-medium">{marketStats.peRatio}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-muted/40 p-4 rounded-md">
          <div className="flex items-start gap-2">
            <Activity className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium">AI Analysis</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {stock.symbol} shows strong technical signals with a bullish trend over the last 30 days. 
                The company recently announced expansion plans which could drive growth. 
                Based on current market conditions, this stock is rated as a <span className="font-medium text-teal-500">BUY</span> 
                with a 12-month target price of KSh {(stock.currentPrice * 1.15).toFixed(2)}.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-teal-500 hover:bg-teal-600">
            Trade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StockDetailModal;
