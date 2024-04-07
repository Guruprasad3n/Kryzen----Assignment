import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import NotFound from "./Components/NotFound";
import TaskList from "./Components/TaskList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Navbar />
        <div style={{ marginTop: "72px" }}>
          <Routes>
            <Route
              path="/"
              element={<TaskList tasks={tasks} setTasks={setTasks} />}
            />
             {/* <Route path="/document" element={<MyDocument data={tasks} />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </DndProvider>
    </>
  );
}

export default App;
