import { Router } from "express";
import Resume from "../models/Resume.js";

const router = Router();

router.get("/", async (req, res) => {
  const resumes = await Resume.find();
  res.json(resumes);
});

export default router;
