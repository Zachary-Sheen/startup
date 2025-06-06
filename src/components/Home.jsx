import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lineicons/dist/lineicons.css';
import './homepgstyle.css';

const Home = () => {
    const navigate = useNavigate();
    const [authed, setAuthed] = React.useState(false);
    useEffect(() => {
        fetch('/api/authenticated', {
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if(data){
                if (!data.authenticated) {
                    setAuthed(false);
                }
                else{
                    setAuthed(true);
                }
            }
        })
        .catch((err) => {
            console.log('Error fetching authenticated:', err);
        });
    }, []);
    function checkLogin(path) 
    {
        if(path == '/chatroom' || path == '/dashboard'){
            if(!authed){
                console.log('Not logged in');
                return false;
            }
            else{
                return true;
            }
        }
        else if(path == '/login' || path == '/signup'){
            if(authed){
                console.log('Already logged in');
                return false;
            }
            else{
                return true;
            }
        }
        else{
            return true;
        }
    }
    

    const handleNavigation = (e, path) => {
        e.preventDefault();
        if (checkLogin(path)) {
            navigate(path);
        }
    };

    return (
        <div>
            <div className="header">
                <div className="inner_header">
                    <div className="logo">
                        <h1>Crypto<span>Haven</span><sup>&reg;</sup></h1>
                    </div>
                    <ul className="navelements">
                        <Link to="/"><li>Home</li></Link>
                        {authed && (
                            <>
                            <Link to="/dashboard" onClick={(e) => handleNavigation(e, '/dashboard')}><li>Dashboard</li></Link>
                            <Link to="/chatroom" onClick={(e) => handleNavigation(e, '/chatroom')}><li>Chatroom</li></Link>
                            </>
                            )
                        }
                        {!authed && (
                            <>
                        <Link to="/signup"><li>Sign Up</li></Link>
                        <Link to="/login"><li>Login</li></Link>
                        </>)
                        }
                        {/* <Link to="/account"><li>Account</li></Link> */}
                    </ul>
                </div>
            </div>
            <main>
                <div id="welcome">
                    <h1 id="welcometext">Welcome to CryptoHaven</h1>
                    <div className="intro">
                        <h2 id="intromain">Interested?</h2>
                        <p id="introsub"><a href="/signup" id="signup">Sign up</a> today to start tracking and conversing about cryptocurrencies</p>
                    </div>
                </div>
                <div className="subcontent">
                    <div className="box">
                        <h2 id="boxheader">Why CryptoHaven?</h2>
                        <p id="subbox">CryptoHaven is a website that will allow its users to track and converse about cryptocurrencies in real time. It will allow people to talk about certain currencies and allow them to decide whether one is worth investing through help from others.</p>
                    </div>
                    <div className="box">
                        <h2 id="boxheader">Startup</h2>
                        <p id="subbox">As an assignment for a class at BYU, specifically CS260 with Lee Jensen, I created a website where people can converse about trending cryptocurrencies and decide whether they are worth investing with help from insight from other users.</p>
                    </div>
                    <div className="box">
                        <h2 id="boxheader">Technologies</h2>
                        <p id="subbox">HTML, CSS, JavaScript, React, Vite, Express, NodeJS, MongoDB, and WebSocket, hosted through AWS.</p>
                    </div>
                </div>
            </main>
            <footer>
                <span className="text-reset">Made by: Zachary Sheen</span>
                <a href="https://github.com/Zachary-Sheen/startup" id="git">GitHub</a>
            </footer>
        </div>
    );
};

export default Home;