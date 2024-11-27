import { Router } from "express";
import {
  getAirQualityReadings,
  addAirQualityReading,
  updateAirQualityReading,
  deleteAirQualityReading,
} from "../controllers/airq";

import validate from "../middlewares/validate";
import { airQualitySchema } from "../schemas/airq";

const router = Router();

router.get("/", getAirQualityReadings);
router.post("/", validate(airQualitySchema), addAirQualityReading);
router.put("/:id", validate(airQualitySchema), updateAirQualityReading);
router.delete("/:id", deleteAirQualityReading);

export default router;
