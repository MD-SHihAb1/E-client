import axios from 'axios';

const useAxiosSecure = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
        // Add any additional configurations here
    });

    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return instance;
};

export default useAxiosSecure;
