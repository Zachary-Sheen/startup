import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lineicons/dist/lineicons.css';
import CryptoTable from './CryptoTable';
import './styles.css';
import "./scripts.js";

const Dashboard = () => {

    const [username, setUsername] = React.useState('');
    const [favoriteCryptos, setFavoriteCryptos] = React.useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/favorites', {
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
            setFavoriteCryptos(data.favoriteCryptos);
        })
        .catch((err) => {
            console.error('Error fetching favorites:', err);
        });
        
        fetch('/api/authenticated', {
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.authenticated) {
                navigate('/login');
            }
            setUsername(data.username);
        })
        .catch((err) => {
            console.error('Error fetching authenticated:', err);
        });
    }, []);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="main">
                <nav className="navbar navbar-expand" id="heading">
                    {/* <h2 className="mx-auto">Welcome back, <span id="userName"><strong>{username}!</strong></span></h2> */}
                    <h2 className="ml-auto pagename"><span id="userName">Dashboard</span></h2>
                </nav>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <div className="box bg-dark text-white p-3 rounded" style = {{height: '190px', overflowY: 'scroll'}}>
                                <h5>Favorite Cryptocurrencies ⭐</h5>
                                <ul> 
                                    {Object.entries(favoriteCryptos).map(([symbol, crypto]) => (
                                        <li key={symbol} className="d-flex align-items-center">
                                            <img src={crypto.image} alt={crypto.name} style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                                            <span>{crypto.name} ({symbol.toUpperCase()}) - ${crypto.current_price}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="box bg-dark text-white p-3 rounded" style={{ height: '100%' }}>
                                <h5>Profile</h5>
                                <p>View and edit your profile information.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="box bg-dark text-white p-3 rounded" style={{ height: '100%' }}>
                                <h5>Messages</h5>
                                <p>Read the latest messages and notifications from the <Link to = "/chatroom">chat.</Link></p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="box bg-dark text-white p-3 rounded" style={{ height: '100%' }}>
                                <h5>Settings</h5>
                                <p>Adjust your preferences and settings.</p>
                            </div>
                        </div>
                        <div className="col-md-12 mb-4" style={{ height: '100%' }}>
                            <div className="box bg-dark text-white p-3 rounded" style={{ height: '41vh', overflowY: 'scroll' }}>
                                <h4>Trending Cryptocurrencies</h4>
                                <CryptoTable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;