
import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect("mongodb+srv://Ankit:test@cluster0.erugsgd.mongodb.net/productdb?retryWrites=true&w=majority&appName=Cluster0");
    isConnected = !!db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection failed", err);
  }
}
