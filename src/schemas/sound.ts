import { z } from "zod";

export const soundSchema = z.object({
  sensor_id: z
    .number()
    .int()
    .positive({ message: "El ID del sensor debe ser un número positivo" }),
  location: z
    .string()
    .min(3, { message: "La ubicación debe tener al menos 3 caracteres" }),
  sound_level: z
    .number()
    .positive({ message: "El nivel de sonido debe ser un número positivo" }),
  timestamp: z.string().optional(),
});
