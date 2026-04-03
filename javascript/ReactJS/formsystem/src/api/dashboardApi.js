import axiosInstance from "./axios";

export const getDashboardItems = async () => {
    try{
        const response = await axiosInstance.get('/dashboard/items');
        return response.data;
    } catch (error) {
        throw error.response?.data || {message:'Failed to fetch dashboard items'};
    }
};

export const getDashboardStats = async () => {
    try{
        const response = await axiosInstance.get('/dashboard/stats');
        return response.data;
    } catch (error) {
        throw error.response?.data || {message:'Failed to fetch dashboard stats'};
    }
};

export const createDashboardItem = async (itemData) => {
    try{
        const response = await axiosInstance.post('/dashboard/items', itemData);
        return response.data;
    } catch (error) {
        throw error.response?.data || {message:'Failed to create dashboard item'};
    }
};

export const updateDashboardItem = async (itemId, itemData) => {
    try{
        const response = await axiosInstance.put(`/dashboard/items/${itemId}`, itemData);
        return response.data;
    } catch (error) {
        throw error.response?.data || {message:'Failed to update dashboard item'};
    }
};

export const deleteDashboardItem = async (itemId) => {
    try{
        const response = await axiosInstance.delete(`/dashboard/items/${itemId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || {message:'Failed to delete dashboard item'};
    }   
};