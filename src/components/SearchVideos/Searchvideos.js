import React, { useState } from 'react';

const SearchVideos = ({ handleSearch }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query, category);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search videos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All categories</option>
          <option value="education">Education</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchVideos;
