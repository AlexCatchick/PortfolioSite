import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">Contact Info</h2>
          <p className="text-gray-300">Email: catchickalex@gmail.com</p>
          <p className="text-gray-300">Phone: +91 9696279867</p>
          <p className="text-gray-300">Location: Bengaluru, Karnataka (India)</p>
        </div>
<div>
  <h2 className="text-xl font-bold mb-2">Find Me Here</h2>
  <div className="h-[250px] w-full rounded overflow-hidden">
    <MapContainer
      center={[13.128784, 77.587348]} // Set center to the provided coordinates
      zoom={13}
      className="h-full w-full z-0"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[13.128784, 77.587348]}> // Set marker position to the provided coordinates
        <Popup>I am here</Popup>
      </Marker>
    </MapContainer>
  </div>
</div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-sm text-gray-400">
        © {new Date().getFullYear()} Alex_Catchick. All rights reserved.
      </div>
    </footer>
  );
}
