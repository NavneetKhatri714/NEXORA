import { Router } from "express";
import { gaps, generate, getOne, list } from "../controllers/roadmapController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.use(authMiddleware);
router.get("/gaps", gaps);
router.post("/generate", generate);
router.get("/", list);
router.get("/:id", getOne);
export default router;
