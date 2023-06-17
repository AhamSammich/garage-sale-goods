require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();
const mongoose = require("mongoose");
const itemRoutes = require("./routes/items");
const userRoutes = require("./routes/user");

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/items", itemRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to db. Listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
