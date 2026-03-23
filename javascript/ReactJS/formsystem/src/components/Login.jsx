import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';


function Login(){
    const navigate = useNavigate();
    const [formData,setFormData]=useState({
        email:'',
        password:''
    });

    const handleChange = (e) => {
        console.log(e)
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const  handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login',formData);
        navigate('/dashboard')
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email} 
                                required 
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                                placeholder="Enter  your email"/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                value={formData.password} 
                                required 
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                                placeholder="*********"/>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input 
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember Me</label>
                            </div>
                            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">Forgot Password?</Link>
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
                        >
                            Login
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have and account?{' '}
                            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;