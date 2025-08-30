import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PlanTripSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    duration: '',
    groupSize: '',
    activities: '',
    budget: '',
    travelDate: '',
    specialRequests: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/trip-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to submit');
      toast({
        title: 'Trip Inquiry Submitted!',
        description: "We'll contact you within 24 hours with a customized itinerary.",
      });
      setFormData({
        name: '', email: '', phone: '', destination: '', duration: '',
        groupSize: '', activities: '', budget: '', travelDate: '', specialRequests: ''
      });
    } catch (err) {
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your trip request. Please try again.',
        variant: 'destructive',
      });
    }
  };


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const tripPackages = [
    {
      title: "Adventure Explorer",
      duration: "7-10 days",
      highlights: ["Trekking", "Rafting", "Camping"],
      price: "Starting from रु800",
      description: "Perfect for adventure enthusiasts seeking thrills"
    },
    {
      title: "Cultural Heritage",
      duration: "5-7 days",
      highlights: ["Temples", "Festivals", "Local Culture"],
      price: "Starting from रु.500",
      description: "Immerse yourself in local traditions and culture"
    },
    {
      title: "Nature & Wildlife",
      duration: "4-6 days",
      highlights: ["Wildlife Safari", "Bird Watching", "Nature Walks"],
      price: "Starting from रु.600",
      description: "Discover the rich biodiversity of Koshi Pradesh"
    },
    {
      title: "Family Friendly",
      duration: "5-8 days",
      highlights: ["Easy Hikes", "Sightseeing", "Cultural Sites"],
      price: "Starting from रु.400",
      description: "Comfortable trips suitable for all family members"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container-responsive">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('nav.planTrip')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let us help you create the perfect itinerary for your Koshi Pradesh adventure
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Trip Planning Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Plan Your Custom Trip
                </CardTitle>
                <CardDescription>
                  Fill out this form and we'll create a personalized itinerary for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="travelDate">Preferred Travel Date</Label>
                      <Input
                        id="travelDate"
                        type="date"
                        value={formData.travelDate}
                        onChange={(e) => handleInputChange('travelDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="destination">Preferred Destination</Label>
                      <Select onValueChange={(value) => handleInputChange('destination', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dharan">Dharan</SelectItem>
                          <SelectItem value="ilam">Ilam</SelectItem>
                          <SelectItem value="koshi-tappu">Koshi Tappu</SelectItem>
                          <SelectItem value="kanchenjunga">Kanchenjunga Base Camp</SelectItem>
                          <SelectItem value="makalu">Makalu Barun</SelectItem>
                          <SelectItem value="multiple">Multiple Destinations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="duration">Trip Duration</Label>
                      <Select onValueChange={(value) => handleInputChange('duration', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-3">1-3 days</SelectItem>
                          <SelectItem value="4-7">4-7 days</SelectItem>
                          <SelectItem value="8-14">1-2 weeks</SelectItem>
                          <SelectItem value="15+">More than 2 weeks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="groupSize">Group Size</Label>
                      <Select onValueChange={(value) => handleInputChange('groupSize', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Number of travelers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Solo Traveler</SelectItem>
                          <SelectItem value="2">Couple</SelectItem>
                          <SelectItem value="3-5">Small Group (3-5)</SelectItem>
                          <SelectItem value="6-10">Medium Group (6-10)</SelectItem>
                          <SelectItem value="10+">Large Group (10+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget Range (NPR)</Label>
                      <Select onValueChange={(value) => handleInputChange('budget', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<500">Under रु.500</SelectItem>
                          <SelectItem value="500-1000">रु.500 - रु.1,000</SelectItem>
                          <SelectItem value="1000-2000">रु.1,000 - रु.2,000</SelectItem>
                          <SelectItem value="2000+">रु.2,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="activities">Preferred Activities</Label>
                    <Input
                      id="activities"
                      placeholder="e.g., trekking, cultural tours, wildlife safari"
                      value={formData.activities}
                      onChange={(e) => handleInputChange('activities', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Special Requests or Requirements</Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Any dietary restrictions, accessibility needs, or special interests..."
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Trip Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Pre-planned Packages */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Popular Trip Packages</h3>
            <div className="space-y-4">
              {tripPackages.map((pkg, index) => (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{pkg.title}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {pkg.duration}
                      </div>
                    </div>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {pkg.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            <CheckCircle className="w-3 h-3" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">{pkg.price}</span>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}