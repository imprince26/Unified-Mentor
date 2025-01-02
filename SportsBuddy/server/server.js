const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

const authRoute = require("./routes/authRoute");
const eventRoute = require("./routes/eventRoute");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoute);
app.use("/event", eventRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
