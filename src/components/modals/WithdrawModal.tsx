
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, ArrowRight } from 'lucide-react';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: any;
}

const WithdrawModal = ({ isOpen, onClose, stock }: WithdrawModalProps) => {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState(1);
  
  if (!stock) return null;
  
  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your backend API
    console.log("Withdraw request:", { stock, amount, phoneNumber });
    
    // For demo, just move to confirmation step
    setStep(2);
    
    // In a real app, you would call your API and handle the response
    // then show confirmation or error
  };
  
  const resetAndClose = () => {
    setAmount('');
    setPhoneNumber('');
    setStep(1);
    onClose();
  };
  
  const totalValue = stock ? 
    Number(amount) * stock.currentPrice : 0;
  
  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-teal-500" />
            {step === 1 ? "Withdraw Investment" : "Withdrawal Confirmation"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 
              ? `Withdraw your ${stock?.symbol} investment to M-Pesa.` 
              : "Your withdrawal has been processed."}
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 ? (
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="stock-info">Investment</Label>
              <div id="stock-info" className="p-3 bg-muted rounded-md text-sm">
                <div className="flex justify-between">
                  <span>Stock:</span>
                  <span className="font-medium">{stock?.symbol} - {stock?.name}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Quantity:</span>
                  <span className="font-medium">{stock?.quantity} shares</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Current Value:</span>
                  <span className="font-medium">KSh {(stock?.quantity * stock?.currentPrice).toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="shares">Shares to Withdraw</Label>
              <Input 
                id="shares" 
                type="number" 
                placeholder="Number of shares" 
                min="1"
                max={stock?.quantity}
                value={amount}
                onChange={(e) => setAmount(e.target.value)} 
                required
              />
              {amount && (
                <p className="text-sm text-muted-foreground mt-1">
                  Approximate value: KSh {totalValue.toLocaleString()}
                </p>
              )}
            </div>
            
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
            
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={resetAndClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
                Withdraw Funds
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-900 rounded-md text-center">
              <div className="text-green-600 dark:text-green-400 text-lg font-semibold mb-1">
                Withdrawal Initiated
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your withdrawal request for {amount} shares of {stock?.symbol} has been processed. Funds will be sent to your M-Pesa account.
              </p>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">KSh {totalValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">M-Pesa Number:</span>
                <span className="font-medium">{phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-medium">WD{Math.floor(Math.random() * 1000000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="text-orange-500 font-medium">Processing</span>
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

export default WithdrawModal;
