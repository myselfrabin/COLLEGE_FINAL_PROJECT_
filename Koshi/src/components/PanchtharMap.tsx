// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, LayersControl, useMapEvent, Polyline } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "../styles/leaflet-overrides.css";

// @ts-ignore
// eslint-disable-next-line
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Place = { lat: number; lng: number; icon: Icon; name: string; desc: string; img: string };

const icons = {
  city: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854866.png", iconSize: [34, 34], iconAnchor: [17, 34], popupAnchor: [0, -34] }),
  famous: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/3179/3179068.png", iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -30] }),
  hidden: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/1673/1673221.png", iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -30] }),
  near: new L.Icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -30] }),
};

const cityMarker = { lat: 27.1167, lng: 87.8333, icon: icons.city, name: "Phidim (Panchthar)", desc: "District headquarters", img: "" };

const mostFamous: Place[] = [
  { lat: 27.1167, lng: 87.8333, icon: icons.famous, name: "Phidim Bazaar", desc: "Town center.", img: "" },
  { lat: 27.1560, lng: 87.7950, icon: icons.famous, name: "Hili view ridge", desc: "Green hills and views.", img: "" },
];

const hiddenDestinations: Place[] = [
  { lat: 27.0900, lng: 87.7900, icon: icons.hidden, name: "Village trail", desc: "Quiet countryside route.", img: "" },
];

const nearSpots: Place[] = [
  { lat: 27.0667, lng: 87.9167, icon: icons.near, name: "Rabi", desc: "Nearby market area.", img: "" },
];

const Legend: React.FC = () => (
  <div className="absolute bottom-5 right-5 bg-white rounded-lg shadow-lg p-3 z-[999] text-sm w-[120px]">
    <div className="flex items-center mb-1"><img src={icons.city.options.iconUrl} className="w-4 mr-2" /> Town</div>
    <div className="flex items-center mb-1"><img src={icons.famous.options.iconUrl} className="w-4 mr-2" /> Famous</div>
    <div className="flex items-center mb-1"><img src={icons.hidden.options.iconUrl} className="w-4 mr-2" /> Hidden</div>
    <div className="flex items-center"><img src={icons.near.options.iconUrl} className="w-4 mr-2" /> Nearby</div>
  </div>
);

const InfoBox: React.FC<{ place: Place | null; onClose: () => void }> = ({ place, onClose }) => {
  if (!place) return null;
  return (
    <div className="fixed md:absolute top-0 right-0 w-full md:w-[350px] max-w-[90vw] h-1/2 md:h-full bg-white shadow-2xl p-4 overflow-y-auto z-[1000] animate-fadeIn">
      <button className="bg-red-500 text-white px-3 py-1 rounded float-right mb-2" onClick={onClose}>Close</button>
      <div>
        <h2 className="text-xl font-bold mb-2">{place.name}</h2>
        {place.img && <img src={place.img} alt={place.name} className="w-full rounded mb-2" />}
        <p className="mb-2">{place.desc}</p>
        <div className="mb-2"><span className="inline-block bg-gray-200 px-3 py-1 rounded-full text-xs">{place.lat.toFixed(5)}, {place.lng.toFixed(5)}</span></div>
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`} target="_blank" rel="noopener noreferrer"><button className="bg-blue-600 text-white px-4 py-1 rounded mt-2">Get Directions</button></a>
      </div>
    </div>
  );
};

export default function PanchtharMap() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [selectedStops, setSelectedStops] = useState<Place[]>([]);
  const [routeLine, setRouteLine] = useState<[number, number][]>([]);
  const [routeStats, setRouteStats] = useState<{ distanceMeters: number; durationSeconds: number } | null>(null);
  const [showPlanner, setShowPlanner] = useState<boolean>(true);

  const allPlaces: Place[] = [...mostFamous, ...hiddenDestinations, ...nearSpots];

  function toggleStop(place: Place) { setRouteLine([]); setRouteStats(null); setSelectedStops((prev) => { const exists = prev.find((p) => p.name === place.name); if (exists) return prev.filter((p) => p.name !== place.name); return [...prev, place]; }); }
  function clearRoute() { setSelectedStops([]); setRouteLine([]); setRouteStats(null); }

  function computeGreedyOrder(start: { lat: number; lng: number }, stops: Place[]): Place[] {
    const remaining = [...stops]; const ordered: Place[] = []; let current = { lat: start.lat, lng: start.lng };
    while (remaining.length > 0) { let bestIdx = 0; let bestDist = Infinity; for (let i = 0; i < remaining.length; i++) { const s = remaining[i]; const d = Math.hypot(s.lat - current.lat, s.lng - current.lng); if (d < bestDist) { bestDist = d; bestIdx = i; } } const next = remaining.splice(bestIdx, 1)[0]; ordered.push(next); current = { lat: next.lat, lng: next.lng }; }
    return ordered;
  }

  async function buildAndDrawRoute() {
    if (selectedStops.length === 0) return;
    const ordered = computeGreedyOrder({ lat: cityMarker.lat, lng: cityMarker.lng }, selectedStops);
    const coords = [[cityMarker.lng, cityMarker.lat], ...ordered.map((p) => [p.lng, p.lat] as [number, number])];
    const url = `https://router.project-osrm.org/route/v1/driving/${coords.map((c) => `${c[0]},${c[1]}`).join(";")}?overview=full&geometries=geojson`;
    try { const res = await fetch(url); const data = await res.json(); if (data && data.routes && data.routes[0]) { const r = data.routes[0]; const line = r.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]] as [number, number]); setRouteLine(line); setRouteStats({ distanceMeters: r.distance, durationSeconds: r.duration }); if (mapRef.current) { const bounds = L.latLngBounds(line.map((ll) => L.latLng(ll[0], ll[1]))); mapRef.current.fitBounds(bounds.pad(0.1)); } } } catch (e) { console.error("Failed to fetch route", e); }
  }

  useEffect(() => { if (!mapRef.current) return; import("leaflet-control-geocoder").then((module) => { if (mapRef.current && module && module.default) { module.default({ defaultMarkGeocode: true }).addTo(mapRef.current); } }); }, [mapRef.current]);
  function MapClickHandler() { useMapEvent("click", () => setSelectedPlace(null)); return null; }

  return (
    <div className="relative mt-6 h-[300px] w-full max-w-[575px] rounded-lg overflow-hidden mx-auto">
      <MapContainer center={[cityMarker.lat, cityMarker.lng]} zoom={12} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }} whenCreated={(mapInstance) => (mapRef.current = mapInstance)} className="z-0">
        <TileLayer attribution="© OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[cityMarker.lat, cityMarker.lng]} icon={cityMarker.icon}><Popup><b>{cityMarker.name}</b><br />{cityMarker.desc}</Popup></Marker>
        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Most Famous Destinations">
            <LayerGroup>
              {mostFamous.map((p, i) => (
                <Marker key={i} position={[p.lat, p.lng]} icon={p.icon} eventHandlers={{ click: () => setSelectedPlace(p) }}>
                  <Popup><b>{p.name}</b><br />{p.desc}</Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Hidden Destinations">
            <LayerGroup>
              {hiddenDestinations.map((p, i) => (
                <Marker key={i} position={[p.lat, p.lng]} icon={p.icon} eventHandlers={{ click: () => setSelectedPlace(p) }}>
                  <Popup><b>{p.name}</b><br />{p.desc}</Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Locations Near Panchthar">
            <LayerGroup>
              {nearSpots.map((p, i) => (
                <Marker key={i} position={[p.lat, p.lng]} icon={p.icon} eventHandlers={{ click: () => setSelectedPlace(p) }}>
                  <Popup><b>{p.name}</b><br />{p.desc}</Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        {routeLine.length > 0 && (<Polyline positions={routeLine} pathOptions={{ color: "#22c55e", weight: 5, opacity: 0.9 }} />)}
        <MapClickHandler />
      </MapContainer>
      {showPlanner ? (
        <div className="absolute top-5 left-5 bg-white/95 backdrop-blur rounded-lg shadow-lg p-3 z-[999] w-[260px] max-h-[70%] overflow-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">Plan your route</div>
            <button className="text-xs px-2 py-1 bg-gray-200 rounded" onClick={() => setShowPlanner(false)}>Hide</button>
          </div>
          <div className="text-xs text-gray-600 mb-2">Start: {cityMarker.name}</div>
          <div className="space-y-1 mb-3">{[...mostFamous, ...hiddenDestinations, ...nearSpots].map((p) => (<label key={p.name} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!selectedStops.find((s) => s.name === p.name)} onChange={() => toggleStop(p)} /><span>{p.name}</span></label>))}</div>
          <div className="flex gap-2"><button className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50" disabled={selectedStops.length === 0} onClick={buildAndDrawRoute}>Optimize & Route</button><button className="bg-gray-200 px-3 py-1 rounded" onClick={clearRoute}>Clear</button></div>
          {routeStats && (<div className="mt-2 text-sm"><div><b>Distance:</b> {(routeStats.distanceMeters / 1000).toFixed(1)} km</div><div><b>ETA:</b> {Math.round(routeStats.durationSeconds / 60)} min</div></div>)}
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
}


