import { Request, Response } from "express";
import {
  getAllAirQualityReadings,
  createAirQualityReading,
  editAirQualityReading,
  removeAirQualityReading,
} from "../services/airq";

export const getAirQualityReadings = async (req: Request, res: Response) => {
  const { limit = 10, offset = 0, sensor_id } = req.query;

  try {
    //Sensor id should be provided to fass it to function
    const readings = await getAllAirQualityReadings(
      Number(limit),
      Number(offset),
      sensor_id ? Number(sensor_id) : undefined,
    );
    res.json(readings);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las lecturas de calidad del aire",
      error,
    });
  }
};

export const addAirQualityReading = async (req: Request, res: Response) => {
  try {
    const reading = await createAirQualityReading(req.body);
    res.status(201).json(reading);
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar la lectura de calidad del aire",
      error,
    });
  }
};

export const updateAirQualityReading = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await editAirQualityReading(Number(id), req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la lectura de calidad del aire",
      error,
    });
  }
};

export const deleteAirQualityReading = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedId = await removeAirQualityReading(Number(id));
    res.json({ id: deletedId });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la lectura de calidad del aire",
      error,
    });
  }
};
