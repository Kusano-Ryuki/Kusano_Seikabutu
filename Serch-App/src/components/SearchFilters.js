import React, { useState } from 'react';
import Select from 'react-select';

const filters = [
  { value: '国内', label: '国内' },
  { value: '海外', label: '海外' },
  { value: '都市', label: '都市' },
  { value: 'リゾート', label: 'リゾート' },
  { value: '自然', label: '自然' },
  { value: '山', label: '山' },
  { value: '海', label: '海' },
  { value: '川・湖', label: '川・湖' },
  { value: '星空', label: '星空' },
  { value: 'グルメ', label: 'グルメ' },
  { value: '歴史', label: '歴史' },
  { value: '伝統', label: '伝統' },
  { value: '祭り', label: '祭り' },
  { value: '城', label: '城' },
  { value: '温泉', label: '温泉' }
];

function SearchFilters({ onFilterChange, onSearchChange }) {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectChange = (selectedOptions) => {
    const newFilters = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="search-filters">
      <input
        type="text"
        placeholder="検索..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <Select
        isMulti
        options={filters}
        className="tag-dropdown"
        classNamePrefix="select"
        onChange={handleSelectChange}
      />
    </div>
  );
}

export default SearchFilters;