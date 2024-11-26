import { AirQuality } from "../interfaces/airq";
import {
  findAllAirQuality,
  insertAirQuality,
  updateAirQuality,
  deleteAirQuality,
} from "../models/airq";

// Retrieve air quality records filtered by sensor_id, with pagination
export const findAll = async (
  sensorId: number,
  limit: number,
  offset: number,
) => {
  return await findAllAirQuality(sensorId, limit, offset);
};

export const insert = async (airQuality: AirQuality) => {
  return await insertAirQuality(airQuality);
};

export const update = async (id: number, airQuality: AirQuality) => {
  return await updateAirQuality(id, airQuality);
};

export const deleteById = async (id: number) => {
  return await deleteAirQuality(id);
};
