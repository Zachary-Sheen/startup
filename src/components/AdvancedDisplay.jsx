import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './styles.css';
import './cryptoChartStyles.css';

const AdvancedDisplay = () => {
    const [data, setData] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState(null);

    useEffect(() => {
        fetch('/api/cryptoData', {
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
            setData(data.cryptoData.Data);
        })
        .catch((err) => {
            console.error('Error fetching crypto data:', err);
        });
    }, []);

    const handleAccordionClick = (crypto) => {
        setSelectedCrypto(prevCrypto => 
            prevCrypto && prevCrypto.symbol === crypto.symbol ? null : crypto
        );
    };

    return (
        <div className="accordion black-white-theme" id="accordionExample">
            {data.map((crypto, index) => (
                <div className="accordion-item" key={index}>
                    <h2 className="accordion-header">
                        <button
                            className={`accordion-button ${selectedCrypto && selectedCrypto.symbol === crypto.symbol ? '' : 'collapsed'}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded={selectedCrypto && selectedCrypto.symbol === crypto.symbol}
                            aria-controls={`collapse${index}`}
                            onClick={() => handleAccordionClick(crypto)}
                        >
                            <img src={crypto.image} alt={crypto.name} className="crypto-icon me-2"/>
                            {crypto.name} ({crypto.symbol.toUpperCase()})
                        </button>
                    </h2>
                    <div
                        id={`collapse${index}`}
                        className={`accordion-collapse collapse ${selectedCrypto && selectedCrypto.symbol === crypto.symbol ? 'show' : ''}`}
                        data-bs-parent="#accordionExample"
                    >
                        
                        <div className="accordion-body">
                            <div className="trading-chart">
                                <ul className = "crypto-info">
                                    {/* <li>Current Price: <span className='crypto-data'>${crypto.current_price.toLocaleString()}</span></li> */}
                                    <li>Market Cap: ${crypto.market_cap.toLocaleString()}</li>
                                    <li>24h High: ${crypto.high_24h.toLocaleString()}</li>
                                    <li>24h Low: ${crypto.low_24h.toLocaleString()}</li>
                                    <li>24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%</li>
                                </ul>
                            </div>
                            <hr></hr>
                            {selectedCrypto && selectedCrypto.symbol === crypto.symbol && (
                                <div className="trading-chart">
                                    <iframe
                                        src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=${crypto.symbol.toUpperCase()}USD&interval=D&theme=dark&style=1&locale=en&toolbar_bg=f1f3f6&hide_top_toolbar=false&hide_legend=false`}
                                        width="100%"
                                        height="500"
                                        allowtransparency="true"
                                        className="border-0 rounded"
                                    ></iframe>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdvancedDisplay;