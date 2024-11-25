import { Request, Response } from "express";
import { deleteById, findAll, insert, update } from "../services/airq";
import { AirQuality } from "../interfaces/airq";

// Obtener todas las lecturas de calidad del aire
export const getAirQualityReadings = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const offset = (page - 1) * limit;

    const readings = await findAll(limit, offset);
    res.status(200).json(readings);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las lecturas de calidad del aire",
      error,
    });
  }
};

// Crear una nueva lectura de calidad del aire
export const createAirQualityReading = async (req: Request, res: Response) => {
  try {
    const reading: AirQuality = req.body;
    const newReading = await insert(reading);

    // Emitir evento via WebSocket
    const io = req.app.get("io");
    io.emit("newAirQualityData", newReading);
    res
      .status(201)
      .json({ message: "Lectura de calidad del aire creada exitosamente" });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear la lectura de calidad del aire",
      error,
    });
  }
};

// Actualizar una lectura de calidad del aire
export const updateAirQualityReading = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const reading: AirQuality = req.body;
    await update(id, reading);
    res.status(201).json({
      message: "Lectura de calidad del aire actualizada exitosamente",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar la lectura de calidad del aire",
      error,
    });
  }
};

// Eliminar una lectura de calidad del aire
export const deleteAirQualityReading = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    await deleteById(id);
    res
      .status(201)
      .json({ message: "Lectura de calidad del aire eliminada exitosamente" });
  } catch (error) {
    res.status(400).json({
      message: "Error al eliminar la lectura de calidad del aire",
      error,
    });
  }
};
