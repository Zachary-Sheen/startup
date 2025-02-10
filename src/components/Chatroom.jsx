import React from 'react';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lineicons/dist/lineicons.css';
import './styles.css';
import CryptoTable from './CryptoTable';
import "./scripts.js";

const Chatroom = () => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="main">
                <nav className="navbar navbar-expand" id="heading">
                    <button className="toggler-btn" type="button">
                        <i className="lni lni-menu-cheesburger"></i>
                    </button>
                    <h2 className="mx-auto">Welcome to the Chatroom</h2>
                </nav>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-7 "  style={{ height: '750px', overflowY: 'scroll' , overflowX: 'scroll'}}>
                            <CryptoTable />
                        </div>
                        <div className="col-5" style={{ height: '85vh' }}>
                            <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div className="card-header bg-dark text-white">
                                    Start Chatting!
                                </div>
                                <div className="card-body" style={{ height: '300px', overflowY: 'scroll' }} id="chatBox">
                                    <div className="message p-2 mb-2 bg-light rounded">
                                        <strong>User:</strong> What do you think about that bitcoin?
                                    </div>
                                    <div className="message p-2 mb-2 bg-light rounded">
                                        <strong>User:</strong> I think it's pretty awesome!
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="messageInput" placeholder="Send a message..." aria-label="Message" />
                                        <button className="btn btn-dark" id="sendBtn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatroom;