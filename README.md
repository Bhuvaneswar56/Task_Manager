# Task Management Application

A full-stack MERN application for managing tasks with user authentication.

## Features

- User Authentication (Register/Login)
- Create, Read, Update, and Delete Tasks
- Task Status Management (Pending, In Progress, Completed)
- Protected Routes
- Responsive Design


### Frontend
- React.js (with Vite)
- React Router Dom
- Axios
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt

Project Structure:

├── client
│   └── src
│       ├── components      
│       ├── pages          
│       ├── services      
│       └── App.jsx       
│
└── server
├── src
│   ├── config         
│   ├── controllers     
│   ├── middlewares    
│   ├── models          
│   ├── routes          
│   ├── utils          
│   └── app.js        
└── server.js         
## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Backend Setup
1. Navigate to server directory:
cd server

2.Install dependencies:
npm install

3.Create .env file in server directory:
NODE_ENV="development"
PORT=4000
DEV_MONGO_DB_URL="your_mongodb_url"
DEV_DB_NAME="task_management"
DEV_JWT_SECRET_KEY="your_secret_key"
SALT_ROUNDS=10

4.Start the server:
Start the server:

### Frontend Setup

1.Navigate to client directory:
cd client

2.Install dependencies:
npm install

3.Start the development server:
npm run dev

API Endpoints
Auth Routes

POST /api/auth/register - Register new user
POST /api/auth/login - Login user
GET /api/auth/me - Get user profile (Protected)

Task Routes (All Protected)

GET /api/tasks - Get all tasks
GET /api/tasks/:id - Get single task
POST /api/tasks - Create new task
PUT /api/tasks/:id - Update task
DELETE /api/tasks/:id - Delete task


    
