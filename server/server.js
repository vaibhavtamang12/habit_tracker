const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// console.log("MONGO_URI:", process.env.MONGO_URI);
// console.log("JWT_SECRET:", process.env.JWT_SECRET);
// console.log("USER_EMAIL:", process.env.USER_EMAIL);
// console.log("USER_PASSWORD:", process.env.USER_PASSWORD);

// const MONGO_URL =
//   "mongodb+srv://deadlyhacker12:2rOUwzsNCEsJSG2K@cluster0.fepksui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));
//
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/tasks", require("./routes/tasks"));
//
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully.");
    startServer();
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    console.debug("Full MongoDB error:", err);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔌 Mongoose connection closed due to app termination.");
  process.exit(0);
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

function startServer() {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

