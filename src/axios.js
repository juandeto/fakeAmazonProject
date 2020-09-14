import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://clone-42355.firebaseio.com/'
});

export default instance;