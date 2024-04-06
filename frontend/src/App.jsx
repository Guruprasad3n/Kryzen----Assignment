import React, { useState } from "react";
import "./App.css";
import CreateTask from "./Components/CreateTask";
import { Routes, Route } from "react-router-dom";
import AllTasks from "./Components/AllTasks";
import Navbar from "./Components/Navbar";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<CreateTask />} />
          <Route path="/tasks" element={<AllTasks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
