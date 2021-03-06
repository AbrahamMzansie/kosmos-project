const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const middlewareError = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

const folder = path.resolve();
app.use("/uploads", express.static(path.join(folder, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(folder, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(folder, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API");
  });
}

//app.use("/uploads", express.static("uploads"));
//app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(middlewareError.notFound);
app.use(middlewareError.errorHandler);
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
