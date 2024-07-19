import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WorldMap from './WorldMap';
import JapanMap from './JapanMap';
import RegionMap from './RegionMap';
import KantoRegionMap from './KantoRegionMap';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Leafletで地図を表示する</h1>
      <Routes>
        <Route path="/" element={<WorldMap />} />
        <Route path="/japan" element={<JapanMap />} />
        <Route path="/region/:region" element={<RegionMap />} />
        <Route path="/kantoregion" element={<KantoRegionMap />} />
      </Routes>
    </div>
  );
}

export default App;
