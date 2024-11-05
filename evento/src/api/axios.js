
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Altere para o endereço do seu backend
});

export default api;
