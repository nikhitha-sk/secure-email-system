import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
  from: String,
  to: String,
  subject: String,
  message: String,
  signature: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Email ||
  mongoose.model("Email", EmailSchema);