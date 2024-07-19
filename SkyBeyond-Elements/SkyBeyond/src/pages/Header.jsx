import React, { useState } from 'react';
import '../css/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="hamburger-menu" onClick={toggleDropdown}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {isOpen && (
        <div className="dropdown-content">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      )}
      <div className='service-titles'>
        <span className='sab-title'>One&ensp;day,&ensp;Somewhere</span>
        <h1 className='main-title'>SKY&ensp;BEYOND</h1>
      </div>
      <div className='user-info'>
        <p>user</p>
      </div>
    </header>
  );
};

export default Header;
