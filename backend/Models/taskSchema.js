const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["todo", "inProgress", "done", "rework"],
    default: "todo",
  },
  date: {
    type: Date,
    default: Date.now
  },
},{
  versionKey:null
});

const taskModel = model("Tasks", taskSchema);
module.exports = taskModel;
