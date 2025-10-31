import {Router} from "express";
import { getLatestReading } from "../services/deviceService.js";

const router = Router();
router.get("/latest", (req,res) => {
    const reading = getLatestReading();
    if(!reading){
        return res.status(404).json({message: "No reading avalibale yet"})
    }
    res.json(reading)
});
export default router;