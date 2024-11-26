import pool from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { PaginatedAirQuality, AirQuality } from "../interfaces/airq";

// Retrieve all air quality records with pagination and filter by sensor_id
export const findAllAirQuality = async (
  sensorId: number, // Added parameter for sensor_id
  limit: number,
  offset: number,
): Promise<PaginatedAirQuality> => {
  // Modified query to filter by sensor_id
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM AirQuality WHERE sensor_id = ? LIMIT ? OFFSET ?",
    [sensorId, limit, offset], // Pass sensor_id as a parameter
  );

  // Query to get the total count of records for the given sensor_id
  const [totalRows] = (await pool.query(
    "SELECT COUNT(*) as count FROM AirQuality WHERE sensor_id = ?",
    [sensorId], // Pass sensor_id as a parameter
  )) as [{ count: number }[], unknown];
  const total = totalRows[0].count;

  // Calculate the total number of pages
  const totalPages = Math.ceil(total / limit);

  return {
    page: offset / limit + 1,
    limit,
    total,
    totalPages,
    data: rows as AirQuality[], // Return the filtered data
  };
};

// Insert a new air quality record
export const insertAirQuality = async (
  airQuality: AirQuality,
): Promise<AirQuality> => {
  const { sensor_id, timestamp, air_quality_ppm, location } = airQuality;
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO AirQuality (sensor_id, timestamp, air_quality_ppm, location) 
     VALUES (?, ?, ?, ?)`,
    [sensor_id, timestamp, air_quality_ppm, location],
  );
  const { insertId } = result;
  return { id: insertId, ...airQuality };
};

// Update an air quality record
export const updateAirQuality = async (
  id: number,
  airQuality: AirQuality,
): Promise<AirQuality> => {
  const { sensor_id, timestamp, air_quality_ppm, location } = airQuality;
  await pool.query<ResultSetHeader>(
    `UPDATE AirQuality
     SET sensor_id = ?, 
         timestamp = ?, 
         air_quality_ppm = ?, 
         location = ?
     WHERE id = ?;`,
    [sensor_id, timestamp, air_quality_ppm, location, id],
  );

  return { id, ...airQuality };
};

// Delete an air quality record
export const deleteAirQuality = async (id: number): Promise<number> => {
  await pool.query<ResultSetHeader>(`DELETE FROM AirQuality WHERE id = ?`, [
    id,
  ]);
  return id;
};
