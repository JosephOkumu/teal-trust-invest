
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Eye, Wallet, RefreshCw, Filter } from 'lucide-react';
import WithdrawModal from '@/components/modals/WithdrawModal';
import StockDetailModal from '@/components/modals/StockDetailModal';
import InvestModal from '@/components/modals/InvestModal';

const ActivePositions = () => {
  // States for various modals
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  
  // Dummy data for investments
  const investments = [
    {
      id: 1,
      symbol: 'SCOM',
      name: 'Safaricom PLC',
      quantity: 500,
      buyPrice: 28.75,
      currentPrice: 31.25,
      profit: 1250,
      profitPercent: 8.7,
    },
    {
      id: 2,
      symbol: 'EABL',
      name: 'East African Breweries',
      quantity: 200,
      buyPrice: 170.50,
      currentPrice: 165.25,
      profit: -1050,
      profitPercent: -3.1,
    },
    {
      id: 3,
      symbol: 'KCB',
      name: 'KCB Group',
      quantity: 300,
      buyPrice: 42.00,
      currentPrice: 44.75,
      profit: 825,
      profitPercent: 6.5,
    },
    {
      id: 4,
      symbol: 'EQTY',
      name: 'Equity Group',
      quantity: 400,
      buyPrice: 52.25,
      currentPrice: 56.50,
      profit: 1700,
      profitPercent: 8.1,
    },
  ];

  // Open modals with selected stock
  const openWithdrawModal = (stock: any) => {
    setSelectedStock(stock);
    setShowWithdrawModal(true);
  };

  const openDetailModal = (stock: any) => {
    setSelectedStock(stock);
    setShowDetailModal(true);
  };

  const openInvestModal = (stock: any) => {
    setSelectedStock(stock);
    setShowInvestModal(true);
  };

  return (
    <Card>
      <CardHeader className="py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-lg text-teal-500 dark:text-teal-400">Active Positions</CardTitle>
            <CardDescription className="text-xs">Currently held investments</CardDescription>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button variant="outline" size="sm" className="flex gap-1 items-center h-7 text-xs">
              <Filter size={12} />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="flex gap-1 items-center h-7 text-xs">
              <RefreshCw size={12} />
              <span>Refresh</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto -mx-2 px-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Stock</TableHead>
                <TableHead className="text-right text-xs">Quantity</TableHead>
                <TableHead className="text-right text-xs">Buy Price</TableHead>
                <TableHead className="text-right text-xs">Current</TableHead>
                <TableHead className="text-right text-xs">P/L</TableHead>
                <TableHead className="text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {investments.map((investment) => (
                <TableRow key={investment.id}>
                  <TableCell className="py-2">
                    <div>
                      <div className="font-semibold text-sm">{investment.symbol}</div>
                      <div className="text-[10px] text-muted-foreground">{investment.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-xs py-2">{investment.quantity}</TableCell>
                  <TableCell className="text-right text-xs py-2">KSh {investment.buyPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right text-xs py-2">KSh {investment.currentPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right py-2">
                    <div className={`flex flex-col items-end ${
                      investment.profit >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      <div className="flex items-center text-xs">
                        {investment.profit >= 0 ? 
                          <TrendingUp className="w-3 h-3 mr-1" /> : 
                          <TrendingDown className="w-3 h-3 mr-1" />
                        }
                        {investment.profit >= 0 ? '+' : ''}{investment.profitPercent}%
                      </div>
                      <div className="text-[10px]">
                        {investment.profit >= 0 ? '+' : ''}KSh {investment.profit.toLocaleString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-2">
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => openDetailModal(investment)}
                        className="h-6 w-6"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => openWithdrawModal(investment)}
                        className="h-6 w-6"
                      >
                        <Wallet className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => openInvestModal(investment)}
                        className="h-6 w-6"
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" className="mr-2 text-xs h-7">View Past Investments</Button>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white text-xs h-7">Explore New Stocks</Button>
        </div>
      </CardContent>

      {/* Modals */}
      <WithdrawModal 
        isOpen={showWithdrawModal} 
        onClose={() => setShowWithdrawModal(false)} 
        stock={selectedStock} 
      />
      
      <StockDetailModal 
        isOpen={showDetailModal} 
        onClose={() => setShowDetailModal(false)} 
        stock={selectedStock} 
      />
      
      <InvestModal 
        isOpen={showInvestModal} 
        onClose={() => setShowInvestModal(false)} 
        stock={selectedStock} 
      />
    </Card>
  );
};

export default ActivePositions;
