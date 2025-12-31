import React from 'react';

const CategoryChip = ({ category }) => {
  const getStyles = () => {
    switch (category) {
      case 'Politics':
        return {
          background: '#dbeafe',
          color: '#1e40af',
          borderColor: '#93c5fd'
        };
      case 'Business':
        return {
          background: '#fce7f3',
          color: '#be185d',
          borderColor: '#f9a8d4'
        };
      case 'Technology':
        return {
          background: '#e0e7ff',
          color: '#4338ca',
          borderColor: '#a5b4fc'
        };
      case 'Sports':
        return {
          background: '#dcfce7',
          color: '#15803d',
          borderColor: '#86efac'
        };
      case 'Health':
        return {
          background: '#fef3c7',
          color: '#92400e',
          borderColor: '#fde68a'
        };
      case 'Other':
      default:
        return {
          background: '#f3f4f6',
          color: '#374151',
          borderColor: '#d1d5db'
        };
    }
  };

  const styles = getStyles();

  return (
    <span 
      className="category-chip"
      style={{
        background: styles.background,
        color: styles.color,
        border: `1.5px solid ${styles.borderColor}`,
        padding: '0.25rem 0.6rem',
        borderRadius: '12px',
        fontSize: '0.7rem',
        fontWeight: '600',
        display: 'inline-block',
        textTransform: 'uppercase',
        letterSpacing: '0.3px'
      }}
    >
      {category}
    </span>
  );
};

export default CategoryChip;
