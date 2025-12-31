import { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar';
import NewsCard from './components/NewsCard';
import { fetchNews } from './services/api';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSentiment, setSelectedSentiment] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadArticles();
  }, [selectedSentiment, selectedCategory]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNews(selectedSentiment, selectedCategory);
      setArticles(data);
    } catch (err) {
      setError('Failed to fetch news. Please make sure the backend server is running.');
      console.error('Error loading articles:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>
              <span className="title-icon">📰</span>
              AI News Pulse
            </h1>
            <p className="header-subtitle">
              Dynamic News Aggregator with AI-Powered Sentiment Analysis
            </p>
          </div>
          <div className="header-stats">
            <div className="stat">
              <span className="stat-value">{articles.length}</span>
              <span className="stat-label">Articles</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Filter Bar */}
      <FilterBar
        selectedSentiment={selectedSentiment}
        selectedCategory={selectedCategory}
        onSentimentChange={setSelectedSentiment}
        onCategoryChange={setSelectedCategory}
      />

      {/* Main Content */}
      <main className="main-content">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading news articles...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button className="retry-btn" onClick={loadArticles}>
              Try Again
            </button>
          </div>
        ) : articles.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h2>No Articles Found</h2>
            <p>
              No news articles match your current filters. 
              {(selectedSentiment !== 'All' || selectedCategory !== 'All') && (
                <span> Try adjusting your filters to see more results.</span>
              )}
            </p>
            {(selectedSentiment !== 'All' || selectedCategory !== 'All') && (
              <button 
                className="reset-btn"
                onClick={() => {
                  setSelectedSentiment('All');
                  setSelectedCategory('All');
                }}
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="news-grid">
            {articles.map((article) => (
              <NewsCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Built with React 18, Vite 5, Node.js 18, MongoDB, and Google Gemini AI</p>
        <p className="footer-sources">Sources: BBC News, TechCrunch</p>
      </footer>
    </div>
  );
}

export default App;
