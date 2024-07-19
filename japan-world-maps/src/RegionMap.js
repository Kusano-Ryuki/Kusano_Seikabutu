import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';

// 地域の位置情報を定義
const regionCenters = {
  '北海道': [43.06417, 141.34694],
  '東北': [38.26889, 140.87194],
  '関東': [35.68944, 139.69167],
  '中部': [37.90222, 139.02361],
  '東海': [35.18028, 136.90667],
  '近畿': [34.68639, 135.52],
  '中国地方': [34.39639, 132.45944],
  '四国': [34.06583, 134.55944],
  '九州': [33.60639, 130.41806]
};

const RegionMap = () => {
  const { region } = useParams();
  const navigate = useNavigate();
  const center = regionCenters[region];

  if (!center) {
    return <div>地域が見つかりませんでした</div>;
  }

  return (
    <>
      <h2>{region}</h2>
      <MapContainer
        center={center}
        zoom={8}
        style={{ height: "80vh", width: "75%", margin: "0 auto" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
      <button onClick={() => navigate('/japan')}>日本地図に戻る</button>
    </>
  );
};

export default RegionMap;
