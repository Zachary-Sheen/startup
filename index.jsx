import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './src/App.jsx'

console.log("Hello from main.jsx");
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  /* </StrictMode> */
);
