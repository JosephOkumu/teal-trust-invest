
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Clock, ArrowDownUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AlertsActivity = () => {
  // Dummy data - would come from API
  const [alerts, setAlerts] = useState([
    { 
      id: 1, 
      type: 'price', 
      title: 'Safaricom crossed your target price',
      description: 'SCOM reached KSh 32.50, above your alert of KSh 32.00',
      time: '15 min ago',
      isRead: false
    },
    { 
      id: 2, 
      type: 'ai', 
      title: 'New AI recommendation',
      description: 'Our AI suggests considering BAT Kenya based on recent performance',
      time: '2 hours ago',
      isRead: true
    },
    { 
      id: 3, 
      type: 'news', 
      title: 'Market news affecting your portfolio',
      description: 'Kenya\'s inflation rate drops to 4.9%, potentially good for equities',
      time: 'Today',
      isRead: false
    }
  ]);

  const [activities, setActivities] = useState([
    { 
      id: 1, 
      type: 'buy', 
      title: 'Purchased Safaricom',
      description: '200 shares at KSh 31.25 per share',
      time: 'Today at 10:32 AM'
    },
    { 
      id: 2, 
      type: 'withdraw', 
      title: 'Withdrawal to M-Pesa',
      description: 'KSh 15,000 to +254 712 345 678',
      time: 'Yesterday at 3:45 PM'
    },
    { 
      id: 3, 
      type: 'deposit', 
      title: 'Deposit from M-Pesa',
      description: 'KSh 50,000 from +254 712 345 678',
      time: 'May 15, 2023 at 9:12 AM'
    }
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-teal-500 dark:text-teal-400">Alerts & Activity</CardTitle>
        <CardDescription>Important updates and recent transactions</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="alerts">
          <TabsList className="w-full grid grid-cols-2 rounded-none border-b">
            <TabsTrigger value="alerts" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-teal-500">
              Alerts
            </TabsTrigger>
            <TabsTrigger value="activity" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-teal-500">
              Recent Activity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="alerts" className="m-0">
            <div className="divide-y divide-border">
              {alerts.map(alert => (
                <div 
                  key={alert.id} 
                  className={`p-4 hover:bg-muted/50 transition-colors ${!alert.isRead ? 'bg-muted/20' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Bell className="h-5 w-5 text-teal-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${!alert.isRead ? 'text-teal-600 dark:text-teal-400' : ''}`}>
                        {alert.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {alert.time}
                      </div>
                    </div>
                    {!alert.isRead && (
                      <div className="h-2 w-2 rounded-full bg-teal-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="m-0">
            <div className="divide-y divide-border">
              {activities.map(activity => (
                <div 
                  key={activity.id} 
                  className="p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <ArrowDownUp className={`h-5 w-5 ${
                        activity.type === 'buy' 
                          ? 'text-green-500' 
                          : activity.type === 'withdraw' 
                            ? 'text-red-500' 
                            : 'text-blue-500'
                      }`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{activity.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t border-border py-3 justify-center">
        <Button variant="link" size="sm" className="text-teal-500">
          View All
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AlertsActivity;
