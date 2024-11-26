import { Router } from "express";
import {
  getSoundReadings,
  addSoundReading,
  updateSoundReading,
  deleteSoundReading,
} from "../controllers/sound";

import validate from "../middlewares/validate";
import { soundSchema } from "../schemas/sound";

const router = Router();

// Adjust the route to accept sensor_id as a query parameter
router.get("/", getSoundReadings);
router.post("/", validate(soundSchema), addSoundReading);
router.put("/:id", validate(soundSchema), updateSoundReading);
router.delete("/:id", deleteSoundReading);

export default router;
