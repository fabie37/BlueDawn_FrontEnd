import './App.css';
import { useEffect, useState } from 'react';
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
            <h1>{purchases ? purchases.data[1]._id : ''}</h1>
        </div>
    );
};

export default App;
