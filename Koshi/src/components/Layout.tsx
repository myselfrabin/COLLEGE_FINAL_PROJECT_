// components/Layout.tsx
import { Outlet, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import Chatbot from './Chatbot';

const Layout = () => {
  const navigate = useNavigate();

  const handleNavigation = (section: string) => {
    switch (section) {
      case 'places':
        navigate('/places');
        break;
      case 'activities':
        navigate('/activities');
        break;
      case 'festivals':
        navigate('/festivals');
        break;
      case 'planTrip':
        navigate('/plan-trip');
        break;
      case 'travelUpdates':
        navigate('/travel-updates');
        break;
      default:
        navigate('/');
        break;
    }
  };

  return (
    <div>
      <Navigation onNavigate={handleNavigation} />
      <Outlet />
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
        <Chatbot />
      </div>
    </div>
  );
};

export default Layout;
