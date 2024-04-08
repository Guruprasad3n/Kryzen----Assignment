const userModel = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const taskModel = require("../Models/taskSchema");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists. Please login.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    return res
      .status(201)
      .send({ message: "User Registration Success", newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "User Registration Failed" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ message: "Invalid Email or Password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).send({ message: "User Login Success", user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "User Login Failed" });
  }
};

const getAllTasksByUser = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Fetch tasks for the authenticated user
      const tasks = await taskModel.find({ userId });
  
      return res.status(200).send({
        message: "Successfully getting user tasks",
        tasks,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Error in getting user tasks" });
    }
  };

module.exports = { registerUser, loginUser, getAllTasksByUser };
