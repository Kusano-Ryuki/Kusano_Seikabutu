import React from 'react';
import '../css/SwipeCard.css';

const SwipeCard = ({ content, style }) => {
  return (
    <div className="swipe-card" style={style}>
      {content}
    </div>
  );
};

export default SwipeCard;
