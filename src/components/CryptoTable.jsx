import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CryptoTable = () => {
    const [data, setData] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const [favoriteCryptos, setFavoriteCryptos] = useState({});

    const fetchCryptoData = () => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1")
            .then(response => response.json())
            .then(info => {
                console.log(info);
                setData(info);
                fetch('/api/cryptoData', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cryptoData: info }) 
                })
                .then((res) => res.json())
                .then((info) => {
                    console.log(info);
                })
                .catch((err) => {
                    console.error('Error saving cryptoData:', err);
                });
            })
            .catch(error => console.error("Error fetching data:", error));
    };

    useEffect(() => {
        fetch('api/cryptoData', {
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((info) => {
            console.log(info);
            console.log("is the data empty: " + info.isempty );
            console.log("is the data empty: " + info.cryptoData.Date );
            if (info.isempty || new Date() - new Date(info.cryptoData.date) > 3600000)
            {
                console.log("fetching data again")
                fetchCryptoData();
            }
            else 
            {
                console.log(info.cryptoData);
                setData(info.cryptoData.Data);
            }
        })
        .catch((err) => {
            console.error('Error fetching cryptoData:', err);
        });
        console.log(data)
        // const cryptoData = localStorage.getItem('CryptoData');
        // if (cryptoData) {
        //     try {
        //         const parsedCryptoData = JSON.parse(cryptoData);
        //         if (Object.keys(parsedCryptoData).length === 0 || new Date() - new Date(parsedCryptoData.Date) > 3600000) {
        //             fetchCryptoData();
        //         } else {
        //             setData(parsedCryptoData.Data);
        //         }
        //     } catch (error) {
        //         console.error("Error parsing CryptoData from localStorage:", error);
        //         fetchCryptoData();
        //     }
        // } else {
        //     fetchCryptoData();
        // }
    }, []);

    useEffect(() => {
        fetch('api/favorites', {
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if(data){
                setFavoriteCryptos(data);
            }
            else
            {
                setFavoriteCryptos({});
            }
        })
        .catch((err) => {
            console.error('Error fetching favorites:', err);
        });
        // const storedFavorites = localStorage.getItem('favoriteCryptos');
        // try {
        //     if (storedFavorites) {
        //         setFavoriteCryptos(JSON.parse(storedFavorites));
        //     }
        // } catch (error) {
        //     console.error("Error parsing favoriteCryptos from localStorage:", error);
        //     setFavoriteCryptos({});
        // }
    }, []);

    const handleRowClick = (crypto) => {
        setSelectedCrypto(crypto);
    };

    const handleBackClick = () => {
        setSelectedCrypto(null);
    };

    const handleFavorite = (selectedCryptoCurr) => {
        const updatedFavorites = { ...favoriteCryptos };
        fetch('api/favorites', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedCryptoCurr)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            // if(updatedFavorites[selectedCryptoCurr.symbol]) {
            //     delete updatedFavorites[selectedCryptoCurr.symbol];
            // }
            // else {
            //     updatedFavorites[selectedCryptoCurr.symbol] = selectedCryptoCurr;
            // }
            setFavoriteCryptos(data);
        })
        .catch((err) => {
            console.error('Error saving favorite:', err);
        });

        // if (updatedFavorites[selectedCryptoCurr.symbol]) {
        //     delete updatedFavorites[selectedCryptoCurr.symbol];
        // } else {
        //     updatedFavorites[selectedCryptoCurr.symbol] = selectedCryptoCurr;
        // }
        // setFavoriteCryptos(updatedFavorites);
        // localStorage.setItem('favoriteCryptos', JSON.stringify(updatedFavorites));
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
            <div className="crypto-details container mt-4">
            <button className="btn btn-outline-primary mb-4" onClick={handleBackClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                    <path d="M8 12a.75.75 0 0 0 .75-.75V4.707l4.146 4.147a.75.75 0 0 0 1.061-1.06l-5-5a.75.75 0 0 0-1.061 0l-5 5a.75.75 0 0 0 1.061 1.06L7.25 4.707V11.25a.75.75 0 0 0 .75.75z"/>
                </svg> 
                 Back to Table
            </button>

            <div className="card shadow-lg p-4">
                <div className="d-flex align-items-center">
                    <img src={selectedCrypto.image} alt={selectedCrypto.name} className="crypto-logo" />
                    <h2 className="ms-3 d-flex align-items-center">
                        {selectedCrypto.name} Details
                        <button className="btn btn-link ms-3 favorite-btn" onClick={() => handleFavorite(selectedCrypto)}>
                            <i className={`fs-3 favorite-star ${isFavorite(selectedCrypto.symbol) ? 'filled' : ''}`}>{isFavorite(selectedCrypto.symbol) ? filledStar : emptyStar}</i>
                        </button>
                    </h2>
                </div>

                    <div className="table-responsive mt-4">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Attribute</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Symbol</strong></td>
                                    <td className="text-secondary">{selectedCrypto.symbol.toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <td><strong>Current Price</strong></td>
                                    <td className="text-secondary">${selectedCrypto.current_price}</td>
                                </tr>
                                <tr>
                                    <td><strong>Market Cap</strong></td>
                                    <td className="text-secondary">${selectedCrypto.market_cap}</td>
                                </tr>
                                <tr>
                                    <td><strong>Market Cap Rank</strong></td>
                                    <td className="text-secondary">{selectedCrypto.market_cap_rank}</td>
                                </tr>
                                <tr>
                                    <td><strong>24H Volume</strong></td>
                                    <td className="text-success">${selectedCrypto.total_volume}</td>
                                </tr>
                                <tr>
                                    <td><strong>24H Change Percentage</strong></td>
                                    <td className={selectedCrypto.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'}>
                                        {selectedCrypto.price_change_percentage_24h}%
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>All-Time High</strong></td>
                                    <td className="text-success">${selectedCrypto.ath}</td>
                                </tr>
                                <tr>
                                    <td><strong>All-Time High Change Percentage</strong></td>
                                    <td className={selectedCrypto.ath_change_percentage > 0 ? 'text-success' : 'text-danger'}>
                                        {selectedCrypto.ath_change_percentage}%
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>All-Time High Date</strong></td>
                                    <td>{new Date(selectedCrypto.ath_date).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td><strong>All-Time Low</strong></td>
                                    <td className="text-danger">${selectedCrypto.atl}</td>
                                </tr>
                                <tr>
                                    <td><strong>All-Time Low Change Percentage</strong></td>
                                    <td className={selectedCrypto.atl_change_percentage > 0 ? 'text-success' : 'text-danger'}>
                                        {selectedCrypto.atl_change_percentage}%
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>All-Time Low Date</strong></td>
                                    <td>{new Date(selectedCrypto.atl_date).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td><strong>Circulating Supply</strong></td>
                                    <td className="text-secondary">{selectedCrypto.circulating_supply}</td>
                                </tr>
                                <tr>
                                    <td><strong>Max Supply</strong></td>
                                    <td className="text-secondary">{selectedCrypto.max_supply}</td>
                                </tr>
                                <tr>
                                    <td><strong>Total Supply</strong></td>
                                    <td className="text-secondary">{selectedCrypto.total_supply}</td>
                                </tr>
                                <tr>
                                    <td><strong>Last Updated</strong></td>
                                    <td>{new Date(selectedCrypto.last_updated).toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
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