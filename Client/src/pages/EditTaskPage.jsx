
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_INSTANCE from '../services/api.js';
import TaskForm from '../components/TaskForm.jsx'

function EditTaskPage() {
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
                toast.error('Failed to fetch task');
                navigate('/tasks');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    if (isLoading) {
        return <div className="text-center py-10">Loading task...</div>;
    }

    if (!task) {
        return <div className="text-center py-10">Task not found</div>;
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
                <p className="text-gray-600 mt-1">Update your task details</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <TaskForm mode="edit" task={task} />
            </div>
        </div>
    );
}

export default EditTaskPage;