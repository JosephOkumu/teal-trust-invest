
import { Doughnut } from 'react-chartjs-2';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, WalletCards } from 'lucide-react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';

// Register the required chart components
Chart.register(ArcElement, Tooltip, Legend);

const PortfolioSnapshot = () => {
  // Dummy data - would come from API
  const portfolioValue = 125000;
  const profitLoss = 7500;
  const profitLossPercent = 6.38;
  const isProfitable = profitLoss >= 0;
  
  // Token data - would come from API
  const tokenBalance = 250;
  const tokenValue = 15000; // in KSh

  // Dummy chart data for stocks only (excluding tokens)
  const chartData = {
    labels: ['Safaricom', 'EABL', 'KCB', 'Equity', 'Others'],
    datasets: [
      {
        data: [45, 22, 15, 10, 8],
        backgroundColor: [
          '#17a2b8',
          '#20c997',
          '#4bc0c0',
          '#138496',
          '#0c5460',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 10,
          font: {
            size: 11
          }
        },
      },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader className="py-4">
        <CardTitle className="text-lg text-teal-500 dark:text-teal-400">Portfolio Snapshot</CardTitle>
        <CardDescription className="text-xs">Your investment overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <div>
            <h3 className="text-xs text-muted-foreground mb-1">Total Value</h3>
            <p className="text-xl font-bold">KSh {portfolioValue.toLocaleString()}</p>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
              isProfitable ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {isProfitable ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
              <span className="font-medium">
                {isProfitable ? '+' : ''}{profitLossPercent.toFixed(2)}% 
                ({isProfitable ? '+' : ''}KSh {profitLoss.toLocaleString()})
              </span>
            </div>
          </div>
        </div>

        {/* Token information - now separate from the chart */}
        <div className="flex justify-between items-center p-3 mb-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
          <div className="flex items-center">
            <WalletCards className="h-4 w-4 mr-2 text-purple-500" />
            <div>
              <h4 className="text-xs font-medium">Token Balance</h4>
              <p className="text-sm font-bold">{tokenBalance} KST</p>
            </div>
          </div>
          <div className="text-right">
            <h4 className="text-xs text-muted-foreground">Value</h4>
            <p className="text-sm">KSh {tokenValue.toLocaleString()}</p>
          </div>
          <Link to="/wallet" className="text-xs text-purple-600 dark:text-purple-400 hover:underline">
            View Wallet
          </Link>
        </div>

        <div className="h-[160px] mb-2">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
        
        <div className="mt-2 text-center">
          <p className="text-xs text-muted-foreground">Stock Allocation</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSnapshot;
