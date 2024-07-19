import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import '../CSS/Main.css'; // 必要に応じてCSSを作成

function DeleteArticle() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*');
      if (error) console.error('Error fetching articles:', error);
      else setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting article:', error);
    } else {
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (articles.length === 0) return <p>No articles available.</p>;

  return (
    <div className="delete-articles">
      {articles.map(article => (
        <div key={article.id} className="article-card">
          <h2>{article.title}</h2>
          <p>{article.content.substring(0, 100)}...</p>
          <div className="tags">
            {article.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <button onClick={() => handleDelete(article.id)} className="delete-button">Delete</button>
        </div>
      ))}
    </div>
  );
}

export default DeleteArticle;