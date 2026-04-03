import axiosInstance from "./axios";

export const register = async (userData) => {
    try {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const login = async (credentials) => {
    try {
        const response = await axiosInstance.post('/auth/login', credentials);
        if(response.data.success){
           localStorage.setItem('token', response.data.data.token); // Auth token which we also will be stored in the local storage and resued every time we make a request
            localStorage.setItem('user', JSON.stringify(response.data.data)); // user which we will store in the local storage
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
};

export const forgotPassword = async (email) => {
    try {
        const response = await axiosInstance.post('/auth/forgot-password', { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const resetPassword = async (token, newPassword) => {
    try {
        const response = await axiosInstance.post('/auth/reset-password', { token, newPassword });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getCurrentUser = async() => {
    try{
       const response = await axiosInstance.get('/auth/me');
       return response.data;
    }catch(error){
        console.error("Error getting current user:", error);
        return null;
    }
}

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
}

export const getStoredUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}