
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: any; // Could be null for new investments
}

const InvestModal = ({ isOpen, onClose, stock }: InvestModalProps) => {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  
  // List of available stocks (would come from API)
  const stockOptions = [
    { symbol: 'SCOM', name: 'Safaricom PLC', price: 31.25, change: 2.1 },
    { symbol: 'EABL', name: 'East African Breweries', price: 165.25, change: -1.5 },
    { symbol: 'KCB', name: 'KCB Group', price: 44.75, change: 1.2 },
    { symbol: 'EQTY', name: 'Equity Group', price: 56.50, change: 3.8 },
    { symbol: 'COOP', name: 'Co-operative Bank', price: 13.85, change: 0.25 },
  ];
  
  // If stock is provided, we're reinvesting. Otherwise, we're investing in a new stock
  const [selectedStock, setSelectedStock] = useState(stock || stockOptions[0]);
  
  const handleInvest = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your backend API
    console.log("Investment request:", { 
      stock: selectedStock, 
      amount, 
      phoneNumber,
      paymentMethod 
    });
    
    // For demo, just move to confirmation step
    setStep(2);
    
    // In a real app, you would call your API and handle the response
  };
  
  const resetAndClose = () => {
    setAmount('');
    setPhoneNumber('');
    setStep(1);
    onClose();
  };
  
  const totalCost = selectedStock ? 
    Number(amount) * selectedStock.price : 0;
  
  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-teal-500" />
            {step === 1 
              ? (stock ? "Reinvest in Stock" : "Invest in Stock") 
              : "Investment Confirmation"
            }
          </DialogTitle>
          <DialogDescription>
            {step === 1 
              ? (stock 
                  ? `Increase your position in ${stock.symbol}` 
                  : "Invest in Kenyan stocks with instant processing")
              : "Your investment has been processed successfully"
            }
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 ? (
          <form onSubmit={handleInvest} className="space-y-4">
            {!stock && (
              <div className="space-y-1">
                <Label htmlFor="stock-select">Select Stock</Label>
                <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-1">
                  {stockOptions.map((option) => (
                    <div 
                      key={option.symbol}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedStock?.symbol === option.symbol 
                          ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/30' 
                          : 'border-border hover:border-teal-200 hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedStock(option)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{option.symbol}</div>
                          <div className="text-xs text-muted-foreground">{option.name}</div>
                        </div>
                        <div className="text-right">
                          <div>KSh {option.price.toFixed(2)}</div>
                          <div className={`text-xs flex items-center justify-end ${
                            option.change >= 0 ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {option.change >= 0 
                              ? <TrendingUp className="w-3 h-3 mr-1" /> 
                              : <TrendingDown className="w-3 h-3 mr-1" />
                            }
                            {option.change >= 0 ? '+' : ''}{option.change}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {stock && (
              <div className="space-y-1">
                <Label htmlFor="stock-info">Current Investment</Label>
                <div id="stock-info" className="p-3 bg-muted rounded-md text-sm">
                  <div className="flex justify-between">
                    <span>Stock:</span>
                    <span className="font-medium">{stock.symbol} - {stock.name}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Current Shares:</span>
                    <span className="font-medium">{stock.quantity}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Current Price:</span>
                    <span className="font-medium">KSh {stock.currentPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-1">
              <Label htmlFor="shares">Number of Shares to Buy</Label>
              <Input 
                id="shares" 
                type="number" 
                placeholder="Enter quantity" 
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)} 
                required
              />
              {amount && (
                <p className="text-sm text-muted-foreground mt-1">
                  Total cost: KSh {totalCost.toLocaleString()}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Tabs defaultValue="mpesa" className="w-full" onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
                  <TabsTrigger value="wallet">Wallet Balance</TabsTrigger>
                </TabsList>
                <TabsContent value="mpesa" className="space-y-4 pt-4">
                  <div className="space-y-1">
                    <Label htmlFor="phone">M-Pesa Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="e.g. 0712345678" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)} 
                      required
                    />
                  </div>
                </TabsContent>
                <TabsContent value="wallet" className="pt-4">
                  <div className="bg-muted p-3 rounded-md">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Available Balance:</span>
                      <span className="font-medium">KSh 250,000</span>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Funds will be deducted from your available balance.
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={resetAndClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
                Confirm Investment
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-900 rounded-md text-center">
              <div className="text-green-600 dark:text-green-400 text-lg font-semibold mb-1">
                Investment Successful
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                You have successfully invested in {amount} shares of {selectedStock.symbol}.
              </p>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Investment:</span>
                <span className="font-medium">{amount} shares of {selectedStock.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price Per Share:</span>
                <span className="font-medium">KSh {selectedStock.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-medium">KSh {totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-medium">{paymentMethod === 'mpesa' ? `M-Pesa (${phoneNumber})` : 'Wallet Balance'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-medium">INV{Math.floor(Math.random() * 1000000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="text-green-500 font-medium">Completed</span>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <Button onClick={resetAndClose} className="bg-teal-500 hover:bg-teal-600">
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InvestModal;
