import React from 'react';

const FilterBar = ({ 
  selectedSentiment, 
  selectedCategory, 
  onSentimentChange, 
  onCategoryChange 
}) => {
  const sentiments = ['All', 'Positive', 'Neutral', 'Negative'];
  const categories = ['All', 'Politics', 'Business', 'Technology', 'Sports', 'Health', 'Other'];

  return (
    <div className="filter-bar">
      <div className="filter-container">
        <div className="filter-section">
          <label className="filter-label">
            <span className="filter-icon">💭</span>
            Sentiment
          </label>
          <div className="filter-buttons">
            {sentiments.map(sentiment => (
              <button
                key={sentiment}
                className={`filter-btn ${selectedSentiment === sentiment ? 'active' : ''}`}
                onClick={() => onSentimentChange(sentiment)}
              >
                {sentiment}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-divider"></div>

        <div className="filter-section">
          <label className="filter-label">
            <span className="filter-icon">📁</span>
            Category
          </label>
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
