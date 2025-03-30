
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AiAssistant from "@/components/common/AiAssistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  BarChart3, 
  Lightbulb, 
  ArrowRight, 
  InfoIcon, 
  Clock 
} from "lucide-react";
import InvestPopupModal from "@/components/modals/InvestPopupModal";

const Invest = () => {
  const [selectedStock, setSelectedStock] = useState<any>(null);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dummy data for available stocks
  const allStocks = [
    { 
      id: 1, 
      symbol: 'SCOM', 
      name: 'Safaricom PLC', 
      price: 31.25, 
      change: 2.1, 
      sector: 'Telecommunications',
      marketCap: '1.25T',
      peRatio: 15.2,
      aiScore: 85,
      sentiment: 'bullish'
    },
    { 
      id: 2, 
      symbol: 'EABL', 
      name: 'East African Breweries', 
      price: 165.25, 
      change: -1.5, 
      sector: 'Consumer Goods',
      marketCap: '131.4B',
      peRatio: 18.5,
      aiScore: 72,
      sentiment: 'neutral'
    },
    { 
      id: 3, 
      symbol: 'KCB', 
      name: 'KCB Group', 
      price: 44.75, 
      change: 1.2, 
      sector: 'Banking',
      marketCap: '143.8B',
      peRatio: 8.2,
      aiScore: 77,
      sentiment: 'bullish'
    },
    { 
      id: 4, 
      symbol: 'EQTY', 
      name: 'Equity Group', 
      price: 56.50, 
      change: 3.8, 
      sector: 'Banking',
      marketCap: '213.5B',
      peRatio: 7.9,
      aiScore: 88,
      sentiment: 'bullish'
    },
    { 
      id: 5, 
      symbol: 'COOP', 
      name: 'Co-operative Bank', 
      price: 13.85, 
      change: 0.25, 
      sector: 'Banking',
      marketCap: '81.3B',
      peRatio: 5.4,
      aiScore: 75,
      sentiment: 'neutral'
    },
    { 
      id: 6, 
      symbol: 'BAT', 
      name: 'BAT Kenya', 
      price: 405.00, 
      change: -0.7, 
      sector: 'Consumer Goods',
      marketCap: '40.6B',
      peRatio: 10.2,
      aiScore: 62,
      sentiment: 'bearish'
    },
    { 
      id: 7, 
      symbol: 'ABSA', 
      name: 'Absa Bank Kenya', 
      price: 12.40, 
      change: 1.6, 
      sector: 'Banking',
      marketCap: '67.3B',
      peRatio: 6.3,
      aiScore: 71,
      sentiment: 'neutral'
    },
    { 
      id: 8, 
      symbol: 'JUB', 
      name: 'Jubilee Holdings', 
      price: 275.50, 
      change: 0.9, 
      sector: 'Insurance',
      marketCap: '19.9B',
      peRatio: 9.1,
      aiScore: 69,
      sentiment: 'neutral'
    },
  ];
  
  // Top picks based on AI score
  const topPicks = allStocks
    .sort((a, b) => b.aiScore - a.aiScore)
    .slice(0, 4);
  
  // Filter stocks based on search
  const filteredStocks = searchTerm 
    ? allStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allStocks;
  
  const openInvestModal = (stock: any) => {
    setSelectedStock(stock);
    setShowInvestModal(true);
  };
  
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'bearish':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    }
  };
  
  const getAiScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-teal-500';
    if (score >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn={true} />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-teal-500 dark:text-teal-400">
            Invest in Kenyan Stocks
          </h1>
          <p className="text-muted-foreground mb-8">
            Explore investment opportunities on the Nairobi Securities Exchange
          </p>
          
          {/* Top AI Picks */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold">AI-Recommended Top Picks</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topPicks.map(stock => (
                <Card key={stock.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="p-4 pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{stock.symbol}</CardTitle>
                        <CardDescription className="line-clamp-1">{stock.name}</CardDescription>
                      </div>
                      <Badge className={getSentimentColor(stock.sentiment)} variant="outline">
                        {stock.sentiment.charAt(0).toUpperCase() + stock.sentiment.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-2xl font-bold">KSh {stock.price.toFixed(2)}</div>
                        <div className={`flex items-center text-sm ${
                          stock.change >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {stock.change >= 0 
                            ? <TrendingUp className="w-3 h-3 mr-1" /> 
                            : <TrendingDown className="w-3 h-3 mr-1" />
                          }
                          {stock.change >= 0 ? '+' : ''}{stock.change}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">AI Score</div>
                        <div className={`text-xl font-bold ${getAiScoreColor(stock.aiScore)}`}>
                          {stock.aiScore}%
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-teal-500 hover:bg-teal-600"
                      onClick={() => openInvestModal(stock)}
                    >
                      Invest Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* All Stocks */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                  <CardTitle>Available Stocks</CardTitle>
                  <CardDescription>All tradable securities on the NSE</CardDescription>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by name or symbol..."
                      className="pl-8 w-full md:w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
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
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
                  <TabsTrigger value="all">All Stocks</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="sectors">By Sector</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Symbol</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Change</TableHead>
                          <TableHead>Sector</TableHead>
                          <TableHead className="text-right">Market Cap</TableHead>
                          <TableHead className="text-right">P/E Ratio</TableHead>
                          <TableHead className="text-right">AI Score</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStocks.map((stock) => (
                          <TableRow key={stock.id}>
                            <TableCell className="font-semibold">{stock.symbol}</TableCell>
                            <TableCell>{stock.name}</TableCell>
                            <TableCell className="text-right">KSh {stock.price.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <div className={`flex items-center justify-end ${
                                stock.change >= 0 ? 'text-green-500' : 'text-red-500'
                              }`}>
                                {stock.change >= 0 ? 
                                  <TrendingUp className="w-3 h-3 mr-1" /> : 
                                  <TrendingDown className="w-3 h-3 mr-1" />
                                }
                                {stock.change >= 0 ? '+' : ''}{stock.change}%
                              </div>
                            </TableCell>
                            <TableCell>{stock.sector}</TableCell>
                            <TableCell className="text-right">KSh {stock.marketCap}</TableCell>
                            <TableCell className="text-right">{stock.peRatio}</TableCell>
                            <TableCell className="text-right">
                              <div className={`font-semibold ${getAiScoreColor(stock.aiScore)}`}>
                                {stock.aiScore}%
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                className="bg-teal-500 hover:bg-teal-600"
                                onClick={() => openInvestModal(stock)}
                              >
                                Invest
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="trending">
                  <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Trending Stocks Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We're working on enhanced market trend analytics. Check back soon to see which stocks are gathering investor attention.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="sectors">
                  <div className="text-center py-12">
                    <InfoIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Sector Analysis Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Our team is building comprehensive sector analysis tools to help you make more informed investment decisions.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Last updated: Today at 15:30 EAT</span>
                </div>
                <div>
                  <Button variant="link" size="sm" className="text-teal-500">
                    View Market Reports
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Investment Modal */}
      <InvestPopupModal 
        isOpen={showInvestModal} 
        onClose={() => setShowInvestModal(false)} 
        stock={selectedStock} 
      />
      
      <AiAssistant />
      <Footer />
    </div>
  );
};

export default Invest;
