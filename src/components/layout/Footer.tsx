
import { Link } from 'react-router-dom';
import { Github, Twitter, Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-foreground">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="font-bold text-xl">Teal Trust</span>
            </div>
            <p className="text-muted-foreground">
              Revolutionizing stock trading in Kenya with AI-powered insights and blockchain security.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Github">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a></li>
              <li><Link to="/register" className="text-muted-foreground hover:text-foreground transition-colors">Get Started</Link></li>
              <li><Link to="/signin" className="text-muted-foreground hover:text-foreground transition-colors">Sign In</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Stock Market Basics</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Investment Strategies</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Market Insights</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">News & Updates</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin size={18} className="text-primary" />
                <span className="text-muted-foreground">Nairobi, Kenya</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-primary" />
                <span className="text-muted-foreground">+254 700 123 456</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-primary" />
                <span className="text-muted-foreground">hello@kenyastocks.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} KenyaStocks. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
