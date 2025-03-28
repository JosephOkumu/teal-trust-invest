
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, UserCircle, Bell, X, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Header = ({ isLoggedIn = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-50 border-b py-3">
      <div className="container-custom mx-auto flex justify-between items-center">
        {/* Logo - left side */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-teal-500 dark:text-teal-400">
            KenyaStocks
          </Link>
        </div>

        {/* Mobile menu button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        )}

        {/* Desktop Navigation - center */}
        {!isMobile && (
          <nav className="flex-1 flex justify-center">
            <ul className="flex space-x-8">
              {!isLoggedIn ? (
                <>
                  <li>
                    <Link to="/" className="text-sm font-medium hover:text-teal-500 transition-colors duration-200">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-sm font-medium hover:text-teal-500 transition-colors duration-200">
                      About
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/dashboard" className="text-sm font-medium hover:text-teal-500 transition-colors duration-200">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/investments" className="text-sm font-medium hover:text-teal-500 transition-colors duration-200">
                      Your Investments
                    </Link>
                  </li>
                  <li>
                    <Link to="/invest" className="text-sm font-medium hover:text-teal-500 transition-colors duration-200">
                      Invest
                    </Link>
                  </li>
                  <li>
                    <Link to="/wallet" className="text-sm font-medium hover:text-teal-500 transition-colors duration-200">
                      Wallet
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}

        {/* Right side - buttons */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {!isLoggedIn ? (
            <>
              <Link to="/signin">
                <Button variant="ghost" size={isMobile ? "sm" : "default"}>
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size={isMobile ? "sm" : "default"}>
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="icon"
                asChild
              >
                <Link to="/wallet">
                  <WalletCards className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/signout" className="w-full">Sign out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <nav className="container-custom py-4">
            <ul className="space-y-3">
              {!isLoggedIn ? (
                <>
                  <li>
                    <Link to="/" className="block text-sm font-medium hover:text-teal-500" onClick={toggleMenu}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="block text-sm font-medium hover:text-teal-500" onClick={toggleMenu}>
                      About
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/dashboard" className="block text-sm font-medium hover:text-teal-500" onClick={toggleMenu}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/investments" className="block text-sm font-medium hover:text-teal-500" onClick={toggleMenu}>
                      Your Investments
                    </Link>
                  </li>
                  <li>
                    <Link to="/invest" className="block text-sm font-medium hover:text-teal-500" onClick={toggleMenu}>
                      Invest
                    </Link>
                  </li>
                  <li>
                    <Link to="/wallet" className="block text-sm font-medium hover:text-teal-500" onClick={toggleMenu}>
                      Wallet
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
