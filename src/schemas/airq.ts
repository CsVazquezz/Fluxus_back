import { z } from "zod";

export const airQualitySchema = z.object({
  sensor_id: z
    .number()
    .int()
    .positive({ message: "El ID del sensor debe ser un número positivo" }),
  location: z.string().min(3, {
    message: "La ubicación debe tener al menos 3 caracteres",
  }),
  air_quality_ppm: z
    .number()
    .positive({ message: "La calidad del aire debe ser un número positivo" }),
  temp: z
    .number()
    .optional()
    .refine((temp) => temp === undefined || (temp >= -50 && temp <= 50), {
      message: "Temperature must be between -50 and 50",
    }),
  timestamp: z.string().optional(),
});
