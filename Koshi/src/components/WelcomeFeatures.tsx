import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Compass,
  Calendar,
  Users,
  Clock,
  ArrowRight,
  Star
} from 'lucide-react';

export default function WelcomeFeatures() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Compass,
      title: 'Personal Travel Guide',
      description: 'Get AI-powered recommendations tailored to your interests and travel style',
      color: 'bg-blue-500',
      badge: 'NEW'
    },
    {
      icon: Calendar,
      title: 'Festival Calendar',
      description: 'Never miss local festivals and cultural events happening during your visit',
      color: 'bg-purple-500',
      badge: 'POPULAR'
    },
    {
      icon: Users,
      title: 'Local Connections',
      description: 'Connect with verified local guides and fellow travelers',
      color: 'bg-green-500',
      badge: 'TRUSTED'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Live weather, road conditions, and travel advisories',
      color: 'bg-indigo-500',
      badge: 'LIVE'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container-responsive">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to Your Adventure Hub
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover exclusive features designed to make your Koshi Pradesh journey unforgettable.
            From personalized recommendations to local insider tips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="group card-hover border-0 shadow-md hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full group/btn justify-start"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-auto transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <Star className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Start Your Journey Today</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of travelers who have discovered the magic of Koshi Pradesh.
              Get personalized recommendations and insider access to hidden gems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Create Free Account
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
