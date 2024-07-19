import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import ArticleCard from './ArticleCard';
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

const getAllSubTags = (category) => {
  let subTags = [];
  if (Array.isArray(category)) {
    subTags = subTags.concat(category);
  } else {
    for (const key in category) {
      if (Array.isArray(category[key])) {
        subTags = subTags.concat(category[key]);
      } else {
        subTags = subTags.concat(getAllSubTags(category[key]));
      }
    }
  }
  return subTags;
};

const renderTags = (tags, selectedTags, handleTagChange, handleMainTagChange) => {
  return Object.keys(tags).map(category => (
    <div key={category}>
      <h3>
        <label>
          <input
            type="checkbox"
            checked={getAllSubTags(tags[category]).every(tag => selectedTags.includes(tag))}
            onChange={() => handleMainTagChange(tags[category])}
          />
          {category}
        </label>
      </h3>
      {Array.isArray(tags[category])
        ? tags[category].map(tag => (
            <label key={tag}>
              <input
                type="checkbox"
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={handleTagChange}
              />
              {tag}
            </label>
          ))
        : renderTags(tags[category], selectedTags, handleTagChange, handleMainTagChange)}
    </div>
  ));
};

const SearchResults = () => {
  const [articles, setArticles] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [useAnd, setUseAnd] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      let query = supabase
        .from('articles')
        .select('*');

      if (selectedTags.length > 0) {
        const tagCondition = selectedTags.map(tag => `tags.cs.{${tag}}`).join(useAnd ? '&' : '|');
        query = query.or(tagCondition);
      }

      const { data, error } = await query;

      if (error) console.error('Error fetching articles:', error);
      else setArticles(data);
    };

    fetchArticles();
  }, [selectedTags, useAnd]);

  const handleTagChange = (e) => {
    const value = e.target.value;
    setSelectedTags(
      selectedTags.includes(value)
        ? selectedTags.filter(tag => tag !== value)
        : [...selectedTags, value]
    );
  };

  const handleMainTagChange = (subTags) => {
    const allSubTags = getAllSubTags(subTags);
    setSelectedTags(
      allSubTags.every(tag => selectedTags.includes(tag))
        ? selectedTags.filter(tag => !allSubTags.includes(tag))
        : [...selectedTags, ...allSubTags.filter(tag => !selectedTags.includes(tag))]
    );
  };

  const handleAndOrToggle = () => {
    setUseAnd(!useAnd);
  };

  return (
    <div className="search-results">
      <div className="search-filters">
        <button onClick={handleAndOrToggle}>
          {useAnd ? 'AND検索' : 'OR検索'}
        </button>
        <div className="tag-dropdown">
          {renderTags(tags, selectedTags, handleTagChange, handleMainTagChange)}
        </div>
      </div>
      <div className="search-results">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
