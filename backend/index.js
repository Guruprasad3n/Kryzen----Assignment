const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const TaskRouter = require("./Routes/taskRoute");
const UserRoute = require("./Routes/UserRoute");
const dotenv = require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.get("/", async (req, res) => {
//   return res.status(200).send("Welcome To Kryzen");
// });

app.use("/", TaskRouter);
app.use("/user", UserRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
