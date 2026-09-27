import express from "express";
import cors from "cors";
import path from "path";
import { env } from "./config/env";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import skillRoutes from "./routes/skillRoutes";
import roadmapRoutes from "./routes/roadmapRoutes";
import assessmentRoutes from "./routes/assessmentRoutes";
import projectRoutes from "./routes/projectRoutes";
import progressRoutes from "./routes/progressRoutes";
import { errorMiddleware } from "./middleware/errorMiddleware";

export const app = express();

app.use(cors({
  origin: env.CLIENT_URL.split(",").map(s => s.trim()),
  credentials: true
}));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", product: "NEXORA", team: "ARCHEOPTERYX" });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/progress", progressRoutes);

app.use(errorMiddleware);
