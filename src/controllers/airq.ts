import { Request, Response } from "express";
import { deleteById, findAll, insert, update } from "../services/airq";
import { AirQuality } from "../interfaces/airq";

// Get all air quality readings
export const getAirQualityReadings = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const offset = (page - 1) * limit;

    const readings = await findAll(limit, offset);
    res.status(200).json(readings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving air quality readings", error });
  }
};

// Create a new air quality reading
export const createAirQualityReading = async (req: Request, res: Response) => {
  try {
    const reading: AirQuality = req.body;
    const newReading = await insert(reading);

    // Emit event via WebSocket
    const io = req.app.get("io");
    io.emit("newAirQualityData", newReading);
    res
      .status(201)
      .json({ message: "Air quality reading created successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating air quality reading", error });
  }
};

// Update an air quality reading
export const updateAirQualityReading = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    const reading: AirQuality = req.body;
    await update(id, reading);
    res
      .status(201)
      .json({ message: "Air quality reading updated successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating air quality reading", error });
  }
};

// Delete an air quality reading
export const deleteAirQualityReading = async (req: Request, res: Response) => {
  try {
    const id = Number.parseInt(req.params.id);
    await deleteById(id);
    res
      .status(201)
      .json({ message: "Air quality reading deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting air quality reading", error });
  }
};
