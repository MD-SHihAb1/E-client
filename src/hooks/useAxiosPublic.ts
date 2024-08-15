import axios, { AxiosInstance } from "axios";

// Create an instance of axios with a base URL
const axiosPublic: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
});

// Define a custom hook to return the axios instance
const useAxiosPublic = (): AxiosInstance => {
    return axiosPublic;
};

export default useAxiosPublic;
