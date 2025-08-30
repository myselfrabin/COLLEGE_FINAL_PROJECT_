// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, LayersControl, useMapEvent, Polyline } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "../styles/leaflet-overrides.css";

// Fix Leaflet's default icon path issue in React
// @ts-ignore
// eslint-disable-next-line
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Place = {
  lat: number;
  lng: number;
  icon: Icon;
  name: string;
  desc: string;
  img: string;
};

const icons = {
  city: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854866.png",
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
  }),
  famous: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3179/3179068.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  hidden: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1673/1673221.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  near: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
};

const mostFamous: Place[] = [
  { lat: 26.8117, lng: 87.2853, icon: icons.famous, name: "Clock Tower", desc: "Heart of Dharan.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Dharan_Clock_Tower.jpg/800px-Dharan_Clock_Tower.jpg" },
  { lat: 26.823185, lng: 87.293678, icon: icons.famous, name: "Buddha Subba Temple", desc: "Famous wish-making site.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Buddha_Subba_Temple.jpg/800px-Buddha_Subba_Temple.jpg" },
  { lat: 26.8133, lng: 87.2946, icon: icons.famous, name: "Pindeshwor Temple", desc: "Popular Hindu temple.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Pindeshwor_Temple.jpg/800px-Pindeshwor_Temple.jpg" },
  { lat: 26.8189, lng: 87.2929, icon: icons.famous, name: "Dantakali Temple", desc: "Sacred temple dedicated to goddess Kali.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Dantakali_Temple.jpg/800px-Dantakali_Temple.jpg" },
  { lat: 26.8376, lng: 87.2739, icon: icons.famous, name: "Chinde Dada", desc: "Scenic hill with great views.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Chinde_Dada.jpg/800px-Chinde_Dada.jpg" },
  { lat: 26.8403, lng: 87.3072, icon: icons.famous, name: "Dharan View Point", desc: "Panoramic views over Dharan.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Dharan_View_Point.jpg/800px-Dharan_View_Point.jpg" },
  { lat: 26.8461, lng: 87.2930, icon: icons.famous, name: "Osho Park / Shramsanskriti Park", desc: "Peaceful place for meditation.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Osho_Park_Dharan.jpg/800px-Osho_Park_Dharan.jpg" },
];

const hiddenDestinations: Place[] = [
  { lat: 26.8441, lng: 87.3246, icon: icons.hidden, name: "Shiva Jatta", desc: "Natural waterfall in forested area.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Shiva_Jatta.jpg/800px-Shiva_Jatta.jpg" },
  { lat: 26.831192, lng: 87.294435, icon: icons.hidden, name: "Vata Bhunge Darbar, Bijayapur", desc: "Ancient ruins of Dharan royalty.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Vata_Bhunge_Darbar.jpg/800px-Vata_Bhunge_Darbar.jpg" },
  { lat: 26.823569, lng: 87.24789, icon: icons.hidden, name: "Bishnu Paduka Temple", desc: "Holy Hindu pilgrimage site.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Bishnu_Paduka_Temple.jpg/800px-Bishnu_Paduka_Temple.jpg" },
  { lat: 26.83183, lng: 87.326, icon: icons.hidden, name: "Danabari", desc: "Peaceful hill settlement with greenery.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Nature_in_Nepal.jpg/800px-Nature_in_Nepal.jpg" },
  { lat: 26.7363133, lng: 87.2226, icon: icons.hidden, name: "Rasa Tal", desc: "Small serene lake surrounded by forest.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Nepal_lake.jpg/800px-Nepal_lake.jpg" },
];

const nearDharan: Place[] = [
  { lat: 26.859549, lng: 87.319787, icon: icons.near, name: "Bhedetar", desc: "Hill station near Dharan.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Bhedetar_Dharan.jpg/800px-Bhedetar_Dharan.jpg" },
  { lat: 26.87764708202268, lng: 87.33186370582855, icon: icons.near, name: "Namaste Waterfall", desc: "Beautiful Natural waterfall.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Namaste_Waterfall.jpg/800px-Namaste_Waterfall.jpg" },
  { lat: 26.822234, lng: 87.155103, icon: icons.near, name: "Barahachhetra", desc: "Major Hindu pilgrimage site.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Barahachhetra_Temple.jpg/800px-Barahachhetra_Temple.jpg" },
  { lat: 26.8210076, lng: 87.161000, icon: icons.near, name: "Chatara (Koshi)", desc: "Riverside ghat and local market.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Chatara_Ghat.jpg/800px-Chatara_Ghat.jpg" },
];

const cityMarker = {
  lat: 26.8116,
  lng: 87.2850,
  icon: icons.city,
  name: "Bhanu Chowk (Dharan)",
  desc: "Welcome to Dharan!",
  img: "",
};

const Legend: React.FC = () => (
  <div className="absolute bottom-5 right-5 bg-white rounded-lg shadow-lg p-3 z-[999] text-sm w-[120px]">
    <div className="flex items-center mb-1"><img src={icons.city.options.iconUrl} className="w-4 mr-2" /> Bhanu Chowk</div>
    <div className="flex items-center mb-1"><img src={icons.famous.options.iconUrl} className="w-4 mr-2" /> Famous</div>
    <div className="flex items-center mb-1"><img src={icons.hidden.options.iconUrl} className="w-4 mr-2" /> Hidden</div>
    <div className="flex items-center"><img src={icons.near.options.iconUrl} className="w-4 mr-2" /> Nearby</div>
  </div>
);

const InfoBox: React.FC<{
  place: Place | null;
  onClose: () => void;
}> = ({ place, onClose }) => {
  if (!place) return null;
  return (
    <div className="fixed md:absolute top-0 right-0 w-full md:w-[350px] max-w-[90vw] h-1/2 md:h-full bg-white shadow-2xl p-4 overflow-y-auto z-[1000] animate-fadeIn">
      <button className="bg-red-500 text-white px-3 py-1 rounded float-right mb-2" onClick={onClose}>Close</button>
      <div>
        <h2 className="text-xl font-bold mb-2">{place.name}</h2>
        <img src={place.img} alt={place.name} className="w-full rounded mb-2" />
        <p className="mb-2">{place.desc}</p>
        <div className="mb-2">
          <span className="inline-block bg-gray-200 px-3 py-1 rounded-full text-xs">{place.lat.toFixed(5)}, {place.lng.toFixed(5)}</span>
        </div>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-blue-600 text-white px-4 py-1 rounded mt-2">Get Directions</button>
        </a>
      </div>
    </div>
  );
};

const DharanMap: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [selectedStops, setSelectedStops] = useState<Place[]>([]);
  const [routeLine, setRouteLine] = useState<[number, number][]>([]);
  const [routeStats, setRouteStats] = useState<{ distanceMeters: number; durationSeconds: number } | null>(null);
  const [showPlanner, setShowPlanner] = useState<boolean>(true);

  const allPlaces: Place[] = [
    ...mostFamous,
    ...hiddenDestinations,
    ...nearDharan,
  ];

  function toggleStop(place: Place) {
    setRouteLine([]);
    setRouteStats(null);
    setSelectedStops((prev) => {
      const exists = prev.find((p) => p.name === place.name);
      if (exists) return prev.filter((p) => p.name !== place.name);
      return [...prev, place];
    });
  }

  function clearRoute() {
    setSelectedStops([]);
    setRouteLine([]);
    setRouteStats(null);
  }

  // Simple nearest-neighbor heuristic from the city center
  function computeGreedyOrder(start: { lat: number; lng: number }, stops: Place[]): Place[] {
    const remaining = [...stops];
    const ordered: Place[] = [];
    let current = { lat: start.lat, lng: start.lng };
    while (remaining.length > 0) {
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < remaining.length; i++) {
        const s = remaining[i];
        const d = Math.hypot(s.lat - current.lat, s.lng - current.lng);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }
      const next = remaining.splice(bestIdx, 1)[0];
      ordered.push(next);
      current = { lat: next.lat, lng: next.lng };
    }
    return ordered;
  }

  async function buildAndDrawRoute() {
    if (selectedStops.length === 0) return;
    const ordered = computeGreedyOrder({ lat: cityMarker.lat, lng: cityMarker.lng }, selectedStops);
    const coords = [
      [cityMarker.lng, cityMarker.lat],
      ...ordered.map((p) => [p.lng, p.lat] as [number, number]),
    ];
    const coordStr = coords.map((c) => `${c[0]},${c[1]}`).join(";");
    const url = `https://router.project-osrm.org/route/v1/driving/${coordStr}?overview=full&geometries=geojson`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.routes && data.routes[0]) {
        const r = data.routes[0];
        const line = r.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]] as [number, number]);
        setRouteLine(line);
        setRouteStats({ distanceMeters: r.distance, durationSeconds: r.duration });
        // Fit map to route
        if (mapRef.current) {
          const bounds = L.latLngBounds(line.map((ll) => L.latLng(ll[0], ll[1])));
          mapRef.current.fitBounds(bounds.pad(0.1));
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Failed to fetch route", e);
    }
  }

  // Add geocoder and legend after map is ready
  useEffect(() => {
    if (!mapRef.current) return;
    // @ts-ignore
    import("leaflet-control-geocoder").then((module) => {
      // @ts-ignore
      if (mapRef.current && module && module.default) {
        // @ts-ignore
        module.default({ defaultMarkGeocode: true }).addTo(mapRef.current);
      }
    });
  }, [mapRef.current]);

  // Close info box on map click
  function MapClickHandler() {
    useMapEvent("click", () => setSelectedPlace(null));
    return null;
  }

  return (
    <div className="relative mt-6 h-[300px] w-full max-w-[575px] rounded-lg overflow-hidden mx-auto">
      <MapContainer
        center={[26.8121, 87.2832]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        className="z-0"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* City marker */}
        <Marker position={[cityMarker.lat, cityMarker.lng]} icon={cityMarker.icon}>
          <Popup>
            <b>{cityMarker.name}</b>
            <br />
            {cityMarker.desc}
          </Popup>
        </Marker>

        {/* Most Famous */}
        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Most Famous Destinations">
            <LayerGroup>
              {mostFamous.map((p, i) => (
                <Marker
                  key={i}
                  position={[p.lat, p.lng]}
                  icon={p.icon}
                  eventHandlers={{
                    click: () => setSelectedPlace(p),
                  }}
                >
                  <Popup>
                    <b>{p.name}</b>
                    <br />
                    {p.desc}
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Hidden Destinations">
            <LayerGroup>
              {hiddenDestinations.map((p, i) => (
                <Marker
                  key={i}
                  position={[p.lat, p.lng]}
                  icon={p.icon}
                  eventHandlers={{
                    click: () => setSelectedPlace(p),
                  }}
                >
                  <Popup>
                    <b>{p.name}</b>
                    <br />
                    {p.desc}
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Locations Near Dharan">
            <LayerGroup>
              {nearDharan.map((p, i) => (
                <Marker
                  key={i}
                  position={[p.lat, p.lng]}
                  icon={p.icon}
                  eventHandlers={{
                    click: () => setSelectedPlace(p),
                  }}
                >
                  <Popup>
                    <b>{p.name}</b>
                    <br />
                    {p.desc}
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        {routeLine.length > 0 && (
          <Polyline positions={routeLine} pathOptions={{ color: "#2563eb", weight: 5, opacity: 0.9 }} />
        )}
        <MapClickHandler />
      </MapContainer>
      {/* Route planner panel */}
      {showPlanner ? (
        <div className="absolute top-5 left-5 bg-white/95 backdrop-blur rounded-lg shadow-lg p-3 z-[999] w-[260px] max-h-[70%] overflow-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">Plan your route</div>
            <button className="text-xs px-2 py-1 bg-gray-200 rounded" onClick={() => setShowPlanner(false)}>Hide</button>
          </div>
          <div className="text-xs text-gray-600 mb-2">Start: {cityMarker.name}</div>
          <div className="space-y-1 mb-3">
            {allPlaces.map((p) => (
              <label key={p.name} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!selectedStops.find((s) => s.name === p.name)}
                  onChange={() => toggleStop(p)}
                />
                <span>{p.name}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
              disabled={selectedStops.length === 0}
              onClick={buildAndDrawRoute}
            >
              Optimize & Route
            </button>
            <button className="bg-gray-200 px-3 py-1 rounded" onClick={clearRoute}>Clear</button>
          </div>
          {routeStats && (
            <div className="mt-2 text-sm">
              <div><b>Distance:</b> {(routeStats.distanceMeters / 1000).toFixed(1)} km</div>
              <div><b>ETA:</b> {Math.round(routeStats.durationSeconds / 60)} min</div>
            </div>
          )}
        </div>
      ) : (
        <button className="absolute top-5 left-5 bg-white rounded shadow px-3 py-1 z-[999] text-sm" onClick={() => setShowPlanner(true)}>
          Show planner
        </button>
      )}
      <Legend />
      <InfoBox place={selectedPlace} onClose={() => setSelectedPlace(null)} />
    </div>
  );
};

export default DharanMap; 