// components/FamousNearPlaces.tsx
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import bhedatar from '@/assets/places/bhedetar.jpg';
import namasteJharana from '@/assets/places/namaste_jharna.webp';
import pindeshwori from '@/assets/places/pindeshwori_temple.webp';
import antu from '@/assets/places/antu_dada.webp';
import kanyam from '@/assets/places/kanyam.jpg';
import maiPokhari from '@/assets/places/mai_pokhari.jpg';

interface Place {
  name: string;
  distance: string;
  description: string;
  image: string;
  routeKey: string; // this is used to route to /:routeKey
}

interface FamousNearPlacesProps {
  placeKey: string;
}

const famousPlacesByLocation: Record<string, Place[]> = {
  dharan: [
    {
      name: "Bhedetar",
      distance: "16 km",
      description: "A scenic hill station near Dharan known for beautiful views.",
      image: bhedatar,
      routeKey: "bhedetar",
    },
    {
      name: "Namaste Jharna",
      distance: "12 km",
      description: "A refreshing waterfall ideal for hiking and picnics.",
      image: namasteJharana,
      routeKey: "namastejharna",
    },
    {
      name: "Pindeswari Temple",
      distance: "4 km",
      description: "A historic temple known for its religious significance.",
      image: pindeshwori,
      routeKey: "pindeswaritemple",
    },
  ],
  ilam: [
    {
      name: "Shree Antu Danda",
      distance: "18 km",
      description: "A sunrise viewpoint offering a panoramic view of tea gardens.",
      image: antu,
      routeKey: "shreeantu",
    },
    {
      name: "Kanyam",
      distance: "10 km",
      description: "Famous for lush tea gardens and beautiful landscapes.",
      image: kanyam,
      routeKey: "kanyam",
    },
    {
      name: "Mai Pokhari",
      distance: "20 km",
      description: "A serene wetland and pilgrimage site surrounded by forest.",
      image: maiPokhari,
      routeKey: "maipokhari",
    },
  ],
};

export default function FamousNearPlaces({ placeKey }: FamousNearPlacesProps) {
  const navigate = useNavigate();
  const places = famousPlacesByLocation[placeKey] || [];

  if (places.length === 0) return null;

  return (
    <div className="mt-24">
      <h2 className="text-5xl text-center font-semibold mb-8">Famous Nearby Places</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {places.map((place, idx) => (
          <Card key={idx} className="hover:shadow-xl transition">
            <img
              src={place.image}
              alt={place.name}
              className="h-48 w-full object-cover rounded-t-xl"
            />
            <CardContent className="p-4">
              <h3 className="text-xl font-bold mb-1">{place.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                <MapPin className="inline-block w-4 h-4 mr-1" />
                {place.distance} away
              </p>
              <p className="text-sm mb-4">{place.description}</p>
              <Button
                size="sm"
                onClick={() => navigate(`/${place.routeKey}`)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
