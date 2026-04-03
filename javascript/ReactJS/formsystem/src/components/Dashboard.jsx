import { useState,  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext';
import { getDashboardItems, getDashboardStats, createDashboardItem, updateDashboardItem, deleteDashboardItem } from '../api/dashboardApi';
function Dashboard(){

    const navigate = useNavigate();
    const {user,logout} = useAuth();

    const [items, setItems] = useState([]);
    const [stats, setStats] = useState({
        total:0,
        active:0,
        completed:0,
        pending:0
    });
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState('');
    const [showAddForm,setShowAddForm] = useState(false);
    const [newItem,setNewItem] = useState({
        title:'',
        description:'',
        status:'active'
    });
    
    useEffect(() => {
        fetchDashboardData();
    },[]);

    const fetchDashboardData = async () => {
        setLoading(true);
        setError('');
        try{
            const [itemsResponse,statsResponse] = await Promise.all([
                getDashboardItems(),
                getDashboardStats()
            ]);
            if(itemsResponse.success){
                setItems(itemsResponse.data);
            }
            if(statsResponse.success){
                setStats(statsResponse.data);
            }
        }catch(err){
            setError(err.message || 'Failed to load dashboard data');
        }finally{
            setLoading(false);
        }
        
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const handleAddItem = async(e)=>{
        e.preventDefault();
        try{
            const response = await createDashboardItem(newItem);
            if(response.success){
                setItems([response.data, ...items]);
                setNewItem({
                    title:'',
                    description:'',
                    status:'active'
                });
                setShowAddForm(false);
                fetchDashboardData();
            }
        }catch(err){
            setError(err.message || 'Failed to add item');
        }
    }

    const handleDeleteItem = async (itemId) => {
        if(!window.confirm('Are you sure you want to delete this item?')){
            return;
        }
        
        try{
            const response = await deleteDashboardItem(itemId);
            if(response.success){
                setItems(items.filter(item => item.id !== itemId));
                fetchDashboardData();
            }   
        }catch(err){
            setError(err.message || 'Failed to delete item');
        }
    }

    const handleUpdateStatus = async (itemId, newStatus) => {
        const item = items.find(i=> i.id === itemId);

        try{
            const response = await updateDashboardItem(itemId, {...item, status:newStatus});
            if(response.success){
                setItems(items.map(i => i.id === itemId ? response.data : i));
                fetchDashboardData();
            }
        }catch(err){
            setError(err.message || 'Failed to update item status');
        }
    }

    const getStatusColor = (status) => {
        switch(status){
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <div className="min-h-screen">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                            <p className="text-sm text-gray-600">Welcome, {user?.name}!</p>
                        </div>
                        
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
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md border-1-4 border-blue-600">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Items</h3>
                        <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-1-4 border-green-600">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Items</h3>
                        <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-1-4 border-yellow-600">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Pending Items</h3>
                        <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-1-4 border-purple-600">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Completed Items</h3>
                        <p className="text-3xl font-bold text-purple-600">{stats.completed}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <button onClick={()=>setShowAddForm(!showAddForm)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        {showAddForm ? 'Cancel' : '+ Add Item'}
                    </button>
                </div>

                {showAddForm && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Item</h3>
                        <form onSubmit={handleAddItem} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={newItem.title}
                                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={newItem.description}
                                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter description"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    value={newItem.status}
                                    onChange={(e)=>setNewItem({...newItem,status:e.target.value})}
                                    className="w-full px-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                >
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>

                            <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200">
                                Create Item
                            </button>
                        </form>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Dashboard Items</h3>
                    { loading ? (
                        <p className="text-center text-gray-600 py-8">Loading items...</p>
                    ) : items.length === 0 ? (
                        <p className="text-center text-gray-600 py-8">No items found.</p>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="border border-gray-300 rounded-lg p-4 flex justify-between items-center">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                        <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                                        <p className="text-gray-600 mt-1">{item.description}</p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Created: {new Date(item.created_at).toLocaleDateString()} | Status: <span className={`${getStatusColor(item.status)} px-2 py-1 rounded-full text-xs font-medium`}>{item.status}</span>
                                        </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                            <div className="flex gap-2">
                                                <select value={item.status} onChange={(e)=>handleUpdateStatus(item.id, e.target.value)} className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm">
                                                    <option value="active">Active</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                                <button onClick={()=>handleDeleteItem(item.id)} className="bg-red-600 text-white px-3 py-1 rounded-lg font-semibold hover:bg-red-700 transition duration-200 text-sm">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    )}
                </div>


            </div>
        </div>
    )
}

export default Dashboard;