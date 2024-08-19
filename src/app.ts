import express from "express";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import errorHandler from "./utils/errorHandler";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use(errorHandler);

export default app;
