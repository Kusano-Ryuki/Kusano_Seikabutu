import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

// カスタムアイコンの作成
const customIcon = new L.Icon({
  iconUrl: '/icons/pin.png',
  iconSize: [32, 32], // アイコンのサイズ
  iconAnchor: [16, 32], // アイコンのアンカー（ポイント）
  popupAnchor: [0, -32], // ポップアップのアンカー
});

const WorldMap = () => {
  const navigate = useNavigate();

  const handleMarkerClick = (country) => {
    if (country === 'Japan') {
      navigate('/japan');
    }
  };

  return (
    <>
      <h2>世界地図</h2>
      <MapContainer
        center={[30, 150]}
        zoom={2.8}
        style={{ height: "80vh", width: "75%", margin: "0 auto" }}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        minZoom={2.4}
        maxZoom={2.4}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
          position={[35.682839, 139.759455]} 
          icon={customIcon} 
          eventHandlers={{ click: () => handleMarkerClick('Japan') }} 
        />
      </MapContainer>
    </>
  );
};

export default WorldMap;
