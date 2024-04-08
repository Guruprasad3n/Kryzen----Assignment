# Kryzen

## Introduction
Kryzen is a task management application designed to streamline task organization and tracking. It provides a user-friendly interface for creating, managing, and categorizing tasks based on their status. The backend of Kryzen serves as the server-side component responsible for handling data storage, retrieval, and manipulation operations for the task management application.

## Project Type
Fullstack

## Deplolyed App
Frontend: [https://kryzengp.netlify.app/](https://kryzengp.netlify.app/)

Backend: [https://kryzen-assignment-4d0z.onrender.com](https://kryzen-assignment-4d0z.onrender.com)

## Directory Structure

```
kryzen---Assignment/
├─ backend/
│  ├─ Config/
│  │  ├─ db.js
│  ├─ Controllers/
│  │  ├─ taskController.js
│  ├─ Models/
│  │  ├─ taskSchema.js
│  ├─ Routes/
│  │  ├─ taskRoute.js
│  ├─ index.js
│
├─ frontend/
│  ├─ src/
│  │  ├─ Components/
│  │  │  ├─ CreateTask.jsx
│  │  │  ├─ Header.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ NotFound.jsx
│  │  │  ├─ Task.jsx
│  │  │  ├─ TaskList.jsx
│  ├─ App.jsx
│  ├─ App.css
│  ├─ index.css
│  ├─ main.jsx
│
├─ package.json
```


## Features
### Frontend
- Task creation with name, status, and date
- Task management with drag-and-drop functionality
- Filtering tasks by date
- Exporting task lists to PDF format

### Backend
- CRUD operations for task management
- Filtering tasks by date
- Delete tasks by id

## Installation & Getting started

    git clone https://github.com/Guruprasad3n/Kryzen----Assignment
---------------------
    cd Kryzen----Assignment
### Frontend

    - cd frontend
    - npm install
    - npm run dev

- Server will start on the ```http://localhost:5173/```

### Backend

- cd backend
    
- add  ```.env```
    - PORT = your port number
    - MONGO_URI = your Mongo Url


- npm install
- npm run dev 

- Server will start on the ```http://localhost:8000/```







### API Endpoints

POST /create-task - Create a new task

GET /all-tasks - Retrieve all tasks

PUT /update-task/:id - Update a task

GET /task/filter - Filter tasks by date

DELETE /delete-task/:id - Delete a task

## Technology Stack

### Frontend
- React.js
- Chakra UI
- react-router-dom
- react-dnd

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Other libraries/modules:
    - cors
    - dotenv