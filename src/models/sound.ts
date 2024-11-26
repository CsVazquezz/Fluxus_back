import pool from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { SoundReading, PaginatedSoundReading } from "../interfaces/sound";

// Retrieve all sound records with pagination and optional filter by sensor_id
export const findAllSoundReadings = async (
  limit: number,
  offset: number,
  sensor_id?: number,
): Promise<PaginatedSoundReading> => {
  let query = "SELECT * FROM SoundLevels";
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
  let countQuery = "SELECT COUNT(*) as count FROM SoundLevels";
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
    data: rows as SoundReading[],
  };
};

// Insert a new sound reading record
export const insertSoundReading = async (
  soundReading: SoundReading,
): Promise<SoundReading> => {
  const { sensor_id, timestamp, sound_level } = soundReading;
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO SoundLevels (sensor_id, timestamp, sound_level) 
     VALUES (?, ?, ?)`,
    [sensor_id, timestamp, sound_level],
  );
  const { insertId } = result;
  return { id: insertId, ...soundReading };
};

// Update a sound reading record
export const updateSoundReading = async (
  id: number,
  soundReading: SoundReading,
): Promise<SoundReading> => {
  const { sensor_id, timestamp, sound_level } = soundReading;
  await pool.query<ResultSetHeader>(
    `UPDATE SoundLevels
     SET sensor_id = ?, 
         timestamp = ?, 
         sound_level = ?
     WHERE id = ?;`,
    [sensor_id, timestamp, sound_level, id],
  );

  return { id, ...soundReading };
};

// Delete a sound reading record
export const deleteSoundReading = async (id: number): Promise<number> => {
  await pool.query<ResultSetHeader>(`DELETE FROM SoundLevels WHERE id = ?`, [
    id,
  ]);
  return id;
};
