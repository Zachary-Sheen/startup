import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lineicons/dist/lineicons.css';
import './styles.css';
import './scripts.js';

const Sidebar = () => {
    const [username, setUsername] = React.useState('');
    const navigate = useNavigate();
    
        useEffect(() => {
            // const data = localStorage.getItem('accountData');
            // const storedUsername = data ? JSON.parse(data).username : null;
            const storedUsername = localStorage.getItem('usernameDisplay') ? localStorage.getItem('usernameDisplay') : 'Account';
            const authed = localStorage.getItem('authenticated') === 'true';

            if (storedUsername && authed) {
                setUsername(storedUsername);
            } else {
                setUsername('Account');
            }
        }, []);

    const checkAuthed = () => {
        const authed = localStorage.getItem('authenticated') === 'true';
        console.log('Authed:', authed);
        if (authed) {
            return true;
        }
        return false;
    };

    const handleNavigation = (e, path) => {
        e.preventDefault();
        if (checkAuthed()) {
            navigate(path);
        }
    };

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
                    <Link to="/dashboard"  onClick={(e) => handleNavigation(e, '/dashboard')} className="sidebar-link">
                        <i className="lni lni-dashboard-square-1"></i>
                        Dashboard
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/chatroom"  onClick={(e) => handleNavigation(e, '/chatroom')} className="sidebar-link">
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
                <li className = "sidebar-header">
                    Sign Out
                </li>
                <li className="sidebar-item">
                    <Link to = "/"  className = "sidebar-link" onClick={(e) => {
                        const authed = localStorage.getItem('authenticated') === 'true';
                        if (!authed) {
                            e.preventDefault();
                            return;
                        } else {
                            localStorage.setItem('authenticated', false);
                            window.location.href = '/';
                        }
                    }
                    }>
                        <i className="lni lni-exit"></i>
                        Sign Out
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