import pool from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { PaginatedAirQuality, AirQuality } from "../interfaces/airq";

// Retrieve all air quality records with pagination
export const findAllAirQuality = async (
  limit: number,
  offset: number,
): Promise<PaginatedAirQuality> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM AirQuality LIMIT ? OFFSET ?",
    [limit, offset],
  );

  // Query to get the total count of records
  const [totalRows] = (await pool.query(
    "SELECT COUNT(*) as count FROM AirQuality",
  )) as [{ count: number }[], unknown];
  const total = totalRows[0].count;

  // Calculate the total number of pages
  const totalPages = Math.ceil(total / limit);
  return {
    page: offset / limit + 1,
    limit,
    total,
    totalPages,
    data: rows as AirQuality[],
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
