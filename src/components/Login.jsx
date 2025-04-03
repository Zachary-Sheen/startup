import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lineicons/dist/lineicons.css';
import './styles.css';
import "./scripts.js";

const Login = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    function checkLogin(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch('/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.message === 'Login successful') {
                navigate("/chatroom");
            } else {
                setShowModal(true); // Show the modal on invalid credentials
            }
        })
        .catch((err) => {
            console.error('Error checking login:', err);
            setShowModal(true); // Show the modal on error
        });
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="main">
                <nav className="navbar navbar-expand" id="heading">
                    <h2 className="ml-auto pagename"><strong>Login</strong></h2>
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
                                <button type="submit" className="btn submit-btn w-100">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Modal for invalid credentials */}
                {showModal && (
                    <div
                        className="modal fade show"
                        style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        tabIndex="-1"
                        aria-labelledby="invalidCredentialsModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content dark-modal">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="invalidCredentialsModalLabel">Invalid Credentials</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)} // Close the modal
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    The username or password you entered is incorrect. Please try again.
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)} // Close the modal
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;