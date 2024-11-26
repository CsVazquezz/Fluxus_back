import {
  findAllAirQualityReadings,
  insertAirQualityReading,
  updateAirQualityReading,
  deleteAirQualityReading,
} from "../models/airq";
import { AirQuality } from "../interfaces/airq";

// Retrieve all air quality readings with optional filter by sensor_id
export const getAllAirQualityReadings = async (
  limit: number,
  offset: number,
  sensor_id?: number,
) => {
  return await findAllAirQualityReadings(limit, offset, sensor_id);
};

export const createAirQualityReading = async (reading: AirQuality) => {
  return await insertAirQualityReading(reading);
};

export const editAirQualityReading = async (
  id: number,
  reading: AirQuality,
) => {
  return await updateAirQualityReading(id, reading);
};

export const removeAirQualityReading = async (id: number) => {
  return await deleteAirQualityReading(id);
};
