
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        setIsLoading(false);
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        // Redirect to the dashboard
        window.location.href = "/dashboard";
      } else {
        const errorText = await response.text();
        setIsLoading(false);
        toast({
          title: "Sign-in failed",
          description: errorText,
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during sign-in:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="rounded-xl border border-border bg-background p-8 shadow-sm max-w-md w-full mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-muted-foreground">Sign in to continue to your account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full btn-primary rounded-lg py-6 text-base"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
