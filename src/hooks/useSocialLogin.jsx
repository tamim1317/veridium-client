import { useAuth } from "../context/AuthContext";
import useAxiosPublic from "./useAxiosPublic";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useSocialLogin = () => {
    const { googleLogin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await googleLogin();
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                image: result.user?.photoURL,
                role: 'employee', // Default role for social login
                status: 'unaffiliated' 
            };

            // Save user to DB if they don't exist
            await axiosPublic.post('/users', userInfo);
            
            toast.success("Login Successful!");
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error("Social Login Failed");
        }
    };

    return handleGoogleLogin;
};

export default useSocialLogin;