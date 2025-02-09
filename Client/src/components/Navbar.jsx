
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-indigo-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/tasks" className="text-xl font-bold">
                    Task Manager
                </Link>
                <div className="flex gap-4">
                    <Link to="/tasks" className="hover:text-gray-200">
                        Tasks
                    </Link>
                    <Link to="/tasks/add" className="hover:text-gray-200">
                        Add Task
                    </Link>
                    <Link to="/profile" className="hover:text-gray-200">
                        Profile
                    </Link>
                    <button 
                        onClick={handleLogout}
                        className="hover:text-gray-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;