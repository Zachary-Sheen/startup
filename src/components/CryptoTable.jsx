import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CryptoTable = () => {
    const [data, setData] = useState([]);

    const fetchCryptoData = () => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1")
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error("Error fetching data:", error));
    };

    useEffect(() => {
        fetchCryptoData();

        // Un heur
        const intervalId = setInterval(fetchCryptoData, 3600000);

        // Once that interval is done we clear it
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-dark-custom" id="cryptoTable">
                <thead>
                    <tr>
                        <th>Cryptocurrency</th>
                        <th>Symbol</th>
                        <th>Current Price</th>
                        <th>Market Cap</th>
                        <th>24H Volume</th>
                        <th>24H Change Percentage</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {data.map((crypto, index) => (
                        <tr key={crypto.id}>
                            <td>{crypto.name}</td>
                            <td>{crypto.symbol.toUpperCase()}</td>
                            <td>${crypto.current_price}</td>
                            <td>{crypto.market_cap}</td>
                            <td>{crypto.total_volume}</td>
                            <td>{crypto.price_change_percentage_24h}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoTable;