const ENV = 'developement';

let ENDPOINT = '';
if (ENV === 'developement') {
    ENDPOINT = 'http://localhost:5000';
    console.log('Dev');
} else {
    ENDPOINT = 'http://192.168.1.217:5000';
}

const SEND_PURCHASES = 'send_purchases';

exports.ENDPOINT = ENDPOINT;
exports.SEND_PURCHASES = SEND_PURCHASES;
