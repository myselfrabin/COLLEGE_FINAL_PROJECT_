import { useState } from 'react';
import ActivitiesSection from '@/components/ActivitiesSection';

const Activities = () => {
  const [selectedActivity, setSelectedActivity] = useState<string>('');

  return (
    <div className="min-h-screen bg-background">
      <ActivitiesSection 
        selectedActivity={selectedActivity} 
        onActivitySelect={setSelectedActivity} 
      />
    </div>
  );
};

export default Activities;