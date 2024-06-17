const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/student.js");

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://test:test123@cluster0.q3jmgbr.mongodb.net/student"
)
  

app.use("/student", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
