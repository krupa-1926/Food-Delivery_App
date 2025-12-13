import React from 'react'
import './Header.css'

const Header = () => {

  const handleViewMenu = () => {
    document.getElementById("food-display")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Similique dolorem, dicta itaque iure fugiat architecto.
        </p>
        <button onClick={handleViewMenu}>View Menu</button>
      </div>
    </div>
  )
}

export default Header
