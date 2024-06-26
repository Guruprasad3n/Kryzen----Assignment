const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "inProgress", "done", "reWork"],
      default: "todo",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    versionKey: null,
  }
);

const taskModel = model("Tasks", taskSchema);
module.exports = taskModel;
