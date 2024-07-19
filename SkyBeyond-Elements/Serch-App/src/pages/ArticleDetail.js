import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error('Error fetching article:', error);
      } else {
        setArticle(data);
      }
      setLoading(false);
    };
    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!article) return <p>Article not found</p>;

  const getTagImageUrl = (tagName) => {
    return tagImageMap[tagName];
  };

  return (
    <div className="article-detail">
      {article.image_url && (
        <img src={`https://cbiydpuufhvjvtulzknq.supabase.co/storage/v1/object/public/images/public/images/${article.image_url}`} alt={article.title} className="article-image-detail" />
      )}
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <div className="tags">
        {article.tags.map(tag => (
          <img key={tag} src={getTagImageUrl(tag)} alt={tag} className="tag-image" />
        ))}
      </div>
    </div>
  );
}

export default ArticleDetail;
