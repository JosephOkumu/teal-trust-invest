
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PortfolioSnapshot from "@/components/dashboard/PortfolioSnapshot";
import AiRecommendations from "@/components/dashboard/AiRecommendations";
import ActivePositions from "@/components/dashboard/ActivePositions";
import MarketSentiment from "@/components/dashboard/MarketSentiment";
import AlertsActivity from "@/components/dashboard/AlertsActivity";
import AiAssistant from "@/components/common/AiAssistant";

const Dashboard = () => {
  // State to track if user is authenticated - this will be replaced with actual auth logic
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  // Simulate checking authentication
  useEffect(() => {
    // This would be replaced with actual auth check
    // Example: const authStatus = checkAuthStatus();
    // setIsAuthenticated(authStatus);
    console.log("Checking authentication status...");
    // For demo purposes, we'll assume the user is authenticated
  }, []);

  if (!isAuthenticated) {
    // This would redirect to login in a real app
    // window.location.href = "/signin";
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn={true} />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-teal-500 dark:text-teal-400">
            Dashboard Overview
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PortfolioSnapshot />
            <AiRecommendations />
          </div>
          
          <div className="mt-8">
            <ActivePositions />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <MarketSentiment />
            <AlertsActivity />
          </div>
        </div>
      </main>
      <AiAssistant />
      <Footer />
    </div>
  );
};

export default Dashboard;
