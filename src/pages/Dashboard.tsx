
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
          
          {/* Main Dashboard Sections */}
          <div className="space-y-8">
            {/* Portfolio Overview Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-teal-500 dark:text-teal-400 flex items-center">
                <span className="mr-2">📊</span> Portfolio Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PortfolioSnapshot />
                <MarketSentiment />
              </div>
            </section>
            
            {/* AI Insights Section */}
            <section className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950/30 dark:to-blue-950/30 p-6 rounded-lg border border-teal-100 dark:border-teal-900">
              <h2 className="text-xl font-semibold mb-4 text-teal-500 dark:text-teal-400 flex items-center">
                <span className="mr-2">🤖</span> AI-Powered Insights
              </h2>
              <AiRecommendations />
            </section>
            
            {/* Active Investments Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-teal-500 dark:text-teal-400 flex items-center">
                <span className="mr-2">💼</span> Your Investments
              </h2>
              <ActivePositions />
            </section>
            
            {/* Activity & Alerts Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-teal-500 dark:text-teal-400 flex items-center">
                <span className="mr-2">🔔</span> Recent Activity
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                <AlertsActivity />
              </div>
            </section>
          </div>
        </div>
      </main>
      <AiAssistant />
      <Footer />
    </div>
  );
};

export default Dashboard;
