// pages/FamousPlaceDetails.tsx
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";


interface Place {
  name: string;
  distance: string;
  description: string;
  image: string;
  routeKey: string;
  location: string;
  howToReach?: string;
  highlights?: string;
}

const allFamousPlaces: Place[] = [
  {
    name: "Bhedetar",
    distance: "16 km from Dharan",
    description: "A scenic hill station near Dharan known for beautiful views.",
    image: "/images/bhedetar.jpg",
    routeKey: "bhedetar",
    location: "Dharan",
    howToReach: "Take a bus or taxi from Dharan towards Dhankuta road.",
    highlights: "Hill station, scenic views, cool breeze.",
  },
  {
    name: "Namaste Jharna",
    distance: "12 km from Dharan",
    description: "A refreshing waterfall ideal for hiking and picnics.",
    image: "/images/namaste-jharna.jpg",
    routeKey: "namastejharna",
    location: "Dharan",
    howToReach: "15-minute drive from Dharan Bazaar towards the hills.",
    highlights: "Waterfall, picnic spot, hiking trail.",
  },
  {
    name: "Shree Antu Danda",
    distance: "18 km from Ilam",
    description: "A sunrise viewpoint offering a panoramic view of tea gardens.",
    image: "/images/antu-danda.jpg",
    routeKey: "shreeantu",
    location: "Ilam",
    howToReach: "Drive or hire a jeep from Ilam Bazaar.",
    highlights: "Sunrise, tea gardens, peaceful retreat.",
  },
  // Add more as needed...
];

export default function FamousPlaceDetails() {
  const { placeKey } = useParams();
  const navigate = useNavigate();

  const place = allFamousPlaces.find((p) => p.routeKey === placeKey);

  if (!place) {
    return (
      <section className="py-20 text-center">
        <h2 className="text-2xl font-semibold">Place not found.</h2>
        <Button onClick={() => navigate("/")}>← Back to Home</Button>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container-responsive">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8">
          ← Back
        </Button>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{place.name}</h1>
            <p className="text-muted-foreground text-lg">{place.description}</p>

            <div className="space-y-2">
              <p>
                <strong>Location:</strong> {place.location}
              </p>
              <p>
                <strong>Distance:</strong> {place.distance}
              </p>
              <p>
                <strong>How to reach:</strong> {place.howToReach ?? "Info coming soon."}
              </p>
              <p>
                <strong>Highlights:</strong> {place.highlights ?? "Info coming soon."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
