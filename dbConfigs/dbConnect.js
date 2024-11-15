const mongoose = require("mongoose");
const uri = "mongodb://127.0.0.1:27017/projects";
const dbConnect = async () => {
  await mongoose
    .connect(uri)
    .then(() => "connected to db")
    .catch((error) => console.error("MongoDB connection error:", error));
};
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin", "superuser"], default: "user" }, // Role field with default "user"
});
const dataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
  contentId: String,
});

dataSchema.index({ title: "text", description: "text" });

const User = mongoose.model("User", userSchema);
const Data = mongoose.model("Data", dataSchema);
module.exports = { User, Data, dbConnect };
