import React from 'react';
import '../css/Card01.css';

const Card01 = () => {
  return (
    <div className="card01">
      <div className="card01-image" style={{ backgroundImage: `url('/Okinawa.png')` }}>
        <div className="card01-header">
          <span className="card01-title">沖縄</span>
          <span className="card01-subtitle">夏といえばここだよね</span>
        </div>
      </div>
      <div className="card01-content">
        <div className="card01-price">9.9万円～</div>
        <div className="card01-ratings">
          <div className="card01-rating">
            <span>飲食店数</span>
            <span>★★★★☆</span>
          </div>
          <div className="card01-rating">
            <span>ホテル数</span>
            <span>★★★★★</span>
          </div>
          <div className="card01-rating">
            <span>観光スポット</span>
            <span>★★★★☆</span>
          </div>
          <div className="card01-rating">
            <span>歴史</span>
            <span>★★★☆☆</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card01;
