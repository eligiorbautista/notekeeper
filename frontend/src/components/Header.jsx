import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons from react-icons
import '../styles/header.css';

const Header = () => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const navigate = useNavigate(); // useNavigate hook

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 992 || window.scrollY > 0) {
                if (isDropDownOpen) {
                    setIsDropDownOpen(false);
                }
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleResize);
        };
    }, [isDropDownOpen]);

    const toggleDropDown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    return (
        <header>
            <div className="navbar">
                <div className="logo"><Link to="/" className="nav-link">NoteKeeper</Link></div>
                <ul className="links">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/my-notes" className="nav-link">My Notes</Link></li>
                    <li><Link to="/new-note" className="nav-link">New Note</Link></li>
                </ul>
                <button className="action_btn nav-link" onClick={() => navigate('/logout')}>Logout</button>
                <div className="toggle_btn" onClick={toggleDropDown}>
                    {isDropDownOpen ? <FaTimes /> : <FaBars />} {/* Use react-icons */}
                </div>
            </div>
            <div className={`dropdown_menu ${isDropDownOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/my-notes" className="nav-link">My Notes</Link></li>
                    <li><Link to="/new-note" className="nav-link">New Note</Link></li>
                    <li><button className="action_btn nav-link" onClick={() => navigate('/logout')}>Logout</button></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
