import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content">
            <aside>
                <p className="text-2xl font-bold">Veridium</p>
                <p>Corporate Asset Management System</p>
                <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
            </aside> 
            <nav>
                <h6 className="footer-title">Quick Links</h6> 
                <Link to="/" className="link link-hover">Home</Link>
                <Link to="/join-hr" className="link link-hover">Join as HR</Link>
                <Link to="/login" className="link link-hover">Login</Link>
            </nav> 
            <nav>
                <h6 className="footer-title">Contact</h6> 
                <a className="link link-hover">Email: support@veridium.com</a>
                <a className="link link-hover">Phone: +1-555-1234</a>
            </nav>
        </footer>
    );
};

export default Footer;