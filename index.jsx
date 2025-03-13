import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './src/App.jsx'

console.log("Hello from main.jsx");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// createRoot(document.getElementById('root')).render(
//   // <StrictMode>
//     <App />
//   /* </StrictMode> */
// );
