export interface SoundReading {
  id?: number;
  sensor_id: number;
  sound_level: number; // dB
  timestamp?: string;
}

export interface PaginatedSoundReading {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: SoundReading[];
}
