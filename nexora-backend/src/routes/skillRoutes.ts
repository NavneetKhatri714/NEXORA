import { Router } from "express";
import { listSkills, mySkills, upsertSkill } from "../controllers/skillController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
router.use(authMiddleware);
router.get("/", listSkills);
router.get("/mine", mySkills);
router.post("/", upsertSkill);
export default router;
