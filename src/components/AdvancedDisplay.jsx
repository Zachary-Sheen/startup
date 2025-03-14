import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // For icons
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
        <div className="accordion" id="accordionExample">
            {data.map((crypto, index) => (
                <div className="accordion-item bg-dark border-secondary text-white" key={index}>
                    <h2 className="accordion-header">
                        <button
                            className={`accordion-button bg-black text-white border-secondary ${selectedCrypto && selectedCrypto.symbol === crypto.symbol ? '' : 'collapsed'}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded={selectedCrypto && selectedCrypto.symbol === crypto.symbol}
                            aria-controls={`collapse${index}`}
                            onClick={() => handleAccordionClick(crypto)}
                        >
                            <img src={crypto.image} alt={crypto.name} className="crypto-icon me-2" style={{ height: '40px', width: '40px' }}/>
                            {crypto.name} ({crypto.symbol.toUpperCase()})
                        </button>
                    </h2>
                    <div
                        id={`collapse${index}`}
                        className={`accordion-collapse collapse ${selectedCrypto && selectedCrypto.symbol === crypto.symbol ? 'show' : ''}`}
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body bg-secondary text-black">
                            <strong><p>Market Cap: ${crypto.market_cap.toLocaleString()}</p></strong>
                            <p>24h High: ${crypto.high_24h.toLocaleString()}</p>
                            <p>24h Low: ${crypto.low_24h.toLocaleString()}</p>
                            <p>24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%</p>
                            {selectedCrypto && selectedCrypto.symbol === crypto.symbol && (
                                <iframe
                                    src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=${crypto.symbol.toUpperCase()}USD&interval=D&theme=dark&style=1&locale=en&toolbar_bg=f1f3f6&hide_top_toolbar=false&hide_legend=false`}
                                    width="100%"
                                    height="500"
                                    allowtransparency="true"
                                    className="border-0 rounded"
                                ></iframe>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdvancedDisplay;
