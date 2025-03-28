
import { Doughnut } from 'react-chartjs-2';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required chart components
Chart.register(ArcElement, Tooltip, Legend);

const PortfolioSnapshot = () => {
  // Dummy data - would come from API
  const portfolioValue = 125000;
  const profitLoss = 7500;
  const profitLossPercent = 6.38;
  const isProfitable = profitLoss >= 0;

  // Dummy chart data
  const chartData = {
    labels: ['Safaricom', 'EABL', 'KCB', 'Equity', 'Others'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
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
          padding: 15,
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-teal-500 dark:text-teal-400">Portfolio Snapshot</CardTitle>
        <CardDescription>Your investment overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between mb-6">
          <div>
            <h3 className="text-sm text-muted-foreground mb-1">Total Value</h3>
            <p className="text-2xl font-bold">KSh {portfolioValue.toLocaleString()}</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center">
            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm ${
              isProfitable ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {isProfitable ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
              <span className="font-medium">
                {isProfitable ? '+' : ''}{profitLossPercent.toFixed(2)}% 
                ({isProfitable ? '+' : ''}KSh {profitLoss.toLocaleString()})
              </span>
            </div>
          </div>
        </div>

        <div className="h-[200px] mb-4">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">Asset Allocation</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSnapshot;
