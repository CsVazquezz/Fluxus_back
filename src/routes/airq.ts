import express from "express";
import {
  getAirQualityReadings,
  createAirQualityReading,
  updateAirQualityReading,
  deleteAirQualityReading,
} from "../controllers/airq";

const router = express.Router();

router.get("/", getAirQualityReadings);
router.post("/", createAirQualityReading);
router.put("/:id", updateAirQualityReading);
router.delete("/:id", deleteAirQualityReading);

export default router;
