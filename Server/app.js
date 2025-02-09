import express from 'express'
import cookieParser from 'cookie-parser' 
import cors from 'cors' 
import CONFIG from './src/config/config.js';
import userRoutes from './src/routes/user.route.js'
import taskRoutes from './src/routes/task.route.js'


const app =express()

const corsOptions = {
    origin: CONFIG.REACT_BASE_URL,  
    credentials: true               
}

app.use(cors(corsOptions))    

app.use(cookieParser())   

app.use(express.json())

app.get('/', (req, res) => {                    
    res.status(200).send("Welcome to our Task Management App!") 
})

app.use('/api/auth', userRoutes);
app.use('/api/tasks', taskRoutes);


export {app}