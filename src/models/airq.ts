import pool from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { AirQuality, PaginatedAirQuality } from "../interfaces/airq";

// Retrieve all air quality records with pagination and optional filter by sensor_id
export const findAllAirQualityReadings = async (
  limit: number,
  offset: number,
  sensor_id?: number,
): Promise<PaginatedAirQuality> => {
  let query = "SELECT * FROM AirQuality";
  const params: (string | number)[] = [limit, offset];

  // If sensor_id is provided, add it to the query
  if (sensor_id) {
    query += " WHERE sensor_id = ?";
    params.unshift(sensor_id);
  }

  query += " LIMIT ? OFFSET ?";

  // Fetching the paginated data
  const [rows] = await pool.query<RowDataPacket[]>(query, params);

  // Query to get the total count of records (with optional sensor_id filter)
  let countQuery = "SELECT COUNT(*) as count FROM AirQuality";
  if (sensor_id) {
    countQuery += " WHERE sensor_id = ?";
  }
  const [totalRows] = (await pool.query(
    countQuery,
    sensor_id ? [sensor_id] : [],
  )) as [{ count: number }[], unknown];

  const total = totalRows[0].count;

  // Calculate the total number of pages
  const totalPages = Math.ceil(total / limit);

  // Returning paginated data
  return {
    page: Math.floor(offset / limit) + 1, // page number calculation
    limit,
    total,
    totalPages,
    data: rows as AirQuality[],
  };
};

// Insert a new air quality reading record
export const insertAirQualityReading = async (
  airQualityReading: AirQuality,
): Promise<AirQuality> => {
  const { sensor_id, location, timestamp, air_quality_ppm } = airQualityReading;
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO AirQuality (sensor_id, location, timestamp, air_quality_ppm) 
     VALUES (?, ?, ?, ?)`,
    [sensor_id, location, timestamp, air_quality_ppm],
  );
  const { insertId } = result;
  return { id: insertId, ...airQualityReading };
};

// Update an air quality reading record
export const updateAirQualityReading = async (
  id: number,
  airQualityReading: AirQuality,
): Promise<AirQuality> => {
  const { sensor_id, location, timestamp, air_quality_ppm } = airQualityReading;
  await pool.query<ResultSetHeader>(
    `UPDATE AirQuality
     SET sensor_id = ?, 
         location = ?, 
         timestamp = ?, 
         air_quality_ppm = ?
     WHERE id = ?;`,
    [sensor_id, location, timestamp, air_quality_ppm, id],
  );

  return { id, ...airQualityReading };
};

// Delete an air quality reading record
export const deleteAirQualityReading = async (id: number): Promise<number> => {
  await pool.query<ResultSetHeader>(`DELETE FROM AirQuality WHERE id = ?`, [
    id,
  ]);
  return id;
};
