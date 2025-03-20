import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lineicons/dist/lineicons.css';
import './styles.css';
import "./scripts.js";
import bcrypt from 'bcryptjs';

const Signup = () => {

    const navigate = useNavigate();

    async function hashPassword(password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (err) {
            console.error('Error hashing password:', err);
        }
    }
    
    async function setCredentials(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        const hashedPassword = await hashPassword(password);
        const data = {
            'username': username,
            'hashedPassword': hashedPassword
        };
        
        fetch('/api/signup', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if (data.message == 'Signup successful') {
                console.log("success");
                navigate('/chatroom');
            } else{
                console.log("fail");
                navigate('/login');
            }
        }) 
        .catch((err) => {
            console.error('Error signing up:', err);
        }
        );
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="main">
                <nav className="navbar navbar-expand" id="heading">
                    <h2 className="ml-auto pagename"><strong>Sign-Up</strong></h2>
                </nav>
                
                <form method="post" onSubmit={setCredentials}>
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '75vh', marginTop: '10vh' }}>
                        <div className="card text-center cardstyle shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                            <div className="card-header">
                                Input Information
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Sign-Up</h5>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="username" className="form-control" id="username" placeholder="Enter your username" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter your password" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="confirm-password" placeholder="Repeat password" required />
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn submit-btn w-100">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;