import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Main.css'; // 正しいCSSファイルをインポート

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

function ArticleCard({ article, showImageOnly }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article.id}`);
  };

  if (!article) {
    return <p>No article data available.</p>;
  }

  // タグ画像のURLを生成する関数
  const getTagImageUrl = (tagName) => {
    return tagImageMap[tagName];
  };

  // 画像のみのカードを表示
  if (showImageOnly && article.image_only_url) {
    return (
      <div className="image-only-card" onClick={handleClick}>
        <img src={`https://cbiydpuufhvjvtulzknq.supabase.co/storage/v1/object/public/images/public/images/${article.image_only_url}`} alt="Image Only" className="image-only" />
      </div>
    );
  }

  // 通常のカードを表示
  return (
    <div className="article-card" onClick={handleClick}>
      {article.image_url ? (
        <img src={`https://cbiydpuufhvjvtulzknq.supabase.co/storage/v1/object/public/images/public/images/${article.image_url}`} alt={article.title} className="article-image" />
      ) : (
        <p>No Image Available</p>
      )}
      <h2>{article.title}</h2>
      <p>{article.content?.substring(0, 100)}...</p>
      <div className="tags">
        {article.tags?.map(tag => (
          <img key={tag} src={getTagImageUrl(tag)} alt={tag} className="tag-image" />
        ))}
      </div>
    </div>
  );
}

export default ArticleCard;
