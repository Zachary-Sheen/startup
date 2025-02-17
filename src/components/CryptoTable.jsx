import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CryptoTable = () => {
    const [data, setData] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const [favoriteCryptos, setFavoriteCryptos] = useState({});

    const fetchCryptoData = () => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1")
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error("Error fetching data:", error));
    };

    useEffect(() => {
        fetchCryptoData();
        
        // Fetch data every hour
        const intervalId = setInterval(fetchCryptoData, 3600000);
        
        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favoriteCryptos');
        try {
            if (storedFavorites) {
                setFavoriteCryptos(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error("Error parsing favoriteCryptos from localStorage:", error);
            setFavoriteCryptos({});
        }
    }, []);

    const handleRowClick = (crypto) => {
        setSelectedCrypto(crypto);
    };

    const handleBackClick = () => {
        setSelectedCrypto(null);
    };

    const handleFavorite = (selectedCryptoCurr) => {
        const updatedFavorites = { ...favoriteCryptos };
        if (updatedFavorites[selectedCryptoCurr.symbol]) {
            delete updatedFavorites[selectedCryptoCurr.symbol];
        } else {
            updatedFavorites[selectedCryptoCurr.symbol] = selectedCryptoCurr;
        }
        setFavoriteCryptos(updatedFavorites);
        localStorage.setItem('favoriteCryptos', JSON.stringify(updatedFavorites));
    };

    const isFavorite = (symbol) => {
        return favoriteCryptos.hasOwnProperty(symbol);
    };

    const emptyStar = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
        </svg>
    );

    const filledStar = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
    );

    if (selectedCrypto) {
        return (
            <div className="crypto-details">
                <button className="btn btn-secondary mb-3" onClick={handleBackClick}>Back to Table</button>
                <h2>{selectedCrypto.name} Details <button onClick={() => handleFavorite(selectedCrypto)}>{isFavorite(selectedCrypto.symbol) ? filledStar : emptyStar}</button></h2>
                <img src={selectedCrypto.image} alt={selectedCrypto.name} style={{ width: '50px', height: '50px' }} />
                <p><strong>Symbol:</strong> {selectedCrypto.symbol.toUpperCase()}</p>
                <p><strong>Current Price:</strong> ${selectedCrypto.current_price}</p>
                <p><strong>Market Cap:</strong> ${selectedCrypto.market_cap}</p>
                <p><strong>24H Volume:</strong> ${selectedCrypto.total_volume}</p>
                <p><strong>24H Change Percentage:</strong> {selectedCrypto.price_change_percentage_24h}%</p>
                <p><strong>All-Time High:</strong> ${selectedCrypto.ath}</p>
                <p><strong>All-Time High Change Percentage:</strong> {selectedCrypto.ath_change_percentage}%</p>
                <p><strong>All-Time High Date:</strong> {new Date(selectedCrypto.ath_date).toLocaleString()}</p>
                <p><strong>All-Time Low:</strong> ${selectedCrypto.atl}</p>
                <p><strong>All-Time Low Change Percentage:</strong> {selectedCrypto.atl_change_percentage}%</p>
                <p><strong>All-Time Low Date:</strong> {new Date(selectedCrypto.atl_date).toLocaleString()}</p>
                <p><strong>Circulating Supply:</strong> {selectedCrypto.circulating_supply}</p>
                <p><strong>Max Supply:</strong> {selectedCrypto.max_supply}</p>
                <p><strong>Total Supply:</strong> {selectedCrypto.total_supply}</p>
                <p><strong>Market Cap Rank:</strong> {selectedCrypto.market_cap_rank}</p>
                <p><strong>Last Updated:</strong> {new Date(selectedCrypto.last_updated).toLocaleString()}</p>
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover table-striped table-bordered" id="cryptoTable"> 
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
                        <tr key={crypto.id} onClick={() => handleRowClick(crypto)}>
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