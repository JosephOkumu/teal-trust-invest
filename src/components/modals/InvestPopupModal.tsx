import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InvestPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: any; // Stock information from AI recommendations
}

const InvestPopupModal = ({ isOpen, onClose, stock }: InvestPopupModalProps) => {
  const [quantity, setQuantity] = useState('');
  const [instrumentType, setInstrumentType] = useState('normal');
  const [orderType, setOrderType] = useState('market');
  const [validity, setValidity] = useState('day');
  const [isIntraday, setIsIntraday] = useState(false);
  const [step, setStep] = useState(1);
  const [tradeAction, setTradeAction] = useState('buy');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const handleInvest = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your backend API
    console.log("Investment request:", { 
      stock, 
      quantity,
      instrumentType,
      orderType,
      validity,
      tradingMode: isIntraday ? 'intraday' : 'delivery'
    });
    
    // For demo, just move to confirmation step
    setStep(2);
  };
  
  const resetAndClose = () => {
    setQuantity('');
    setInstrumentType('normal');
    setOrderType('market');
    setValidity('day');
    setIsIntraday(false);
    setStep(1);
    onClose();
  };
  
  const totalCost = stock && quantity ? 
    Number(quantity) * stock.price : 0;
  
  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-teal-500" />
            {step === 1 ? (tradeAction === 'buy' ? "Buy Stock" : "Sell Stock") : "Trade Confirmation"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 
              ? "Invest in Kenyan stocks with instant processing"
              : "Your investment has been processed successfully"
            }
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 ? (
          <form onSubmit={handleInvest} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="stock-info">Security</Label>
              <div id="stock-info" className="p-3 bg-muted rounded-md text-sm">
                <div className="flex justify-between">
                  <span>Stock:</span>
                  <span className="font-medium">{stock?.symbol} - {stock?.name}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Current Price:</span>
                  <span className="font-medium">KSh {stock?.price?.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Buy/Sell Options */}
            <div className="mb-4">
              <Label>Trade Action</Label>
              <div className="flex items-center gap-2 p-0 rounded-md mt-1">
                <Button 
                  type="button"
                  variant="outline"
                  className={`flex-1 ${tradeAction === 'buy' ? 'bg-teal-100 dark:bg-teal-900 border-teal-500' : ''}`}
                  onClick={() => setTradeAction('buy')}
                >
                  Buy
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  className={`flex-1 ${tradeAction === 'sell' ? 'bg-teal-100 dark:bg-teal-900 border-teal-500' : ''}`}
                  onClick={() => setTradeAction('sell')}
                >
                  Sell
                </Button>
              </div>
            </div>
            
            {/* Row 1: Instrument Type and Quantity side by side */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="space-y-1">
                <Label htmlFor="instrument-type">Instrument Type</Label>
                <Select value={instrumentType} onValueChange={setInstrumentType}>
                  <SelectTrigger id="instrument-type">
                    <SelectValue placeholder="Select instrument type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="odd">Odd</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="quantity">Quantity</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  placeholder="Enter number of shares" 
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)} 
                  required
                />
              </div>
            </div>
            
            {quantity && (
              <p className="text-sm text-muted-foreground mb-4">
                Total {tradeAction === 'buy' ? 'cost' : 'value'}: KSh {totalCost.toLocaleString()}
              </p>
            )}
            
            {/* Row 2: Order Type and Price side by side */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="space-y-1">
                <Label htmlFor="order-type">Order Type</Label>
                <Select value={orderType} onValueChange={setOrderType}>
                  <SelectTrigger id="order-type">
                    <SelectValue placeholder="Select order type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market</SelectItem>
                    <SelectItem value="limit">Limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="price">Price</Label>
                <div id="price" className="p-3 bg-muted rounded-md text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">KSh {stock?.price?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Row 3: Validity and Trading Mode side by side */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="space-y-1">
                <Label htmlFor="validity">Validity</Label>
                <Select value={validity} onValueChange={setValidity}>
                  <SelectTrigger id="validity">
                    <SelectValue placeholder="Select validity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="otd">OTD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="trading-mode">Trading Mode</Label>
                <div className="flex items-center gap-2 p-0 rounded-md">
                  <Button 
                    type="button"
                    variant="outline"
                    className={`flex-1 ${!isIntraday ? 'bg-teal-100 dark:bg-teal-900 border-teal-500' : ''}`}
                    onClick={() => setIsIntraday(false)}
                  >
                    Delivery
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    className={`flex-1 ${isIntraday ? 'bg-teal-100 dark:bg-teal-900 border-teal-500' : ''}`}
                    onClick={() => setIsIntraday(true)}
                  >
                    Intraday
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Payment Method Options - Only shown for Buy */}
            {tradeAction === 'buy' && (
              <div className="space-y-2 mb-3">
                <Label>Payment Method</Label>
                <Tabs defaultValue="mpesa" className="w-full" onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
                    <TabsTrigger value="wallet">Hedera Wallet</TabsTrigger>
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
                        required={paymentMethod === 'mpesa'}
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
                        Funds will be deducted from your Hedera Wallet balance.
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
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
                {tradeAction === 'buy' ? 'Purchase Successful' : 'Sale Successful'}
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                You have successfully {tradeAction === 'buy' ? 'purchased' : 'sold'} {quantity} shares of {stock?.symbol}.
              </p>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Security:</span>
                <span className="font-medium">{stock?.symbol} - {stock?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trade Action:</span>
                <span className="font-medium">{tradeAction === 'buy' ? 'Buy' : 'Sell'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Instrument Type:</span>
                <span className="font-medium">{instrumentType === 'normal' ? 'Normal' : 'Odd'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quantity:</span>
                <span className="font-medium">{quantity} shares</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Type:</span>
                <span className="font-medium">{orderType === 'market' ? 'Market' : 'Limit'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price Per Share:</span>
                <span className="font-medium">KSh {stock?.price?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-medium">KSh {totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Validity:</span>
                <span className="font-medium">{validity === 'day' ? 'Day' : 'OTD'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trading Mode:</span>
                <span className="font-medium">{isIntraday ? 'Intraday' : 'Delivery'}</span>
              </div>
              {tradeAction === 'buy' && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-medium">{paymentMethod === 'mpesa' ? `M-Pesa (${phoneNumber})` : 'Hedera Wallet'}</span>
                </div>
              )}
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

export default InvestPopupModal;