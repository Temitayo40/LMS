import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhook.js";
import educatorRouter from "./routes/educatorRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";
import courseRouter from "./routes/courseRoutes.js";

const app = express();
await connectDB();
app.use(cors());
app.use(clerkMiddleware());
await connectCloudinary();
app.use(express.json());

app.get("/", (req, res) => res.send("Api working joor"));
app.post("/clerk", express.json(), clerkWebhooks);
app.use("/api/educator", express.json(), educatorRouter);
app.use("/api/course", express.json(), courseRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
