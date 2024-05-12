import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/notfound.css'; // You can create your own CSS file for styling
import { FaExclamationTriangle } from 'react-icons/fa';
const NotFound = () => {
  return (
    <div className="container">
      <div className="card">
        <span><FaExclamationTriangle className="fas fa-exclamation-triangle"/><h1>404</h1></span>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link className='links' to="/">{"< "}Go back</Link>
      </div>
    </div>
  );
};

export default NotFound;
