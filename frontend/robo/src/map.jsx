import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';

const Map = ({ locations }) => {
  if (!locations || locations.length === 0) {
    return <div>No locations data available.</div>;
  }

  const center = locations.length > 0 ? [locations[0].latitude, locations[0].longitude] : [51.505, -0.09]; // Use the first location for centering

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        // Use a unique identifier from the location object for the key prop
        <Marker  key={location.id || index} position={[location.latitude, location.longitude]}>
          
          <Popup>
            <strong>Name:</strong> {location.name || "Unknown"} <br />
            <strong>Battery:</strong> {location.battery || "N/A"} <br />
            <strong>Status:</strong> {location.online ? 'Online' : 'Offline'}
          </Popup>
        {location.battery<=20? <Tooltip  permanent direction="top"> battery low {location.battery}%</Tooltip>
        : ""}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;