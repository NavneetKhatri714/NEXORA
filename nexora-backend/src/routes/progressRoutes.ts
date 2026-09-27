import { Router } from "express";
import { dashboard, upsert } from "../controllers/progressController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.use(authMiddleware);
router.get("/dashboard", dashboard);
router.post("/", upsert);
export default router;
