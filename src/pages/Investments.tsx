
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AiAssistant from "@/components/common/AiAssistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Wallet, RefreshCw, Filter, Clock, Search, TrendingUp, TrendingDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import StockDetailModal from "@/components/modals/StockDetailModal";
import WithdrawModal from "@/components/modals/WithdrawModal";
import InvestModal from "@/components/modals/InvestModal";

const Investments = () => {
  // States for various modals
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  
  // Dummy data for current investments
  const currentInvestments = [
    {
      id: 1,
      symbol: 'SCOM',
      name: 'Safaricom PLC',
      quantity: 500,
      buyPrice: 28.75,
      currentPrice: 31.25,
      profit: 1250,
      profitPercent: 8.7,
      purchaseDate: '2023-02-15',
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
      purchaseDate: '2023-03-22',
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
      purchaseDate: '2023-01-10',
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
      purchaseDate: '2023-04-05',
    },
  ];
  
  // Dummy data for past investments
  const pastInvestments = [
    {
      id: 101,
      symbol: 'ABSA',
      name: 'Absa Bank Kenya',
      quantity: 300,
      buyPrice: 12.50,
      sellPrice: 13.75,
      profit: 375,
      profitPercent: 10.0,
      purchaseDate: '2022-10-18',
      sellDate: '2023-01-25',
    },
    {
      id: 102,
      symbol: 'COOP',
      name: 'Co-operative Bank',
      quantity: 500,
      buyPrice: 13.25,
      sellPrice: 14.00,
      profit: 375,
      profitPercent: 5.7,
      purchaseDate: '2022-11-05',
      sellDate: '2023-02-12',
    },
    {
      id: 103,
      symbol: 'JUB',
      name: 'Jubilee Holdings',
      quantity: 100,
      buyPrice: 290.00,
      sellPrice: 275.50,
      profit: -1450,
      profitPercent: -5.0,
      purchaseDate: '2022-09-30',
      sellDate: '2023-01-20',
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
  
  // Calculate portfolio totals
  const calculatePortfolioTotals = () => {
    let totalInvested = 0;
    let totalCurrentValue = 0;
    
    currentInvestments.forEach(inv => {
      totalInvested += inv.quantity * inv.buyPrice;
      totalCurrentValue += inv.quantity * inv.currentPrice;
    });
    
    const totalProfit = totalCurrentValue - totalInvested;
    const profitPercent = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;
    
    return {
      totalInvested,
      totalCurrentValue,
      totalProfit,
      profitPercent
    };
  };
  
  const portfolioTotals = calculatePortfolioTotals();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn={true} />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-teal-500 dark:text-teal-400">
            Your Investments
          </h1>
          <p className="text-muted-foreground mb-8">
            Manage your stock portfolio and track performance
          </p>
          
          {/* Portfolio Summary Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Total Invested</h3>
                  <p className="text-2xl font-bold">KSh {portfolioTotals.totalInvested.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Current Value</h3>
                  <p className="text-2xl font-bold">KSh {portfolioTotals.totalCurrentValue.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Total Profit/Loss</h3>
                  <div className={`flex items-center ${
                    portfolioTotals.totalProfit >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {portfolioTotals.totalProfit >= 0 ? 
                      <TrendingUp className="w-5 h-5 mr-1" /> : 
                      <TrendingDown className="w-5 h-5 mr-1" />
                    }
                    <p className="text-2xl font-bold">
                      {portfolioTotals.totalProfit >= 0 ? '+' : ''}
                      KSh {portfolioTotals.totalProfit.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Return Rate</h3>
                  <p className={`text-2xl font-bold ${
                    portfolioTotals.profitPercent >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {portfolioTotals.profitPercent >= 0 ? '+' : ''}
                    {portfolioTotals.profitPercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="current">Current Investments</TabsTrigger>
              <TabsTrigger value="past">Past Investments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                    <div>
                      <CardTitle>Current Investments</CardTitle>
                      <CardDescription>Your active stock positions</CardDescription>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search stocks..."
                          className="pl-8 w-full md:w-[200px]"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="flex gap-1 items-center">
                        <Filter size={14} />
                        <span>Filter</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Stock</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Buy Price</TableHead>
                          <TableHead className="text-right">Current Price</TableHead>
                          <TableHead className="text-right">P/L</TableHead>
                          <TableHead className="text-right">Purchase Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentInvestments.map((investment) => (
                          <TableRow key={investment.id}>
                            <TableCell className="font-medium">
                              <div>
                                <div className="font-semibold">{investment.symbol}</div>
                                <div className="text-xs text-muted-foreground">{investment.name}</div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{investment.quantity}</TableCell>
                            <TableCell className="text-right">KSh {investment.buyPrice.toFixed(2)}</TableCell>
                            <TableCell className="text-right">KSh {investment.currentPrice.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <div className={`flex flex-col items-end ${
                                investment.profit >= 0 ? 'text-green-500' : 'text-red-500'
                              }`}>
                                <div className="flex items-center">
                                  {investment.profit >= 0 ? 
                                    <TrendingUp className="w-3 h-3 mr-1" /> : 
                                    <TrendingDown className="w-3 h-3 mr-1" />
                                  }
                                  {investment.profit >= 0 ? '+' : ''}{investment.profitPercent}%
                                </div>
                                <div className="text-xs">
                                  {investment.profit >= 0 ? '+' : ''}KSh {investment.profit.toLocaleString()}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end">
                                <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {new Date(investment.purchaseDate).toLocaleDateString()}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => openDetailModal(investment)}
                                  className="flex items-center gap-1 h-8"
                                  title="View details"
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="hidden sm:inline text-xs">Details</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => openWithdrawModal(investment)}
                                  className="flex items-center gap-1 h-8"
                                  title="Withdraw funds"
                                >
                                  <Wallet className="h-4 w-4" />
                                  <span className="hidden sm:inline text-xs">Withdraw</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => openInvestModal(investment)}
                                  className="flex items-center gap-1 h-8"
                                  title="Reinvest"
                                >
                                  <RefreshCw className="h-4 w-4" />
                                  <span className="hidden sm:inline text-xs">Reinvest</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                      Explore New Investments
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="past">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                    <div>
                      <CardTitle>Past Investments</CardTitle>
                      <CardDescription>Your investment history</CardDescription>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search history..."
                          className="pl-8 w-full md:w-[200px]"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="flex gap-1 items-center">
                        <Filter size={14} />
                        <span>Filter</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Stock</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Buy Price</TableHead>
                          <TableHead className="text-right">Sell Price</TableHead>
                          <TableHead className="text-right">P/L</TableHead>
                          <TableHead className="text-right">Purchase Date</TableHead>
                          <TableHead className="text-right">Sell Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pastInvestments.map((investment) => (
                          <TableRow key={investment.id}>
                            <TableCell className="font-medium">
                              <div>
                                <div className="font-semibold">{investment.symbol}</div>
                                <div className="text-xs text-muted-foreground">{investment.name}</div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">{investment.quantity}</TableCell>
                            <TableCell className="text-right">KSh {investment.buyPrice.toFixed(2)}</TableCell>
                            <TableCell className="text-right">KSh {investment.sellPrice.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <div className={`flex flex-col items-end ${
                                investment.profit >= 0 ? 'text-green-500' : 'text-red-500'
                              }`}>
                                <div className="flex items-center">
                                  {investment.profit >= 0 ? 
                                    <TrendingUp className="w-3 h-3 mr-1" /> : 
                                    <TrendingDown className="w-3 h-3 mr-1" />
                                  }
                                  {investment.profit >= 0 ? '+' : ''}{investment.profitPercent}%
                                </div>
                                <div className="text-xs">
                                  {investment.profit >= 0 ? '+' : ''}KSh {investment.profit.toLocaleString()}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right text-sm text-muted-foreground">
                              {new Date(investment.purchaseDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right text-sm text-muted-foreground">
                              {new Date(investment.sellDate).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-6 text-muted-foreground text-center text-sm">
                    <p>Showing past investments from the last 12 months.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
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
      
      <AiAssistant />
      <Footer />
    </div>
  );
};

export default Investments;
