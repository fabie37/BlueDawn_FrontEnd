import './App.css';
import { useEffect, useState } from 'react';
import Container from './components/Container/Container';
const { ENDPOINT, SEND_PURCHASES } = require('./socket/constants');
const io = require('socket.io-client');
const { get } = require('./api/get');

const App = () => {
    const [purchases, setPurchases] = useState();

    console.log(process.env.REACT_APP_NODE_ENV);

    useEffect(() => {
        get().then((val) => setPurchases(val));

        const socket = io(ENDPOINT);
        socket.on(SEND_PURCHASES, (data) => {
            get().then((val) => setPurchases(val));
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
