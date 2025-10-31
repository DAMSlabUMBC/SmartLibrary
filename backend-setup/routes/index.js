import { Router } from "express";
import deviceRoutes from "./deviceRoutes.js"
const router = Router();
router.use("/devices", deviceRoutes);

export default router;