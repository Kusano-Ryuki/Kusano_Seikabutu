import React, { useState } from 'react';
import SwipeCard from './pages/SwipeCard';
import Header from './pages/Header';
import Search from './component/Search';
import Card01 from './pages/Card01';
import Card02 from './pages/Card02';
import Card03 from './pages/Card03';
import Card04 from './pages/Card04';
import './css/App.css';

const Card1 = () => (
  <div>
    <Card01 />
  </div>
);

const Card2 = () => (
  <div>
    <Card02 />
  </div>
);

const Card3 = () => (
  <div>
    <Card03 />
  </div>
);

const Card4 = () => (
  <div>
    <Card04 />
  </div>
);

function App() {
  const [cards, setCards] = useState([
    { id: 1, content: <Card1 /> },
    { id: 2, content: <Card2 /> },
    { id: 3, content: <Card3 /> },
    { id: 4, content: <Card4 /> },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftButton = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const handleRightButton = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  return (
    <div className="App">
      <Header />
      <Search />
      <div className="card-container">
        {cards.map((card, index) => {
          if (index === currentIndex) {
            return (
              <SwipeCard
                key={card.id}
                content={card.content}
                style={{ zIndex: cards.length - index }}
              />
            );
          }
          return null;
        })}
      </div>
      <div className="button-container">
        <button className="left-button" onClick={handleLeftButton}>
          <img className="button-img" src="/left.png" alt="Left" />
        </button>
        <button className="like-button">
          <img className="button-img" src="/like.png" alt="Like" />
        </button>
        <button className="right-button" onClick={handleRightButton}>
          <img className="button-img" src="/right.png" alt="Right" />
        </button>
      </div>
    </div>
  );
}

export default App;
