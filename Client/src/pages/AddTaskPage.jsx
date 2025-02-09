
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm.jsx'

function AddTaskPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
                <p className="text-gray-600 mt-1">Add a new task to your list</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <TaskForm mode="add" />
            </div>
        </div>
    );
}

export default AddTaskPage;