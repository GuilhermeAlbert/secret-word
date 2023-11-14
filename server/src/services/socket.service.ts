import { Socket, Server as SocketIOServer } from "socket.io";
import { Events } from "../enums/event.enum";
import { handleConnection } from "../handlers/connection.handler";
import { handleCreateGame } from "../handlers/create-game.handler";
import { handleUserRoomsRequest } from "../handlers/user-rooms.handler";

export function initializeSocket(io: SocketIOServer) {
  io.on(Events.Connection, (socket: Socket) => {
    handleConnection(socket);
    handleCreateGame(socket);
    handleUserRoomsRequest(socket);
  });
}
