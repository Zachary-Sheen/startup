import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lineicons/dist/lineicons.css';
import AdvancedDisplay from './AdvancedDisplay.jsx';
import './styles.css';
import "./scripts.js";
import './cryptoChartStyles.css';


const CryptoCharts = () => {
        
    useEffect(() => {
        fetch('/api/authenticated', {
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.authenticated) {
                navigate('/login');
            }
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
                    <button className="toggler-btn" type="button">
                        <i className="lni lni-menu-cheesburger"></i>
                    </button>
                    <h2 className="mx-auto"><span id="userName"><strong>Crypto Charts</strong></span></h2>
                </nav>
                <AdvancedDisplay />
            </div>
        </div>
    );
};

export default CryptoCharts;