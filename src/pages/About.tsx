import { Award, Users, Target, Globe } from 'lucide-react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const stats = [
  {
    icon: <Users className="h-6 w-6 text-teal-500" />,
    value: "10,000+",
    label: "Active Users"
  },
  {
    icon: <Award className="h-6 w-6 text-teal-500" />,
    value: "5+",
    label: "Years Experience"
  },
  {
    icon: <Target className="h-6 w-6 text-teal-500" />,
    value: "99.9%",
    label: "Uptime"
  },
  {
    icon: <Globe className="h-6 w-6 text-teal-500" />,
    value: "24/7",
    label: "Support"
  }
];

const About = () => {
  return (
    <div className="min-h-screen">
    <Header />
      <main>
        <section className="section">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-block">
                <span className="px-2 py-2 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium border border-teal-500/20">
                  About Us
                </span>
              </div>
              <h1 className="mt-6 mb-4 text-4xl font-bold">Our Story</h1>
              <p className="text-muted-foreground text-lg">
                Learn about our mission to transform stock investment in Kenya
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative z-10 overflow-hidden rounded-2xl border border-border">
                  <img 
                    src="/kenyantrader.png" 
                    alt="Kenyan Stock Market Team" 
                    className="w-full h-auto"
                  />
                </div>
              
              <div className="space-y-8">
                <p className="text-muted-foreground">
                  Founded by a team of Kenyan financial experts and technology innovators, KenyaStocks 
                  is revolutionizing the way Kenyans invest in the stock market. We identified the 
                  key barriers preventing ordinary citizens from participating in wealth creation 
                  through stock ownership - complexity, high fees, and lack of guidance.
                </p>
                
                <p className="text-muted-foreground">
                  Our mission is to democratize access to the Kenyan stock market by combining 
                  cutting-edge technology with user-friendly design. By leveraging AI for investment 
                  analysis and Hedera blockchain for security, we've created a platform that makes 
                  stock investing simple, affordable, and accessible to all Kenyans.
                </p>
                
                <p className="text-muted-foreground">
                  We believe that financial growth should be accessible to everyone, regardless of 
                  their background or experience level. Our team is dedicated to providing the tools, 
                  education, and support needed to help Kenyans build wealth through smart stock 
                  market investing.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
        <Footer />
    </div>
  );
};

export default About;