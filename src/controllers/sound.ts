import { Request, Response } from "express";
import {
  getAllSoundReadings,
  createSoundReading,
  editSoundReading,
  removeSoundReading,
} from "../services/sound";

export const getSoundReadings = async (req: Request, res: Response) => {
  const { limit = 10, offset = 0 } = req.query;
  try {
    const readings = await getAllSoundReadings(Number(limit), Number(offset));
    res.json(readings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las lecturas de sonido", error });
  }
};

export const addSoundReading = async (req: Request, res: Response) => {
  try {
    const reading = await createSoundReading(req.body);
    res.status(201).json(reading);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al agregar la lectura de sonido", error });
  }
};

export const updateSoundReading = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await editSoundReading(Number(id), req.body);
    res.json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la lectura de sonido", error });
  }
};

export const deleteSoundReading = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedId = await removeSoundReading(Number(id));
    res.json({ id: deletedId });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la lectura de sonido", error });
  }
};
