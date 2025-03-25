import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lineicons/dist/lineicons.css';
import './styles.css';
import CryptoTable from './CryptoTable';
import "./scripts.js";
import { chatNotifier, EventMessage } from './chatNotifier';

const Chatroom = () => {
    const [username, setUsername] = React.useState('');
    const [messages, setMessages] = React.useState([]);
    const navigate = useNavigate();
        
    useEffect(() => {
        fetch('api/messages', {
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
            setMessages(data.messages);
        })
        .catch((err) => {
            console.error('Error fetching messages:', err);
        });
        fetch('api/authenticated', {
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if (!data.authenticated) {
                navigate('/login');
            }
            setUsername(data.username);
        })
        .catch((err) => {
            console.error('Error fetching authenticated:', err);
        });
        // console.log("trying to fetch authenticated")
    }, []);

    useEffect(() => {
        const chatBox = document.getElementById('chatBox');
        chatBox.innerHTML = ''; 
        messages.forEach((msg) => {
            const newMessage = document.createElement('div');
            newMessage.className = `message p-2 mb-2 rounded ${msg.username === username ? 'bg-primary text-white text-right' : 'bg-light'}`;
            newMessage.style.alignSelf = msg.username === username ? 'flex-end' : 'flex-start';
            newMessage.innerHTML = `<strong>${msg.username}:</strong> ${msg.message}`;
            chatBox.appendChild(newMessage);
        });
        chatBox.scrollTop = chatBox.scrollHeight; 
    }, [messages, username]);

    function sendMessage() 
    {
        // console.log("trying to send message")
        // console.log(username)
        // console.log(messages)
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value;
        if (message === '') {
            return;
        }
        fetch('/api/messages', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, message: message })
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            setMessages(data.messages);
            messageInput.value = '';
        });
        messageInput.value = '';
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="main">
                <nav className="navbar navbar-expand" id="heading">
                    <h2 className="ml-auto pagename">Chatroom</h2>
                </nav>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-7 box bg-dark text-white p-3 rounded crypto-table-styling">
                            <CryptoTable />
                        </div>
                        <div className="col-5" style={{ height: '85vh' }}>
                            <div className="card card-border" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div className="card-header bg-dark text-white card-header">
                                    Start Chatting!
                                </div>
                                <div className="card-body chat-box" style={{ height: '300px', overflowY: 'scroll',display: 'flex', flexDirection: 'column'  }} id="chatBox">
                                    {/* <div className="message p-2 mb-2 bg-light rounded">
                                        <strong>User:</strong> What do you think about that bitcoin?
                                    </div>
                                    <div className="message p-2 mb-2 bg-light rounded">
                                        <strong>User:</strong> I think it's pretty awesome!
                                    </div> */}
                                </div>
                                <div className="card-footer">
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="messageInput" placeholder="Send a message..." aria-label="Message" onKeyDown={handleKeyDown}/>
                                        <button className="btn message-btn" onClick={sendMessage}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-send" viewBox="0 0 16 16">
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