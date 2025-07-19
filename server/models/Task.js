const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the task schema
const taskSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  daysToWorkOn: {
    type: String,
    required: true,
    enum: ["Everyday", "Mon-Fri", "Sat-Sun"],
    default: "Everyday",
  },
  about: { type: String },
  progress: [{ date: Date, completed: Boolean }],
  streak: { type: Number, default: 0 },
});

// Export the model
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;

const MONGO_URL = process.env.MONGO_URL;
// Connect to MongoDB (except during tests)
if (process.env.NODE_ENV !== "test") {
  const mongoUrl = MONGO_URL;

  if (!mongoUrl) {
    console.error("❌ MONGO_URL is not set in environment variables.");
    process.exit(1);
  }

  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("✅ Connected to MongoDB successfully.");
    })
    .catch((err) => {
      console.error("❌ MongoDB connection error:", err.message);
      console.debug("Full error:", err);
      process.exit(1);
    });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("🔌 Mongoose connection closed due to app termination.");
    process.exit(0);
  });
}

