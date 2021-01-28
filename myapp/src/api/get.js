const axios = require('axios');

const get = async () => {
    let data;
    await axios
        .get(process.env.REACT_APP_SOCKET_URI + '/api/v1/purchases')
        .then((res) => {
            data = res.data;
            console.log(data);
        })
        .catch((err) => {
            console.log(err.response);
            data = null;
        });
    return data;
};

exports.get = get;
