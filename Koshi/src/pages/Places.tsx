import { useState } from 'react';
import PlacesSection from '@/components/PlacesSection';

const Places = () => {
  const [selectedPlace, setSelectedPlace] = useState<string>('');

  return (
    <div className="min-h-screen bg-background">
      <PlacesSection 
        selectedPlace={selectedPlace} 
        onPlaceSelect={setSelectedPlace} 
      />
    </div>
  );
};

export default Places;