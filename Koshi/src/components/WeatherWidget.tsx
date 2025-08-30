import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Thermometer, 
  Wind, 
  Eye,
  Droplets,
  MapPin
} from 'lucide-react';

export default function WeatherWidget() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock weather data for different cities in Koshi Pradesh
  const weatherData = [
    {
      city: 'Dharan',
      temperature: 24,
      condition: 'Sunny',
      humidity: 65,
      windSpeed: 8,
      visibility: 10,
      icon: Sun,
      color: 'text-yellow-500'
    },
    {
      city: 'Biratnagar',
      temperature: 28,
      condition: 'Partly Cloudy',
      humidity: 70,
      windSpeed: 12,
      visibility: 8,
      icon: Cloud,
      color: 'text-blue-500'
    },
    {
      city: 'Ilam',
      temperature: 18,
      condition: 'Light Rain',
      humidity: 85,
      windSpeed: 15,
      visibility: 6,
      icon: CloudRain,
      color: 'text-blue-600'
    }
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="container-responsive">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Current Weather & Time
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time weather updates across major cities in Koshi Pradesh
          </p>
        </div>

        {/* Current Time Display */}
        <div className="text-center mb-12">
          <Card className="max-w-md mx-auto border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-3xl font-mono font-bold mb-2">
                {formatTime(currentTime)}
              </div>
              <div className="text-muted-foreground">
                {formatDate(currentTime)}
              </div>
              <Badge variant="secondary" className="mt-2">
                Nepal Standard Time (NST)
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Weather Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {weatherData.map((weather, index) => (
            <Card key={index} className="card-hover border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <CardTitle className="text-lg">{weather.city}</CardTitle>
                  </div>
                  <weather.icon className={`w-8 h-8 ${weather.color}`} />
                </div>
                <CardDescription>{weather.condition}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-1">
                      {weather.temperature}°C
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <Droplets className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                      <div className="text-muted-foreground text-xs">Humidity</div>
                      <div className="font-semibold">{weather.humidity}%</div>
                    </div>
                    <div className="text-center">
                      <Wind className="w-4 h-4 text-gray-500 mx-auto mb-1" />
                      <div className="text-muted-foreground text-xs">Wind</div>
                      <div className="font-semibold">{weather.windSpeed} km/h</div>
                    </div>
                    <div className="text-center">
                      <Eye className="w-4 h-4 text-green-500 mx-auto mb-1" />
                      <div className="text-muted-foreground text-xs">Visibility</div>
                      <div className="font-semibold">{weather.visibility} km</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Weather data updates every 30 minutes • Last updated: {formatTime(currentTime)}
          </p>
        </div>
      </div>
    </section>
  );
}