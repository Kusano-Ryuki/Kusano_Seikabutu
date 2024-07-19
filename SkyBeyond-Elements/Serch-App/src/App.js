import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchFilters from './components/SearchFilters';
import SearchResults from './components/SearchResults';
import ArticleDetail from './pages/ArticleDetail';
import CreateArticle from './pages/CreateArticle';
import DeleteArticle from './pages/DeleteArticle';

function App() {
  const [filters, setFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="app">
        <SearchFilters onFilterChange={setFilters} onSearchChange={setSearchQuery} />
        <Routes>
          <Route path="/" element={<SearchResults filters={filters} searchQuery={searchQuery} />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/register" element={<CreateArticle />} />
          <Route path="/delete" element={<DeleteArticle />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;