import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Mountain, Camera, Users } from 'lucide-react';

export default function QuickStats() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: MapPin,
      number: '14',
      label: 'Districts to Explore',
      color: 'text-blue-600'
    },
    {
      icon: Mountain,
      number: '8000+',
      label: 'Meter Peaks',
      color: 'text-green-600'
    },
    {
      icon: Camera,
      number: '50+',
      label: 'Photo Spots',
      color: 'text-purple-600'
    },
    {
      icon: Users,
      number: '15M+',
      label: 'Visitors Yearly',
      color: 'text-orange-600'
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container-responsive">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Koshi Pradesh at a Glance
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the numbers that make our region extraordinary
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="card-hover text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-background flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}