import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lineicons/dist/lineicons.css';
import './styles.css';
import './scripts.js';

const Sidebar = () => {
    const [username, setUsername] = React.useState('');
    
        useEffect(() => {
            const data = localStorage.getItem('accountData');
            const storedUsername = data ? JSON.parse(data).email : null;
            if (storedUsername) {
                setUsername(storedUsername);
            }
        }, []);
    return (
        <aside id="sidebar" className="sidebar-toggle">
            <div className="sidebar-logo">
                <Link to="#">Navigation</Link>
            </div>
            <ul className="sidebar-nav p-0">
                <li className="sidebar-item">
                    <Link to="/account" className="sidebar-link">
                        <i className="lni lni-user-4"></i>
                        {username ? username : 'Account'} {/* if username exists if not it is account */}
                    </Link>
                </li>
                <li className="sidebar-header">
                    Home
                </li>
                    <li className="sidebar-item">
                        <Link to="/" className="sidebar-link">
                            <i className="lni lni-home-2"></i>
                            Home Page
                        </Link>
                    </li>
                <li className="sidebar-header">
                    Tools
                </li>
                <li className="sidebar-item">
                    <Link to="/dashboard" className="sidebar-link">
                        <i className="lni lni-dashboard-square-1"></i>
                        Dashboard
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/chatroom" className="sidebar-link">
                        <i className="lni lni-message-3-text"></i>
                        Chatroom
                    </Link>
                </li>
                <li className="sidebar-header">
                    Login/Sign-up
                </li>
                <li className="sidebar-item">
                    <Link to="/login" className="sidebar-link">
                        <i className="lni lni-user-4"></i>
                        Login
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/signup" className="sidebar-link">
                        <i className="lni lni-enter"></i>
                        Sign-up
                    </Link>
                </li>
            </ul>
            <div className="sidebar-footer">
                <a href="https://github.com/Zachary-Sheen/startup" className="sidebar-link">
                    <i className="lni lni-github"></i>
                    <span>Zachary Sheen - Github</span>
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;