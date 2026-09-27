import { Router } from "express";
import { list, update } from "../controllers/projectController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.use(authMiddleware);
router.get("/", list);
router.patch("/:id", update);
export default router;
