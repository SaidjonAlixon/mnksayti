import { Router, type IRouter } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import healthRouter from "./health";
import driverApplicationRouter from "./driver-application";

const router: IRouter = Router();
const artifactDir = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.resolve(artifactDir, "../../uploads");

router.use(healthRouter);
router.use(driverApplicationRouter);
router.use("/uploads", express.static(uploadsDir));

export default router;
