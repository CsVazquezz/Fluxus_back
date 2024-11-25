export interface AirQuality {
  id?: number;
  sensor_id: number;
  location?: string;
  air_quality_ppm: number;
  timestamp?: string;
}

export interface PaginatedAirQuality {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: AirQuality[];
}
