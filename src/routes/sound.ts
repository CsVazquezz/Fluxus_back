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

router.get("/", getSoundReadings);
router.post("/", validate(soundSchema), addSoundReading);
router.put("/:id", validate(soundSchema), updateSoundReading);
router.delete("/:id", deleteSoundReading);

export default router;
