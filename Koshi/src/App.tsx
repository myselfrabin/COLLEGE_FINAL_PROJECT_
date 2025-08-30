import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Places from "./pages/Places";
import PlaceDetails from "./components/PlaceDetails";
import Activities from "./pages/Activities";
import Festivals from "./pages/Festivals";
import PlanTrip from "./pages/PlanTrip";
import TravelUpdates from "./pages/TravelUpdates";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import FamousPlaceDetails from "./pages/FamousPlaceDetails";
import FestivalsSection from "./components/FestivalsSection";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPages from "./pages/admin/Pages";
import './i18n';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/places" element={<Places />} />
            <Route path="/places/:placeKey" element={<PlaceDetails />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/festivals" element={<Festivals />} />
            <Route path="/plan-trip" element={<PlanTrip />} />
            <Route path="/travel-updates" element={<TravelUpdates />} />

            <Route path="/:placeKey" element={<FamousPlaceDetails />} />
            <Route path="/festivals/:festivalKey" element={<FestivalsSection />} />
            
            {/* All non-path will be directed here */}
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/*" element={<AdminPages />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
