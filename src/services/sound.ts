import {
  findAllSoundReadings,
  insertSoundReading,
  updateSoundReading,
  deleteSoundReading,
} from "../models/sound";
import { SoundReading } from "../interfaces/sound";

// Retrieve all sound readings with optional filter by sensor_id
export const getAllSoundReadings = async (
  limit: number,
  offset: number,
  sensor_id?: number,
) => {
  return await findAllSoundReadings(limit, offset, sensor_id);
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
