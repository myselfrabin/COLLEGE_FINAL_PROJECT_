import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import WelcomeFeatures from '@/components/WelcomeFeatures';
import WeatherWidget from '@/components/WeatherWidget';
import QuickStats from '@/components/QuickStats';

const Index = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/places');
  };

  const handlePlanTrip = () => {
    navigate('/plan-trip');
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onExplore={handleExplore} onPlanTrip={handlePlanTrip} />
      <QuickStats />
      <WelcomeFeatures />
      <WeatherWidget />
    </div>
  );
};

export default Index;
