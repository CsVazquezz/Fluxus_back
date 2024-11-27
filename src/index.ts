import dotenvFlow from "dotenv-flow";
import express from "express";
import airRoute from "./routes/airq";
import soundRoute from "./routes/sound";
import testRoutes from "./routes/test";
import unknownResource from "./middlewares/uknown-resource";
import unknownError from "./middlewares/uknown-error";
import validationError from "./middlewares/validation-error";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";

//Upload dotenvFlow
if (process.env.NODE_ENV !== "production") {
  dotenvFlow.config();
}

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // Adjust this to your frontend's origin
    methods: ["GET", "POST"],
  },
});

// Middleware for CORS - to get all requests
app.use(cors());
// Middleware for JSON
app.use(express.json());

// Routes from the API

app.use("/api/v1/air_quality", airRoute);
app.use("/api/v1/sound", soundRoute);

//routes

app.use("/air", airRoute);
app.use("/sound", soundRoute);

// routes
app.use("/error", testRoutes);

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Make io accessible to routers/controllers
app.set("io", io);

// Middlewares
app.use(validationError); // Error de validacion
app.use(unknownResource); // Error 404, recurso no encontrado

// Middlewares de error
app.use(unknownError);

server.listen(process.env.SERVER_PORT, function () {
  console.log("Escuchando puerto " + process.env.SERVER_PORT);
});
