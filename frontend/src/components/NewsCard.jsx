import React from 'react';
import SentimentBadge from './SentimentBadge';
import CategoryChip from './CategoryChip';

const NewsCard = ({ article }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="news-card">
      <div className="card-header">
        <div className="card-meta">
          <CategoryChip category={article.category} />
          <span className="card-date">{formatDate(article.publishDate)}</span>
        </div>
        <SentimentBadge sentiment={article.sentimentLabel} />
      </div>

      <h2 className="card-title">{article.title}</h2>
      
      <p className="card-description">{article.description}</p>

      <div className="card-footer">
        <span className="card-source">{article.source}</span>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="card-link"
        >
          Read Full Article →
        </a>
      </div>
    </article>
  );
};

export default NewsCard;
