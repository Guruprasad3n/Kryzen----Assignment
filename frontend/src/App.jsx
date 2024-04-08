import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import NotFound from "./Components/NotFound";
import TaskList from "./Components/TaskList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Login from "./Components/User/Login";

function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Navbar />
        <div style={{ marginTop: "72px" }}>
          {/* <Drag/> */}
          <Routes>
            <Route
              path="/task"
              element={<TaskList tasks={tasks} setTasks={setTasks} />}
            />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </DndProvider>
    </>
  );
}

export default App;
