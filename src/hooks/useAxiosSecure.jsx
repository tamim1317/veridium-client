import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000/api/v1', 
});

const useAxiosSecure = () => {
    const { logout, setToken, setUser } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosSecure.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const status = error.response?.status;
            
            // If the error is 401 or 403
            if (status === 401 || status === 403) {
                console.log("Token expired or unauthorized access. Logging out...");
                logout();
                navigate('/login', { replace: true });
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;