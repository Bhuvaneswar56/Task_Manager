
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_INSTANCE from '../services/api';

function TaskCard({ task, onDelete }) {
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'In Progress':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await API_INSTANCE.delete(`/tasks/${task._id}`);
                toast.success('Task deleted successfully');
                onDelete(task._id);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to delete task');
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <p className="mt-2 text-gray-600">{task.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
                    {task.status}
                </span>
            </div>
            
            <div className="mt-4 flex gap-2">
                <button
                    onClick={() => navigate(`/tasks/${task._id}/edit`)}
                    className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-900"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-900"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskCard;