import { useState } from "react";
import {Link,useNavigate,useSearchParams} from 'react-router-dom';
import { resetPassword as resetPasswordApi } from '../api/authApi';

function ResetPassword(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const [loading,setLoading] = useState(false);
    const [formData,setFormData] = useState({
        newPassword:'',
        confirmPassword:''
    })
    const handleChange = (e) => {
        console.log(e)
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if(formData.newPassword !== formData.confirmPassword){
            setError('Passwords do not match!');
            setLoading(false);
            return;
        }

        if(!token){
            setError('Invalid or missing token');
            setLoading(false);
            return;
        }

        try{
            const response = await resetPasswordApi(token, formData.newPassword);
            if(response.success){
                setSuccess('Password reset successfully');
                setTimeout(() => navigate('/login'), 3000);
            }
        }catch(err){
            setError(err.message || 'Failed to reset password');
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Reset Password
                    </h2>
                    {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                    {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}
                    <p className="text-center text-gray-600 mb-8">Enter your new password</p>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                               New Password
                            </label>
                            <input 
                                type="password" 
                                id="newPassword" 
                                name="newPassword" 
                                value={formData.newPassword} 
                                required 
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                                placeholder="*********"/>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                value={formData.confirmPassword} 
                                required 
                                disabled={loading}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                                placeholder="*********"/>
                        </div>
                         <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
                        >
                            Update Password
                        </button>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;