import { Router, type Response } from "express";
import Resume from "../models/Resume.js";

const router = Router();

const handleRequestFailure = (error: unknown, response: Response) => {
  if (error instanceof Error) {
    if (error.name === "ValidationError") {
      return response.status(400).json({
        message: "Validation failed",
        error: error,
      });
    }

    if (error.name === "CastError") {
      return response.status(400).json({
        message: "Bad Request, Cast Error",
        error: error,
      });
    }

    console.error(error);
    return response.status(500).json({ message: "Server error" });
  }

  console.error(`Failed with non-error instance ${error}`);
  return response.status(500).json({ message: "Server error", error: error });
};

const handleDatabaseResults = (databaseResult: any, response: Response) => {
  if (!databaseResult) {
    return response.status(404).json({ message: "Document not found" });
  }
  return response.status(200).json(databaseResult);
};

router.get("/", async (request, response) => {
  try {
    const resumes = await Resume.find();
    return response.status(200).json(resumes);
  } catch (error) {
    return handleRequestFailure(error, response);
  }
});

router.post("/", async (request, response) => {
  try {
    const resume = new Resume(request.body);
    const savedResume = await Resume.create(resume);
    return response.status(201).json(savedResume);
  } catch (error: unknown) {
    return handleRequestFailure(error, response);
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const updates = request.body;
    const updatedResume = await Resume.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    return handleDatabaseResults(updatedResume, response);
  } catch (error: unknown) {
    return handleRequestFailure(error, response);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deletedResume = await Resume.findByIdAndDelete(id);
    return handleDatabaseResults(deletedResume, response);
  } catch (error: unknown) {
    return handleRequestFailure(error, response);
  }
});

export default router;
