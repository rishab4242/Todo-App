if (process.env.NODE_ENV != "productions") {
  require('dotenv').config()
};
const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const routes = require("./routes/todoRoutes");

const path = require('path');




const app = express();
const PORT = process.env.PORT || 5000;

//Middleware

app.use(express.json());
app.use(cors());

app.use("/api", routes);

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
