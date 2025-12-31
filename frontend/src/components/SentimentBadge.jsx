import React from 'react';

const SentimentBadge = ({ sentiment }) => {
  const getStyles = () => {
    switch (sentiment) {
      case 'Positive':
        return {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#ffffff',
          icon: '😊'
        };
      case 'Negative':
        return {
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: '#ffffff',
          icon: '😟'
        };
      case 'Neutral':
      default:
        return {
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: '#ffffff',
          icon: '😐'
        };
    }
  };

  const styles = getStyles();

  return (
    <span 
      className="sentiment-badge"
      style={{
        background: styles.background,
        color: styles.color,
        padding: '0.35rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <span>{styles.icon}</span>
      {sentiment}
    </span>
  );
};

export default SentimentBadge;
