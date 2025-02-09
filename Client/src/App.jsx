import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import TaskListPage from './pages/TaskListPage'
import AddTaskPage from './pages/AddTaskPage'
import EditTaskPage from './pages/EditTaskPage'
import TaskDetailsPage from './pages/TaskDetailsPage'


function App() {
  return (
    <>
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

       
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<TaskListPage />} />
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="/tasks/add" element={<AddTaskPage />} />
          <Route path="/tasks/:id" element={<TaskDetailsPage />} />
          <Route path="/tasks/:id/edit" element={<EditTaskPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>

    
    </>
  )
}

export default App
