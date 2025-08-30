import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Clock, 
  MapPin,
  Thermometer,
  CloudRain
} from 'lucide-react';

export default function TravelUpdatesSection() {
  const { t } = useTranslation();

  const updates = [
    {
      id: 1,
      type: 'alert',
      severity: 'high',
      title: 'Monsoon Season Alert',
      location: 'Eastern Hills (Ilam, Panchthar)',
      description: 'Heavy rainfall expected. Some trekking routes may be temporarily closed.',
      timestamp: '2 hours ago',
      icon: CloudRain
    },
    {
      id: 2,
      type: 'info',
      severity: 'medium',
      title: 'Festival Season Traffic',
      location: 'Dharan City Center',
      description: 'Increased traffic expected during Dashain festival. Plan extra travel time.',
      timestamp: '5 hours ago',
      icon: Info
    },
    {
      id: 3,
      type: 'success',
      severity: 'low',
      title: 'New Trail Opens',
      location: 'Kanchenjunga Conservation Area',
      description: 'Alternative trekking route to base camp now accessible with proper permits.',
      timestamp: '1 day ago',
      icon: CheckCircle
    },
    {
      id: 4,
      type: 'warning',
      severity: 'medium',
      title: 'Road Maintenance',
      location: 'Dharan-Dhankuta Highway',
      description: 'Road repair work in progress. Expect delays between 10 AM - 4 PM.',
      timestamp: '2 days ago',
      icon: AlertTriangle
    }
  ];

  const weatherUpdates = [
    {
      location: 'Dharan',
      temperature: '24°C',
      condition: 'Partly Cloudy',
      humidity: '68%'
    },
    {
      location: 'Ilam',
      temperature: '18°C',
      condition: 'Foggy',
      humidity: '85%'
    },
    {
      location: 'Koshi Tappu',
      temperature: '27°C',
      condition: 'Clear',
      humidity: '62%'
    }
  ];

  const getUpdateColor = (type: string, severity: string) => {
    if (type === 'alert' && severity === 'high') return 'border-red-200 bg-red-50';
    if (type === 'warning') return 'border-yellow-200 bg-yellow-50';
    if (type === 'success') return 'border-green-200 bg-green-50';
    return 'border-blue-200 bg-blue-50';
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'alert': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'success': return 'text-green-500';
      default: return 'text-blue-500';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  return (
    <section className="py-16 bg-muted/50">
      <div className="container-responsive">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('nav.travelUpdates')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed about current conditions, road status, and important announcements
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Travel Updates */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Latest Updates</h3>
            <div className="space-y-4">
              {updates.map((update) => (
                <Alert key={update.id} className={getUpdateColor(update.type, update.severity)}>
                  <div className="flex items-start gap-4">
                    <update.icon className={`w-5 h-5 mt-0.5 ${getIconColor(update.type)}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <AlertTitle className="text-lg">{update.title}</AlertTitle>
                        {getSeverityBadge(update.severity)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        {update.location}
                        <Clock className="w-4 h-4 ml-2" />
                        {update.timestamp}
                      </div>
                      <AlertDescription className="text-base">
                        {update.description}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </div>

          {/* Weather & Quick Info */}
          <div className="space-y-6">
            {/* Current Weather */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-primary" />
                  Current Weather
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weatherUpdates.map((weather, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-semibold">{weather.location}</p>
                        <p className="text-sm text-muted-foreground">{weather.condition}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">{weather.temperature}</p>
                        <p className="text-xs text-muted-foreground">{weather.humidity} humidity</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold">Tourist Police</p>
                    <p className="text-muted-foreground">+977-1-4247041</p>
                  </div>
                  <div>
                    <p className="font-semibold">Medical Emergency</p>
                    <p className="text-muted-foreground">102</p>
                  </div>
                  <div>
                    <p className="font-semibold">Disaster Helpline</p>
                    <p className="text-muted-foreground">1115</p>
                  </div>
                  <div>
                    <p className="font-semibold">Koshi Pradesh Tourism Office</p>
                    <p className="text-muted-foreground">+977-21-123456</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Travel Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Carry valid identification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Check weather before trekking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Inform locals of your plans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Respect local customs</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}