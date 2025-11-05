import { Router } from "express";
import Resume from "../models/Resume.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const resumes = await Resume.find();
    return res.status(200).json(resumes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const resume = new Resume(req.body);
    const savedResume = await Resume.create(resume);
    return res.status(201).json(savedResume);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "ValidationError") {
        return res.status(400).send(error.message);
      }
    }
    return res.status(500).send("Server error");
  }
});

export default router;
