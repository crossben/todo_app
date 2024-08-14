import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000/api' });

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('tokens');
    if (token) {
        config.headers['auth'] = token;
    }
    return config;
});

export default api;