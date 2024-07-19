import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// カスタムアイコンの作成
const customIcon = new L.Icon({
  iconUrl: '/icons/pin.png',
  iconSize: [32, 32], // アイコンのサイズ
  iconAnchor: [16, 32], // アイコンのアンカー（ポイント）
  popupAnchor: [0, -32], // ポップアップのアンカー
});

// 関東地方の都道府県の位置情報を定義
const kantoPrefectures = [
  { name: '東京都', position: [35.68944, 139.69167] },
  { name: '神奈川県', position: [35.44778, 139.6425] },
  { name: '埼玉県', position: [35.85694, 139.64889] },
  { name: '千葉県', position: [35.60472, 140.12333] },
  { name: '茨城県', position: [36.34139, 140.44667] },
  { name: '栃木県', position: [36.56583, 139.88361] },
  { name: '群馬県', position: [36.39111, 139.06083] }
];

const KantoRegionMap = () => {
  const navigate = useNavigate();

  return (
    <>
      <h2>関東地方の地図</h2>
      <MapContainer
        center={[35.68944, 139.69167]}
        zoom={7}
        style={{ height: "80vh", width: "75%", margin: "0 auto" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {kantoPrefectures.map((prefecture) => (
          <Marker
            key={prefecture.name}
            position={prefecture.position}
            icon={customIcon}
          >
            <Popup className="custom-popup">{prefecture.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      <button onClick={() => navigate('/japan')}>日本地図に戻る</button>
    </>
  );
};

export default KantoRegionMap;
