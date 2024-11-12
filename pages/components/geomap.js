// components/Map.js
import { MapContainer, Marker, TileLayer, Tooltip, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"



export default function Map() {
  // Array of coordinates and information for each marker
  const coordinates = [
    { id: 1, position: [48.122251186756834, 17.12454755257893,], title: "Marker 1" },
    { id: 2, position: [48.18839028634453, 17.033035791908997], title: "Marker 2" },
  ];

  return (
    <MapContainer center={[48.187234111605235, 17.040326842328746]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {coordinates.map(({ id, position, title, info }) => (
        <Marker key={id} position={position}>
          <Popup>
            <h3>{title}</h3>
            <p>{info}</p>
            <button onClick={() => alert(`Button clicked for ${title}`)}>Click Me</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
