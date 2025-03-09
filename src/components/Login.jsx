import React from 'react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lineicons/dist/lineicons.css';
import './styles.css';
import "./scripts.js";
import bcrypt from 'bcryptjs';

const Login = () => {
    const navigate = useNavigate();

    async function verifyPassword(password) {
        try {
            const data = JSON.parse(localStorage.getItem('accountData'));
            const hash = data['hashedPassword'];
            const result = await bcrypt.compare(password, hash);
            return result;
        } catch (err) {
            console.error('Error verifying password:', err);
            return false;
        }
    }

    function checkLogin(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        // const usernamedisplay = username;
        fetch('/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.message === 'Login successful')
            {
                navigate("/chatroom");  
            }
            else
            {
                navigate("/signup");
            }
        });
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="main">
                <nav className="navbar navbar-expand" id="heading">
                    <button className="toggler-btn" type="button" > {/* onClick="toggleMenu()" */}
                        <i className="lni lni-menu-cheesburger"></i>
                    </button>
                    <h2 className="mx-auto"><strong>Login</strong></h2>
                </nav>
                <form method="post" onSubmit={checkLogin}> 
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '75vh', marginTop: '10vh' }}>
                        <div className="card text-center cardstyle shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                            <div className="card-header">
                                Input Information
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Login</h5>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="username" className="form-control" id="username" placeholder="Enter your username" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter your password" required />
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-dark w-100">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;