import { AirQuality } from "../interfaces/airq";
import {
  findAllAirQuality,
  insertAirQuality,
  updateAirQuality,
  deleteAirQuality,
} from "../models/airq";

// Retrieve all air quality records
export const findAll = async (limit: number, offset: number) => {
  return await findAllAirQuality(limit, offset);
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
