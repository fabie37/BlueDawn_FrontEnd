import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
const dotenv = require('dotenv');
dotenv.config({ path: '../../../config/config.env' });

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
