// src/App.jsx
import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ImageList from './components/ImageList';

function App() {
  const [update, setUpdate] = useState(false);

  const handleUpload = () => {
    setUpdate((prev) => !prev);
  };

  return (
    <div className="App">
      <h1>Image Upload App</h1>
      <ImageUpload onUpload={handleUpload} />
      <ImageList key={update} />
    </div>
  );
}

export default App;
