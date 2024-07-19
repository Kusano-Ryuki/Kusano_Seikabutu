import React from 'react';
import '../css/Search.css';

const Search = () => {
  return (
    <form className="search-form">
      <div className="search-input-container">
        <input type="text" placeholder="検索" className="search-input" />
        <button type="submit" className="search-button">検索</button>
      </div>
    </form>
  );
};

export default Search;
