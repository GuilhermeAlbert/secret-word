import { Socket, Server as SocketIOServer } from "socket.io";
import { handleConnection } from "../handlers/connection.handler";
import { handleCreateGame } from "../handlers/create-game.handler";
import { Events } from "../enums/event.enum";

export function initializeSocket(io: SocketIOServer) {
  io.on(Events.Connection, (socket: Socket) => {
    handleConnection(socket);
    handleCreateGame(socket);

    console.info("A user connected");
  });
}
