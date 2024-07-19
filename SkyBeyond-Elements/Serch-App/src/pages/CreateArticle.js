import React, { useState } from 'react';
import supabase from '../supabaseClient';
import '../CSS/Main.css';

const tags = {
  '温泉・リゾート': ['温泉', 'ビーチリゾート', '高原リゾート'],
  'アクティビティ(海・川)': ['シュノーケル', 'ダイビング', 'SUP', 'サーフィン', 'ホエールウォッチング', 'イルカウォッチング', '川下り'],
  'ウインタースポーツ': ['スキー・スノボ'],
  'スカイスポーツ': ['スカイダイビング', '気球'],
  'アクティビティ(山)': ['山登り', 'ハイキング'],
  '鑑賞': ['星空鑑賞', '有名美術館・アート', '陶芸・伝統工芸'],
  '観光・街並み': {
    '自然': ['海・岬', '山・峠', '湖・川', '渓谷・紅葉', '離島'],
    '歴史': ['城・城郭', '庭園', '寺社仏閣・教会', '古墳・遺跡', '神話・伝説', '史跡'],
    '街並み': ['古い街並み', '小京都・小江戸', '桜の名所', '港町', '異国情緒', '大都市'],
    '世界遺産': ['自然遺産', '文化遺産', '複合遺産']
  },
  '食・酒': {
    '魚介': ['地魚', '伊勢エビ', 'カニ', 'うに', 'マグロ', 'カツオ', 'うなぎ'],
    '肉': ['ブランド牛', 'ブランド豚', 'ブランド鶏'],
    '麺': ['ラーメン', 'うどん', 'そば'],
    '酒': ['ワイン', '日本酒']
  }
};

const flattenTags = (tags) => {
  let flatTags = [];
  Object.keys(tags).forEach(category => {
    if (Array.isArray(tags[category])) {
      flatTags = flatTags.concat(tags[category]);
    } else {
      flatTags = flatTags.concat(flattenTags(tags[category]));
    }
  });
  return flatTags;
};

const renderTags = (tags, handleTagChange) => {
  return Object.keys(tags).map(category => (
    <div key={category}>
      <h3 onClick={() => handleTagChange(category)}>{category}</h3>
      {Array.isArray(tags[category])
        ? tags[category].map(tag => (
            <label key={tag}>
              <input
                type="checkbox"
                value={tag}
                onChange={handleTagChange}
              />
              {tag}
            </label>
          ))
        : renderTags(tags[category], handleTagChange)}
    </div>
  ));
};

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsSelected, setTagsSelected] = useState([]);
  const [image, setImage] = useState(null);
  const [imageOnly, setImageOnly] = useState(null);

  const handleTagChange = (tagOrCategory) => {
    const tagsToToggle = Array.isArray(tags[tagOrCategory])
      ? tags[tagOrCategory]
      : flattenTags(tags[tagOrCategory]);

    const allSelected = tagsToToggle.every(tag => tagsSelected.includes(tag));
    const newSelectedTags = allSelected
      ? tagsSelected.filter(tag => !tagsToToggle.includes(tag))
      : [...new Set([...tagsSelected, ...tagsToToggle])];

    setTagsSelected(newSelectedTags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const articleData = {
      title,
      content,
      tags: tagsSelected,
      image_url: image ? image.name : null,
      image_only_url: imageOnly ? imageOnly.name : null,
    };

    const { data, error } = await supabase
      .from('articles')
      .insert([articleData]);

    if (error) console.error('Error creating article:', error);
    else console.log('Article created:', data);
  };

  return (
    <div className="form">
      <h2>記事を作成</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="tags">
          {renderTags(tags, handleTagChange)}
        </div>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="file"
          onChange={(e) => setImageOnly(e.target.files[0])}
        />
        <button type="submit">投稿</button>
      </form>
    </div>
  );
};

export default CreateArticle;
