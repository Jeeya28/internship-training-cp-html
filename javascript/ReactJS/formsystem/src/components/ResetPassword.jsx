import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';

function ResetPassword(){
    const navigate = useNavigate();
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

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(formData.newPassword !== formData.confirmPassword){
            alert('passwords do not match!');
            return;
        }

        console.log('Reset  password:',formData);
        alert('password reset successfully')
        navigate('/login')
    }
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                        Reset Passowrd
                    </h2>
                    <p className="text-center text-gray-600 mb-8">Enter your new password`</p>
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
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" 
                                placeholder="*********"/>
                        </div>
                         <button 
                            type="submit"
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