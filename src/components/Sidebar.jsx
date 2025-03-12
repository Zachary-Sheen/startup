import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lineicons/dist/lineicons.css';
import './styles.css';
import './scripts.js';

const Sidebar = () => {
    const [username, setUsername] = React.useState('');
    const [authed, setAuthed] = React.useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        // if(window.location.pathname === '/login' || window.location.pathname === '/signup') {
        //     return;
        // }
        fetch('/api/authenticated', {
            credentials: 'include', 
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    if (data.error === 'Unauthorized') {
                        setUsername('Account');
                        if(window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
                            navigate('/login');
                        } 
                    } else {
                        setUsername(data.username);
                        setAuthed(true);
                    }
                }
            })
            .catch((err) => {
                console.error('Error fetching authenticated:', err);
            });
        }, []);


    const handleNavigation = (e, path) => {
        e.preventDefault();
        if ((path === '/login' || path === '/signup') && authed) {
            console.log('Already logged in');
        }
        else if((path === 'chatroom' || path === 'dashboard') && !authed) {
            console.log('Not logged in');
        }
        else {
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
                    <Link to="/login" onClick={(e) => handleNavigation(e, '/login')} className="sidebar-link">
                        <i className="lni lni-user-4"></i>
                        Login
                    </Link>
                </li>
                <li className="sidebar-item">
                    <Link to="/signup" onClick={(e) => handleNavigation(e, '/signup')} className="sidebar-link">
                        <i className="lni lni-enter"></i>
                        Sign-up
                    </Link>
                </li>
                <li className = "sidebar-header">
                    Sign Out
                </li>
                <li className="sidebar-item">
                    <Link to = "/"  className = "sidebar-link" onClick={(e) => {
                        if (!authed) {
                            e.preventDefault();
                            return;
                        } else {
                            fetch('/api/logout', {
                                method: 'DELETE', 
                                credentials: 'include', 
                            })
                            .then((res) => res.json())
                            .then((data) => {
                                navigate('/');
                            })
                            .catch((err) => {
                                console.error('Error logging out:', err);
                            });
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