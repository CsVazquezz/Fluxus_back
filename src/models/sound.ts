import pool from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { SoundReading, PaginatedSoundReading } from "../interfaces/sound";

// Retrieve all sound records with pagination
export const findAllSoundReadings = async (
  limit: number,
  offset: number,
): Promise<PaginatedSoundReading> => {
  // Fetching the paginated data
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM SoundLevels LIMIT ? OFFSET ?",
    [limit, offset],
  );

  // Query to get the total count of records
  const [totalRows] = (await pool.query(
    "SELECT COUNT(*) as count FROM SoundLevels",
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
