import { Router } from "express";
import { analyzeProfile, getProfile, setGithub, setLinkedin, setTargetRole, uploadResume } from "../controllers/profileController";
import { authMiddleware } from "../middleware/authMiddleware";
import { uploadResume as upload } from "../middleware/uploadMiddleware";

const router = Router();
router.use(authMiddleware);
router.get("/", getProfile);
router.post("/target-role", setTargetRole);
router.post("/resume", upload, uploadResume);
router.post("/github", setGithub);
router.post("/linkedin", setLinkedin);
router.post("/analyze", analyzeProfile);
export default router;
