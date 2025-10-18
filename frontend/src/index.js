import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';  // 👈 add this line
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
