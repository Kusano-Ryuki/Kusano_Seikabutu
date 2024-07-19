import React, { useState } from 'react';
import supabase from '../supabaseClient';
import '../CSS/Main.css';

const allTags = [
  '国内', '海外', '都市', 'リゾート', '自然', '山', '海', '川・湖', '星空',
  'グルメ', '歴史', '伝統', '祭り', '城', '温泉'
];

const tagImageMap = {
  '国内': '/images/tags/kokunai.svg',
  '海外': '/images/tags/kaigai.svg',
  '都市': '/images/tags/tosi.svg',
  'リゾート': '/images/tags/rizo_to.svg',
  '自然': '/images/tags/sizen.svg',
  '山': '/images/tags/yama.svg',
  '海': '/images/tags/umi.svg',
  '川・湖': '/images/tags/kawamizuumi.svg',
  '星空': '/images/tags/hosizora.svg',
  'グルメ': '/images/tags/gurume.svg',
  '歴史': '/images/tags/rekisi.svg',
  '伝統': '/images/tags/dentou.svg',
  '祭り': '/images/tags/maturi.svg',
  '城': '/images/tags/siro.svg',
  '温泉': '/images/tags/onsen.svg'
};

function CreateArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageOnlyFile, setImageOnlyFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageOnlyPreview, setImageOnlyPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    let imageOnlyUrl = '';

    // 通常の画像をアップロード
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `public/images/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return;
      }

      imageUrl = fileName;
      console.log('Generated Image URL:', imageUrl); // デバッグ用
    }

    // 画像のみの画像をアップロード
    if (imageOnlyFile) {
      const fileExt = imageOnlyFile.name.split('.').pop();
      const fileName = `imageOnly_${Math.random()}.${fileExt}`;
      const filePath = `public/images/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, imageOnlyFile);

      if (uploadError) {
        console.error('Error uploading image only:', uploadError);
        return;
      }

      imageOnlyUrl = fileName;
      console.log('Generated Image Only URL:', imageOnlyUrl); // デバッグ用
    }

    const { data, error } = await supabase
      .from('articles')
      .insert([{ title, content, tags, image_url: imageUrl, image_only_url: imageOnlyUrl }]);
    if (error) console.error('Error creating article:', error);
    else console.log('Article created:', data);
  };

  const handleCheckboxChange = (tag) => {
    setTags(tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag]);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error('No file selected for image upload.');
      return;
    }
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageOnlyUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error('No file selected for image only upload.');
      return;
    }
    setImageOnlyFile(file);
    setImageOnlyPreview(URL.createObjectURL(file));
  };

  const getContentPreview = (content) => {
    if (content.length > 10) {
      return content.substring(0, 10) + '.....';
    }
    return content;
  };

  const getTagImageUrl = (tagName) => {
    return tagImageMap[tagName];
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="tags">
        {allTags.map(tag => (
          <label key={tag}>
            <input
              type="checkbox"
              value={tag}
              onChange={() => handleCheckboxChange(tag)}
            />
            {tag}
          </label>
        ))}
      </div>

      <div>
        <h2>タイトルあり記事用</h2>
        <input type="file" onChange={handleImageUpload} />
        <div>
          {preview && <img src={preview} alt="Preview" className="Preview-image" />}
        </div>
      </div>
      <div>
        <h2>画像のみ記事用</h2>
        <input type="file" onChange={handleImageOnlyUpload} />
        <div>
          {imageOnlyPreview && <img src={imageOnlyPreview} alt="Image Only Preview" className="Preview-image" />}
        </div>
      </div>

      <h2 className='preview-title'>投稿後（記事タイトルあり）プレビュー</h2>
      <div className="preview-card">
        <div className="preview-left">
          <div className="preview-tags">
            {tags.map(tag => (
              <img key={tag} src={getTagImageUrl(tag)} alt={tag} className="preview-tag" />
            ))}
          </div>
          {preview && <img src={preview} alt="Preview" className="article-preview-image" />}
        </div>
        <div className="preview-right">
          <h2>{title}</h2>
          <p>{getContentPreview(content)}</p>
        </div>
      </div>

      <h2>投稿後（画像表示のみ）プレビュー</h2>
      <div className='preview-card'>
      {imageOnlyPreview && <img src={imageOnlyPreview} alt="Image Only Preview" className="article-preview-image" />}
      </div>

      <button type="submit">Create Article</button>
    </form>
  );
}

export default CreateArticle;
