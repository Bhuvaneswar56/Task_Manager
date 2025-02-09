
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API_INSTANCE from '../services/api';
import TaskCard from '../components/TaskCard.jsx';

function TaskListPage() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

  
    const fetchTasks = async () => {
        try {
            const response = await API_INSTANCE.get('/tasks');
            setTasks(response.data.data);
        } catch (error) {
            toast.error('Failed to fetch tasks');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskDelete = (taskId) => {
        setTasks(tasks.filter(task => task._id !== taskId));
    };

    if (isLoading) {
        return <div className="text-center py-10">Loading tasks...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
                <button
                    onClick={() => navigate('/tasks/add')}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    Add New Task
                </button>
            </div>

            {tasks.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No tasks found. Create your first task!
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map(task => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onDelete={handleTaskDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default TaskListPage;