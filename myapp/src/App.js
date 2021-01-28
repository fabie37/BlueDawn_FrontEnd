import './App.css';
import { useEffect, useState } from 'react';
import Container from './components/Container/Container';
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
            <Container purchases={purchases ? purchases : null}></Container>
        </div>
    );
};

export default App;
