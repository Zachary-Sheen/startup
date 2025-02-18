import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lineicons/dist/lineicons.css';
import './styles.css';
import CryptoTable from './CryptoTable';
import "./scripts.js";

const Chatroom = () => {
    const [username, setUsername] = React.useState('');
    const [messages, setMessages] = React.useState([]);
        
    useEffect(() => {
        const data = localStorage.getItem('accountData');
        const usernamedisplay = localStorage.getItem('usernameDisplay');
        if(data) {
            const parsedData = JSON.parse(data);
            const sessionStartTime = parsedData.sessionStartTime;
            const currentTime = new Date().getTime();
            if (currentTime - sessionStartTime > 3600000) {
                alert('Session expired. Please log in again.');
                window.location.href = '/login';
            } else {
                setUsername(usernamedisplay);
            }
        }
        else
        {
            window.location.href = '/login';
        }
    }, []);

    
    function sendMessage() 
    {
        console.log("trying to send message")
        console.log(username)
        console.log(messages)
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value;
        if (message === '') {
            return;
        }
        const chatBox = document.getElementById('chatBox');
        const newMessage = document.createElement('div');
        newMessage.className = `message p-2 mb-2 rounded ${username !== null ? 'bg-primary text-white text-right' : 'bg-light'}`; //if username is user, bg-primary text-white text-right, else bg-light, showing different users texts
        newMessage.style.alignSelf = username !== null ? 'flex-end' : 'flex-start';
        console.log(newMessage.style)
        newMessage.innerHTML = username !== null ? `<strong>${username}: </strong> ${message}`: `<strong>${username}:</strong> ${message}`;
        const addMessage = {username: username, message: message};
        setMessages([...messages, addMessage]); //...messages is the previous messages, addMessage is the new message
        chatBox.appendChild(newMessage);
        messageInput.value = '';
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }


    //Keep this code for now, we will use it later
    //{messages.map((msg, index) => (
//         <div
//         key={index}
//         className={`message p-2 mb-2 rounded ${msg.username === username ? 'bg-primary text-white text-right' : 'bg-light'}`}
//         style={{ alignSelf: msg.username === username ? 'flex-end' : 'flex-start' }}
//     >
//         <strong>{msg.username}:</strong> {msg.text}
//     </div>
// ))}
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
                        <div className="col-7 box bg-dark text-white p-3 rounded"  style={{ height: '750px', overflowY: 'scroll' , overflowX: 'scroll'}}>
                            <CryptoTable />
                        </div>
                        <div className="col-5" style={{ height: '85vh' }}>
                            <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div className="card-header bg-dark text-white">
                                    Start Chatting!
                                </div>
                                <div className="card-body" style={{ height: '300px', overflowY: 'scroll',display: 'flex', flexDirection: 'column'  }} id="chatBox">
                                    <div className="message p-2 mb-2 bg-light rounded">
                                        <strong>User:</strong> What do you think about that bitcoin?
                                    </div>
                                    <div className="message p-2 mb-2 bg-light rounded">
                                        <strong>User:</strong> I think it's pretty awesome!
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="messageInput" placeholder="Send a message..." aria-label="Message" onKeyDown={handleKeyDown}/>
                                        <button className="btn btn-dark" onClick={sendMessage}>
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