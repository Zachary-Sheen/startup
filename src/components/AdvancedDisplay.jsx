import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdvancedDisplay = () => {
    const [data, setData] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState(null);

    function getCryptoData() {
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
    }

    function getGraph(crypto) {
        setSelectedCrypto(crypto);
    }

    useEffect(() => {
        getCryptoData();
    }, []);

    return (
        <div className="accordion" id="accordionExample">
            {data.map((crypto, index) => {
                return (
                    <div className="accordion-item" key={index}>
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                                aria-expanded="true"
                                aria-controls={`collapse${index}`}
                                onClick={() => getGraph(crypto)} 
                            >
                                {crypto.name}
                            </button>
                        </h2>
                        <div
                            id={`collapse${index}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                <strong>Price: {crypto.current_price}</strong>
                                {selectedCrypto && selectedCrypto.symbol === crypto.symbol && (
                                    <iframe
                                        src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=${toUpperCase(crypto.symbol)}USD&interval=D&theme=dark&style=1&locale=en&toolbar_bg=f1f3f6&hide_top_toolbar=false&hide_legend=false`}
                                        width="100%"
                                        height="500"
                                        allowTransparency="true"
                                    ></iframe>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AdvancedDisplay;