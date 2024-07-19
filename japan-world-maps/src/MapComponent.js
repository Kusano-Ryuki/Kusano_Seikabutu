import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

const MapComponent = ({ center, zoom, onClick }) => {
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        if (onClick) {
          onClick(e);
        }
      },
    });
    return null;
  };

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        <Popup>
          地図の中心
        </Popup>
      </Marker>
      <MapClickHandler />
    </MapContainer>
  );
};

export default MapComponent;
