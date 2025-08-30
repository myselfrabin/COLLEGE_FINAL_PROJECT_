import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Camera, Utensils, Compass } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import FamousNearPlaces from './FamousNearPlaces';
import DharanMap from './DharanMap';
import IllamMap from './IllamMap';
import KoshiTappuMap from './KoshiTappuMap';
import KanchenjungaMap from './KanchenjungaMap';
import PanchtharMap from './PanchtharMap';
import BasantapurMap from './BasantapurMap';
import HalasiMahadevMap from './HalasiMahadevMap';
import BhojpurMap from './BhojpurMap';
import TaplejungMap from './TaplejungMap';

import dharanImage from '@/assets/places/dharan_clock_tower.jpg';
import ilamImage from '@/assets/places/ilam.jpg';
import koshiTappuImage from '@/assets/places/koshi-tappu.jpg';
import kanchenjungaImage from '@/assets/places/kanchenjunga.jpg';
import basantapurImage from '@/assets/places/basantapur.png';
import halesiImage from '@/assets/places/halesi cave.jpeg';
import bhojpurImage from '@/assets/places/bhojpur.webp';
import panchtharImage from '@/assets/places/pachthar.jpg';
import taplejungImage from '@/assets/places/taplejung.jpg';

const placeData = {
  dharan: {
    key: 'dharan',
    nameKey: 'places.dharan.name',
    image: dharanImage,
    category: 'City',
  },
  ilam: {
    key: 'ilam',
    nameKey: 'places.ilam.name',
    image: ilamImage,
    category: 'Hill Station',
  },
  koshiTappu: {
    key: 'koshiTappu',
    nameKey: 'places.koshiTappu.name',
    image: koshiTappuImage,
    category: 'Wildlife Reserve',
  },
  kanchenjunga: {
    key: 'kanchenjunga',
    nameKey: 'places.Kanchenjunga.name',
    image: kanchenjungaImage,
    category: 'Trekking',
  },
  panchthar: {
    key: 'panchthar',
    nameKey: 'places.panchthar.name',
    image: panchtharImage,
    category: 'Hill District',
  },
  basantapur: {
    key: 'basantapur',
    nameKey: 'places.basantapur.name',
    image: basantapurImage,
    category: 'Tourist Spot',
  },
  halasiMahadev: {
    key: 'halasiMahadev',
    nameKey: 'places.halasiMahadev.name',
    image: halesiImage,
    category: 'Religious Site',
  },
  bhojpur: {
    key: 'bhojpur',
    nameKey: 'places.bhojpur.name',
    image: bhojpurImage,
    category: 'Town',
  },
  taplejung: {
    key: 'taplejung',
    nameKey: 'places.taplejung.name',
    image: taplejungImage,
    category: 'Mountain Region',
  },
};


export default function PlaceDetails() {
  const { t } = useTranslation();
  const { placeKey } = useParams();
  const navigate = useNavigate();
  
  const place = placeData[placeKey as keyof typeof placeData];
  
  if (!place) {
    return (
      <section className="py-16 text-center">
        <p className="text-xl">Place not found.</p>
        <Button className="mt-4" onClick={() => navigate('/')}>← Back to Home</Button>
      </section>
    );
  }
  
  const showFamousNearPlaces = placeKey === 'dharan' || placeKey === 'ilam';

  return (
    <section className="py-16 bg-background">
      <div className="container-responsive">
        <Button variant="ghost" onClick={() => navigate('/places')} className="mb-8">
          ← Back to Places
        </Button>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={place.image}
              alt={t(place.nameKey)}
              className="w-full h-96 object-cover rounded-lg shadow-large"
            />
            {(placeKey === 'dharan' || placeKey === 'ilam' || placeKey === 'koshiTappu' || placeKey === 'kanchenjunga' || placeKey === 'panchthar' || placeKey === 'basantapur' || placeKey === 'halasiMahadev' || placeKey === 'bhojpur' || placeKey === 'taplejung') && (
              <div className="mt-6 w-full">
                {placeKey === 'dharan' && <DharanMap />}
                {placeKey === 'ilam' && <IllamMap />}
                {placeKey === 'koshiTappu' && <KoshiTappuMap />}
                {placeKey === 'kanchenjunga' && <KanchenjungaMap />}
                {placeKey === 'panchthar' && <PanchtharMap />}
                {placeKey === 'basantapur' && <BasantapurMap />}
                {placeKey === 'halasiMahadev' && <HalasiMahadevMap />}
                {placeKey === 'bhojpur' && <BhojpurMap />}
                {placeKey === 'taplejung' && <TaplejungMap />}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{place.category}</Badge>
              <h1 className="text-4xl font-bold mb-4">{t(place.nameKey)}</h1>
              <p className="text-xl text-muted-foreground mb-6">
                {t(`places.${place.key}.intro`, 'This is a demo description of the place.')}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">How to Reach</h3>
                  <p className="text-muted-foreground">{t(`places.${place.key}.howToReach`, 'Demo transport details.')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Camera className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Culture</h3>
                  <p className="text-muted-foreground">{t(`places.${place.key}.culture`, 'Demo cultural info.')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Utensils className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Food</h3>
                  <p className="text-muted-foreground">{t(`places.${place.key}.food`, 'Demo food details.')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Compass className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Hidden Destinations</h3>
                  <p className="text-muted-foreground">{t(`places.${place.key}.hiddenDestinations`, 'Demo hidden places.')}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="flex-1" onClick={() => navigate('/plan-trip')}>
                Plan Visit
              </Button>
            </div>
          </div>
        </div>

         {/* Conditionally render FamousNearPlaces */}
        {showFamousNearPlaces && (
          <div className="mt-16">
            <FamousNearPlaces placeKey={placeKey} />
          </div>
        )}
      </div>
    </section>
  );
}
