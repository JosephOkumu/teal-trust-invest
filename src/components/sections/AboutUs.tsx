
import { Award, Users, Target, Globe } from 'lucide-react';

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

const AboutUs = () => {
  return (
    <section id="about" className="section">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-2xl border border-border">
              <img 
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=987" 
                alt="Kenyan Stock Market Team" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-teal-500/30 rounded-3xl blur-xl -z-1" />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 md:w-28 md:h-28 bg-teal-400/20 rounded-full blur-xl -z-1" />
            
            {/* Stats overlay */}
            <div className="absolute -bottom-10 -right-10 glass-card rounded-xl p-5 shadow-lg">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-medium border border-teal-500/20">
                About Us
              </span>
            </div>
            
            <h2>Transforming Stock Investment in Kenya</h2>
            
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
  );
};

export default AboutUs;
