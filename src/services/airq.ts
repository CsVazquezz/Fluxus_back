import { AirQuality } from "../interfaces/airq";
import db from "../database"; // Your database connection

// Get all readings with pagination
export const findAll = async (
  limit: number,
  offset: number,
): Promise<AirQuality[]> => {
  return db.query("SELECT * FROM AirQuality LIMIT ? OFFSET ?", [limit, offset]);
};

// Insert a new reading
export const insert = async (reading: AirQuality): Promise<AirQuality> => {
  const [result] = await db.query(
    "INSERT INTO AirQuality (sensor_id, location, air_quality_ppm, temperature, humidity) VALUES (?, ?, ?, ?, ?)",
    [reading.sensor_id, reading.location, reading.air_quality_ppm],
  );
  return { id: result.insertId, ...reading };
};

// Update a reading by ID
export const update = async (
  id: number,
  reading: AirQuality,
): Promise<void> => {
  await db.query(
    "UPDATE AirQuality SET sensor_id = ?, location = ?, air_quality_ppm = ?, temperature = ?, humidity = ? WHERE id = ?",
    [reading.sensor_id, reading.location, reading.air_quality_ppm, id],
  );
};

// Delete a reading by ID
export const deleteById = async (id: number): Promise<void> => {
  await db.query("DELETE FROM AirQuality WHERE id = ?", [id]);
};
