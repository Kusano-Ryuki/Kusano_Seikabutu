// src/components/ImageUpload.jsx
import React, { useState } from 'react';
import supabase from '../supabaseClient';

const ImageUpload = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return;

    const fileName = `${Date.now()}-${image.name}`;
    const { data, error } = await supabase.storage.from('images').upload(fileName, image);

    if (error) {
      console.error('Error uploading image:', error);
      setMessage('Error uploading image');
      return;
    }

    console.log('Image uploaded:', data);
    setMessage('Success!');
    setTimeout(() => {
      window.location.reload();
    }, 1000); // 1秒後にリロード
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" style={{ width: '200px' }} />}
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUpload;
