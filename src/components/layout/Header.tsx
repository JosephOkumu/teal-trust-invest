
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Sun, Moon, Bell, User, BarChart, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme/theme-provider';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  isLoggedIn?: boolean;
}

const Header = ({ isLoggedIn = false }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    setShowNotifications(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path || (location.hash && location.hash === path);
  };

  // Dummy notifications data - would come from API
  const notifications = [
    { id: 1, text: "Your EABL investment grew by 4.2% today", time: "2 hours ago" },
    { id: 2, text: "New AI recommendation: Consider investing in Safaricom", time: "5 hours ago" },
    { id: 3, text: "Withdrawal to M-Pesa successful", time: "Yesterday" },
    { id: 4, text: "Market alert: NSE index up by 1.8%", time: "Yesterday" },
    { id: 5, text: "Your account was logged in from a new device", time: "2 days ago" },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4',
        isScrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center space-x-2 text-foreground">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 flex items-center justify-center">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">KenyaStocks</span>
        </Link>

        {/* Desktop Navigation - Different based on login state */}
        {!isLoggedIn ? (
          // Not logged in - landing page navigation
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className={cn('nav-link', isActive('#about') && 'active')}>
              About Us
            </a>
            <a href="#how-it-works" className={cn('nav-link', isActive('#how-it-works') && 'active')}>
              How It Works
            </a>
            <Link to="/signin" className={cn('nav-link', isActive('/signin') && 'active')}>
              Sign In
            </Link>
            <Link to="/register">
              <Button className="btn-primary rounded-full px-6">Get Started</Button>
            </Link>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
        ) : (
          // Logged in - dashboard navigation
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className={cn('nav-link flex items-center gap-1', isActive('/dashboard') && 'active')}>
              <BarChart size={18} />
              <span>Overview</span>
            </Link>
            <Link to="/investments" className={cn('nav-link flex items-center gap-1', isActive('/investments') && 'active')}>
              <Layers size={18} />
              <span>Your Investments</span>
            </Link>
            <Link to="/invest" className={cn('nav-link flex items-center gap-1', isActive('/invest') && 'active')}>
              <BarChart size={18} />
              <span>Invest</span>
            </Link>
            
            {/* Notifications Dropdown */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative" 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                }}
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-card rounded-lg shadow-lg overflow-hidden z-50 border border-border">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold text-lg">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className="p-4 border-b border-border hover:bg-muted/50 transition-colors">
                        <p className="text-sm mb-1">{notification.text}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center">
                    <Button variant="link" size="sm">View All Notifications</Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full border border-muted">
                  <User size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="flex w-full">Profile Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/security" className="flex w-full">Security</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Link to="/signin" className="flex w-full">Log Out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
        )}

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          {isLoggedIn && (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative" 
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full border border-muted">
                    <User size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex w-full">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/security" className="flex w-full">Security</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Link to="/signin" className="flex w-full">Log Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground p-2 rounded-md hover:bg-secondary/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Adjusted based on login state */}
      <div
        className={cn(
          'fixed inset-0 top-[72px] bg-background/95 backdrop-blur-sm md:hidden transition-transform duration-300 ease-in-out z-40',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col items-center pt-10 space-y-8 text-lg">
          {!isLoggedIn ? (
            // Not logged in navigation
            <>
              <a href="#about" className={cn('nav-link text-xl', isActive('#about') && 'active')}>
                About Us
              </a>
              <a href="#how-it-works" className={cn('nav-link text-xl', isActive('#how-it-works') && 'active')}>
                How It Works
              </a>
              <Link to="/signin" className={cn('nav-link text-xl', isActive('/signin') && 'active')}>
                Sign In
              </Link>
              <Link to="/register">
                <Button className="btn-primary rounded-full px-8 py-6 text-xl">Get Started</Button>
              </Link>
            </>
          ) : (
            // Logged in navigation
            <>
              <Link to="/dashboard" className={cn('nav-link text-xl flex items-center gap-2', isActive('/dashboard') && 'active')}>
                <BarChart size={20} />
                <span>Overview</span>
              </Link>
              <Link to="/investments" className={cn('nav-link text-xl flex items-center gap-2', isActive('/investments') && 'active')}>
                <Layers size={20} />
                <span>Your Investments</span>
              </Link>
              <Link to="/invest" className={cn('nav-link text-xl flex items-center gap-2', isActive('/invest') && 'active')}>
                <BarChart size={20} />
                <span>Invest</span>
              </Link>
              <Link to="/profile" className={cn('nav-link text-xl', isActive('/profile') && 'active')}>
                Profile Settings
              </Link>
              <Link to="/signin">
                <Button variant="destructive" className="px-8 py-6 text-xl">Log Out</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
      
      {/* Mobile Notifications Panel */}
      {isLoggedIn && showNotifications && (
        <div className="fixed inset-0 top-[72px] bg-background/95 backdrop-blur-sm md:hidden z-40 p-4">
          <div className="bg-card rounded-lg shadow-lg border border-border">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-lg">Notifications</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowNotifications(false)}>
                <X size={20} />
              </Button>
            </div>
            <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
              {notifications.map(notification => (
                <div key={notification.id} className="p-4 border-b border-border">
                  <p className="text-sm mb-1">{notification.text}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              ))}
            </div>
            <div className="p-2 text-center">
              <Button variant="link" size="sm">View All Notifications</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
