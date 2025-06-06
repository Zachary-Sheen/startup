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

    const handleClicked = (crypto) => {
        setSelectedCrypto(crypto); 
    };

    return (
        <div className="container">
            <div className="row">
                {data.map((crypto, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card h-100 cryptocards hover" style={{ maxWidth: '100%' }}>
                            <div className="row g-0">
                                <div className="col-md-4 d-flex justify-content-center align-items-center padded">
                                    <img src={crypto.image} className="img-fluid rounded-start" alt={crypto.name} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{crypto.name} ({crypto.symbol.toUpperCase()})</h5>
                                        <ul className="crypto-info">
                                            <li>Market Cap: ${crypto.market_cap.toLocaleString()}</li>
                                            <li>24h High: ${crypto.high_24h.toLocaleString()}</li>
                                            <li>24h Low: ${crypto.low_24h.toLocaleString()}</li>
                                            <li>24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%</li>
                                        </ul>
                                        <button
                                            className="btn submit-btn mt-auto align-self-end"
                                            onClick={() => handleClicked(crypto)}
                                        >
                                            View Chart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Render modal when selectedCrypto exists */}
            {selectedCrypto && (
                <div
                    className="modal fade show"
                    style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    tabIndex="-1"
                    aria-labelledby="cryptoChartModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content dark-modal">
                            <div className="modal-header">
                                <h5 className="modal-title" id="cryptoChartModalLabel">
                                    {selectedCrypto.name} ({selectedCrypto.symbol.toUpperCase()})
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setSelectedCrypto(null)} // Close the modal
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <iframe
                                    src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=${selectedCrypto.symbol.toUpperCase()}USD&interval=D&theme=dark&style=1&locale=en&toolbar_bg=f1f3f6&hide_top_toolbar=false&hide_legend=false`}
                                    width="100%"
                                    height="400"
                                    allowtransparency="true"
                                    className="border-0 rounded"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvancedDisplay;