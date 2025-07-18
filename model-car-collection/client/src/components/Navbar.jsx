import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Model Car Collection</h2>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/cars">All Cars</Link>
        <Link to="/add">Add Car</Link>
      </div>
    </nav>
  );
};

export default Navbar;
