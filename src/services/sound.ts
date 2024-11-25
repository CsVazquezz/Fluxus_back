import {
  findAllSoundReadings,
  insertSoundReading,
  updateSoundReading,
  deleteSoundReading,
} from "../models/sound";
import { SoundReading } from "../interfaces/sound";

export const getAllSoundReadings = async (limit: number, offset: number) => {
  return await findAllSoundReadings(limit, offset);
};

export const createSoundReading = async (reading: SoundReading) => {
  return await insertSoundReading(reading);
};

export const editSoundReading = async (id: number, reading: SoundReading) => {
  return await updateSoundReading(id, reading);
};

export const removeSoundReading = async (id: number) => {
  return await deleteSoundReading(id);
};
