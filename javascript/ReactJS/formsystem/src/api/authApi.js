import axiosInstance from "./axios";

export const register = async (userData) => {
    try {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

