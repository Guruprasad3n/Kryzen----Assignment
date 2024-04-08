// http://localhost:8000/task/filter?startDate=2024-10-12&endDate=2024-10-13

const express = require("express");
const moment = require("moment");
const taskModel = require("../Models/taskSchema");

const createTask = async (req, res) => {
  const { name, status, date } = req.body;
  try {
    const latestTask = await taskModel.findOne({}, {}, { sort: { id: -1 } });
    let id = 1;
    if (latestTask) {
      id = latestTask.id + 1;
    }
    const createTask = new taskModel({ id, name, status, date });
    await createTask.save();
    return res
      .status(200)
      .send({ message: "Task Created Successfully", createTask });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "error in Creating Task" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const task = await taskModel.find();
    return res.status(200).send({
      message: "Successfully getting all tasks",
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "error in Getting Tasks" });
  }
};
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, status, date } = req.body;
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { name, status, date },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).send({ message: "Task not found" });
    }
    return res
      .status(200)
      .send({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error in updating task" });
  }
};

const filterTasks = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const task = await taskModel.find({
      date: { $gte: startDate, $lte: endDate },
    });
    return res.status(200).send({ message: " filtered successfully", task });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error in filtering tasks" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await taskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).send({ message: "Task not found" });
    }
    return res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error in deleting task" });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  filterTasks,
  deleteTask,
};
