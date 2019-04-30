import axios from 'axios';

//AXIOS = CLIENTE HTTP
const api = axios.create({
    baseURL: 'https://dropboxclone-backend.herokuapp.com/',
});

export default api;