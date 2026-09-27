import { Router } from "express";
import { create, list, submit } from "../controllers/assessmentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.use(authMiddleware);
router.post("/", create);
router.get("/", list);
router.post("/:id/submit", submit);
export default router;
