import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import '../CSS/Main.css';

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

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [showImageOnly, setShowImageOnly] = useState(false);
  const [showMapOnly, setShowMapOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*');

      if (error) console.error('Error fetching articles:', error);
      else setArticles(data);
    };

    fetchArticles();
  }, []);

  const handleToggleImageOnly = () => {
    setShowImageOnly(!showImageOnly);
    setShowMapOnly(false);
  };

  const handleToggleMapOnly = () => {
    setShowMapOnly(!showMapOnly);
    setShowImageOnly(false);
  };

  const getImageUrl = (fileName) => {
    if (!fileName) return '';
    return `https://cbiydpuufhvjvtulzknq.supabase.co/storage/v1/object/public/images/${fileName}`;
  };

  const getTagImageUrl = (tagName) => {
    return tagImageMap[tagName];
  };

  return (
    <div className="article-list">
      <div className="button-container">
        <button className="toggle-button" onClick={handleToggleImageOnly}>
          {showImageOnly ? 'Show All' : 'Show Images Only'}
        </button>
        <button className="toggle-button" onClick={handleToggleMapOnly}>
          {showMapOnly ? 'Show All' : 'Show Maps Only'}
        </button>
      </div>
      <div className="search-results">
        {articles.map(article => (
          <div key={article.id} className="article-card" onClick={() => navigate(`/article/${article.id}`)}>
            {showImageOnly ? (
              article.image_only_url && (
                <img src={getImageUrl(article.image_only_url)} alt="Image Only" className="image-only" />
              )
            ) : showMapOnly ? (
              article.map_url && (
                <img src={getImageUrl(article.map_url)} alt="Map Only" className="map-only" />
              )
            ) : (
              <>
                {article.image_url && (
                  <img src={getImageUrl(article.image_url)} alt={article.title} className="article-image" />
                )}
                <h2>{article.title}</h2>
                <p>{article.content?.substring(0, 100)}...</p>
                <div className="tags">
                  {article.tags?.map(tag => (
                    <img key={tag} src={getTagImageUrl(tag)} alt={tag} className="tag-image" />
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleList;
