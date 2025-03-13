import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Chatroom from './components/Chatroom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import SignUp from './components/Signup'; // Ensure this matches the file name
import 'bootstrap/dist/css/bootstrap.min.css';
import 'lineicons/dist/lineicons.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chatroom" element={<Chatroom />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;