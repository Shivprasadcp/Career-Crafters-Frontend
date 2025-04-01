// src/api/index.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',  // Replace with your actual backend URL
});

export default api;