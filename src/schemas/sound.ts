import { z } from "zod";

export const soundSchema = z.object({
  sensor_id: z
    .number()
    .int()
    .positive({ message: "El ID del sensor debe ser un número positivo" }),
  sound_level: z
    .number()
    .positive({ message: "El nivel de sonido debe ser un número positivo" }),
  timestamp: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$/.test(val),
      {
        message: "El formato de la fecha debe ser 'YYYY-MM-DDTHH:MM:SSZ'",
      },
    ),
});
