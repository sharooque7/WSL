import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "http";
dotenv.config();
const server = createServer(app);
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGO_ATLAS;
console.log(MONGODB_URL);
await mongoose.connect(MONGODB_URL!);
server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
