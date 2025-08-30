import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-koshi.jpg';
import sandakpurImage from '@/assets/sandakpur.jpg';
import everestImage from '@/assets/everest.jpg';
import everestImage1 from '@/assets/everest.jpg';

interface HeroProps {
  onExplore: () => void;
  onPlanTrip: () => void;
}

export default function Hero({ onExplore, onPlanTrip }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${everestImage1})` }}
      >
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto section-padding">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {t('hero.title')}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            onClick={onExplore}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
          >
            {t('hero.exploreButton')}
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={onPlanTrip}
            className="border-2 border-none text-primary px-8 py-3 text-lg font-semibold"
          >
            {t('hero.planButton')}
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}