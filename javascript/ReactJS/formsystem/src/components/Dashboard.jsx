import { useNavigate } from "react-router-dom";


function Dashboard(){

    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logging out...');
        navigate('/login');
    }

    return (
        <div className="min-h-screen">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
                        >
                            Logout
                        </button> 
                    </div>
                </div>
            </nav>
            <div className="max-w-7xl mx-auto px-4 sm-px-6 lg-px-8 py-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Welcome to your Dashboard!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        You have successfully Loggedin to your account
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-blue-50 p-6 rounded-lg border-1-4 border-blue-600">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Profile</h3>
                            <p className="text-gray-600">Manager you account Settings</p>
                        </div>
                    
                        <div className="bg-green-50 p-6 rounded-lg border-1-4 border-blue-600">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Activity</h3>
                            <p className="text-gray-600">View Your Recent Activity</p>
                        </div>
                  
                        <div className="bg-purple-50 p-6 rounded-lg border-1-4 border-blue-600">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Settings</h3>
                            <p className="text-gray-600">Configure Your Preferences</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;