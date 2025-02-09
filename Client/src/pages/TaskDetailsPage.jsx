
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_INSTANCE from '../services/api.js';

function TaskDetailsPage() {
    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await API_INSTANCE.get(`/tasks/${id}`);
                setTask(response.data.data);
            } catch (error) {
                toast.error('Failed to fetch task details');
                navigate('/tasks');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    if (isLoading) {
        return <div className="text-center py-10">Loading task details...</div>;
    }

    if (!task) {
        return <div className="text-center py-10">Task not found</div>;
    }

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

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
                    <div className="mt-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
                            {task.status}
                        </span>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
                    <p className="text-gray-600">{task.description || 'No description provided'}</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Created At</h2>
                    <p className="text-gray-600">
                        {new Date(task.createdAt).toLocaleString()}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(`/tasks/${id}/edit`)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                        Edit Task
                    </button>
                    <button
                        onClick={() => navigate('/tasks')}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                    >
                        Back to List
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskDetailsPage;