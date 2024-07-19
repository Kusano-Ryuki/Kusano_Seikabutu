import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// 各地域の位置情報を定義
const regions = [
  { name: '北海道', position: [43.4, 142.7] },
  { name: '東北', position: [37.89, 140.3] },
  { name: '関東', position: [36, 139.69167] },
  { name: '中部', position: [36, 137.8] },
  { name: '東海', position: [35.4, 136.90667] },
  { name: '近畿', position: [34.5, 135.6] },
  { name: '中国', position: [35, 133.5] },
  { name: '四国', position: [33.5, 133.55944] },
  { name: '九州', position: [33.60639, 130.418] },
  { name: '沖縄', position: [26.95, 128.418] }
];

const JapanMap = () => {
  // const navigate = useNavigate();

  // const handleMarkerClick = (region) => {
    // if (region === '関東') {
      // navigate('/kantoregion');
    // } else {
      // navigate(`/region/${region}`);
    // }
  // };

  const createDivIcon = (name) => {
    return new L.DivIcon({
      className: 'custom-div-icon',
      html: `<div class='custom-marker'>${name}</div>`
    });
  };

  return (
    <>
      <h2>日本地図</h2>
      <MapContainer
        center={[36.2839, 137]}
        zoom={5}
        style={{ height: "80vh", width: "75%", margin: "0 auto" }}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        dragging={false}
        minZoom={5.5}
        maxZoom={5.5}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {regions.map((region) => (
          <Marker
            key={region.name}
            position={region.position}
            icon={createDivIcon(region.name)}
            eventHandlers={{ click: () => handleMarkerClick(region.name) }}
          >
            <Popup className="custom-popup">{region.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <button onClick={() => navigate('/')}>世界地図に戻る</button>
    </>
  );
};

export default JapanMap;
