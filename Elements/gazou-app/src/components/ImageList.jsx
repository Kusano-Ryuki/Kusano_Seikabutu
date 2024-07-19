// src/components/ImageList.jsx
import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase.storage.from('images').list();

    if (error) {
      console.error('Error fetching images:', error);
      return;
    }

    const baseURL = 'https://cbiydpuufhvjvtulzknq.supabase.co/storage/v1/object/public/images/';
    const imageUrls = data.map((image) => ({
      name: image.name,
      url: `${baseURL}${image.name}`
    }));

    setImages(imageUrls);
  };

  return (
    <div>
      <h2>Uploaded Images</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image) => (
          <div key={image.name} style={{ margin: '10px' }}>
            <img src={image.url} alt={image.name} style={{ width: '200px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
