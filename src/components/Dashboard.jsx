import React, { useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lineicons/dist/lineicons.css';
import CryptoTable from './CryptoTable';
import './styles.css';
import "./scripts.js";

const Dashboard = () => {

    const [username, setUsername] = React.useState('');

    useEffect(() => {
        const data = localStorage.getItem('accountData');
        if(data) {
            const parsedData = JSON.parse(data);
            const storedUsername = parsedData.username;
            const sessionStartTime = parsedData.sessionStartTime;
            const currentTime = new Date().getTime();
            if (currentTime - sessionStartTime > 3600000) {
                // alert('Session expired. Please log in again.');
                window.location.href = '/login';
            } else {
                setUsername(storedUsername);
            }
        }
        else
        {
            window.location.href = '/login';
        }
    }, []);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="main">
                <nav className="navbar navbar-expand" id="heading">
                    <button className="toggler-btn" type="button">
                        <i className="lni lni-menu-cheesburger"></i>
                    </button>
                    <h2 className="mx-auto">Welcome back, <span id="userName"><strong>{username}!</strong></span></h2>
                </nav>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <div className="box bg-dark text-white p-3 rounded">
                                <h5>Favorite Cryptocurrencies ⭐</h5>
                                <ul>
                                    <li>Bitcoin (BTC)</li>
                                    <li>Ethereum (ETH)</li>
                                    <li>Ripple (XRP)</li>
                                    <li>Litecoin (LTC)</li>
                                    <li>Cardano (ADA)</li>
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
                                <p>Read the latest messages and notifications from the chat.</p>
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