import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import geojsonData from '../data/Japan.geojson';
import '../CSS/Main.css';

function JapanMap() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      try {
        // GeoJSONデータを追加
        const geoJsonLayer = L.geoJSON(geojsonData, {
          onEachFeature: (feature, layer) => {
            if (feature.properties && feature.properties.N03_001) {
              layer.bindPopup(feature.properties.N03_001);
            }
          }
        });
        geoJsonLayer.addTo(map);
      } catch (error) {
        console.error('Invalid GeoJSON object:', error);
      }
    }
  }, [map]);

  // デバッグ用: geojsonDataのログを表示
  console.log('GeoJSON Data:', geojsonData);

  return (
    <MapContainer
      center={[35.6895, 139.6917]}
      zoom={5}
      style={{ height: "500px", width: "100%" }}
      whenCreated={setMap}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      dragging={false}
      zoomControl={false} // ズームコントロールを無効にする
    >
      <GeoJSON data={geojsonData} />
    </MapContainer>
  );
}

export default JapanMap;
