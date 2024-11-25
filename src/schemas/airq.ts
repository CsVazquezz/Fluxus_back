import { z } from "zod";

export const airQualitySchema = z.object({
  sensor_id: z
    .number()
    .int()
    .positive({ message: "El ID del sensor debe ser un número positivo" }),
  location: z.string().optional().min(3, {
    message: "La ubicación debe tener al menos 3 caracteres",
  }),
  air_quality_ppm: z
    .number()
    .positive({ message: "La calidad del aire debe ser un número positivo" }),
  temperature: z
    .number()
    .optional()
    .refine((temp) => temp >= -50 && temp <= 50, {
      message: "La temperatura debe estar entre -50 y 50 grados",
    }),
});
