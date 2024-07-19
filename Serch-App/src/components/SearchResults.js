import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import ArticleCard from './ArticleCard';
import Maps from '../pages/JapanMaps';
import Text_Card from '../Images/text_card.svg'
import Image_Card from '../Images/image_card.svg'
import Map_Card from '../Images/map_card.svg'

import '../CSS/Main.css';

function SearchResults({ filters, searchQuery }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImageOnly, setShowImageOnly] = useState(false); // 追加
  const [showMapOnly, setShowMapOnly] = useState(false); // 追加

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      let query = supabase.from('articles').select('*');

      if (filters.length > 0) {
        query = query.contains('tags', filters);
      }

      const { data: allData, error: allError } = await query;
      if (allError) {
        console.error('Error fetching articles:', allError);
        setLoading(false);
        return;
      }

      if (searchQuery) {
        const keywords = searchQuery.split(' ');
        const filteredData = allData.filter(article => {
          return keywords.every(keyword => 
            article.title.includes(keyword) || 
            article.content.includes(keyword) || 
            article.tags.includes(keyword)
          );
        });
        setArticles(filteredData);
      } else {
        setArticles(allData);
      }
      setLoading(false);
    };
    fetchArticles();
  }, [filters, searchQuery]);

  if (loading) return <p>Loading...</p>;
  if (articles.length === 0) return <p>検索結果なし。</p>;

  return (
    <>
      <div className='show-buttons'>
      <img 
          src={Text_Card} 
          alt="Show Tect Card" 
          className='show-button'
          onClick={() => { setShowImageOnly(false); setShowMapOnly(false); }} 
          style={{ cursor: 'pointer', margin: '5px' }}
        />
        <img 
          src={Image_Card} 
          alt="Show Image Only Cards"
          className='show-button'
          onClick={() => { setShowImageOnly(true); setShowMapOnly(false); }} 
          style={{ cursor: 'pointer', margin: '5px' }}
        />
        <img 
          src={Map_Card} 
          alt="Show Maps Only"
          className='show-button'
          onClick={() => { setShowMapOnly(true); setShowImageOnly(false); }} 
          style={{ cursor: 'pointer', margin: '5px' }}
        />
      </div>

      <div className={`search-results ${showMapOnly ? 'no-grid' : ''}`}>
        {showMapOnly ? (
          <Maps articles={articles} />
        ) : (
          articles.map(article => (
            <ArticleCard key={article.id} article={article} showImageOnly={showImageOnly} />
          ))
        )}
      </div>
    </>
  );
}

export default SearchResults;
