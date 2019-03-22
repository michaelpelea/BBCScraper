import axios from 'axios';
import { connectEndpoint, loginEndpoint } from '../../constant.jsx';

const CancelToken = axios.CancelToken;

let cancelAPI = null;

//connects web page to the website url provided to retrieve recipes from
const connectWebsite = () => {
    return axios.get(connectEndpoint, {
        cancelToken: new CancelToken((c) => {
            cancelAPI = c;
        })
    });
};

const login = () => {
    return axios.get(loginEndpoint, {
        cancelToken: new CancelToken((c) => {
            cancelAPI = c;
        })
    });
}

export {
    cancelAPI,
    connectWebsite,
    login
}