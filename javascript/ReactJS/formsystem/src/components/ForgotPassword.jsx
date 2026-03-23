import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';

function ForgotPassword(){
    const navigate = useNavigate();
    const [email,setEmail]=useState('');
    const  handleSubmit = (e) => {
        e.preventDefault();
        console.log('Forgot Password',email);
        alert("Password Reset Link has been sent to your email")
        navigate('/login')
    }
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Forgot Pasword
                    </h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
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