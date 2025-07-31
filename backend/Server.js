
  require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const routes = require("./routes/todoRoutes");
const userRoutes = require("./routes/UserRoutes");

const path = require("path");


const app = express();
const PORT = process.env.PORT || 5000;

//Middleware

app.use(express.static(path.join(__dirname, 'dist'))); // Or build

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.use(express.json());
app.use(cors());

app.use("/api", routes);
app.use("/api", userRoutes);



mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});