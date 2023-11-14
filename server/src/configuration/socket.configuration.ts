import { Server as SocketIOServer } from "socket.io";
import { server } from "./server.configuration";
import { APP_BASE_URL } from "./environment.configuration";

export const io = new SocketIOServer(server, {
  cors: {
    origin: "http://127.0.0.1:5173", // APP_BASE_URL,
    methods: ["GET", "POST"],
  },
});
