const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔐 API Key
const API_KEY = "12345";

// Middleware
app.use((req, res, next) => {
  const key = req.headers["x-api-key"];
  if (key !== API_KEY) {
    return res.status(403).send("Unauthorized");
  }
  next();
});

// MongoDB connect
mongoose.connect("mongodb+srv://subhashchandra515_db_user:sd23rdjan1997@cluster0.x8rlk0f.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const User = mongoose.model("User", {
  username: String,
  password: String
});

// Signup
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User Saved ✅");
});

// Login
app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (user) {
    res.send("Login Success ✅");
  } else {
    res.send("Invalid ❌");
  }
});

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.listen(3000, () => console.log("Server running"));
