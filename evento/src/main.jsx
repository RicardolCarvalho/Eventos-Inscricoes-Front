// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importando corretamente o App
import './index.css'; // Estilo global opcional
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')); // Seleciona o div root
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
