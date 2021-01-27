import './App.css';
import { useEffect, useState } from 'react';
import Title from './components/Title/Title';
const { ENDPOINT, SEND_PURCHASES } = require('./socket/constants');
const io = require('socket.io-client');

const App = () => {
    const [purchases, setPurchases] = useState();

    useEffect(() => {
        const socket = io(ENDPOINT);

        socket.on(SEND_PURCHASES, (data) => {
            setPurchases({ data: data });
        });

        return () => {};
    }, []);

    return (
        <div className='App'>
            <Title purchases={purchases ? purchases : null}></Title>
        </div>
    );
};

export default App;
