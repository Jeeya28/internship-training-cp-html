import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import {forgotPassword as forgotPasswordApi} from '../api/authApi';

function ForgotPassword(){
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const [email,setEmail]=useState('');

    const  handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try{
            const response = await forgotPasswordApi(email);
            if(response.success){
                setSuccess('Password reset link has been sent to your email');
                setTimeout(() => navigate('/login'), 3000);
            }
        }catch(err){
            setError(err.message || 'Failed to send password reset link');
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Forgot Pasword
                    </h2>
                    {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                    {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Enter your email Address and we'll send you a reset link</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={email} 
                                required 
                                onChange={(e)=>setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                                placeholder="Enter  your email"/>
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
                        >
                            Send Reset Link
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
                            Back to Login
                        </Link>                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;