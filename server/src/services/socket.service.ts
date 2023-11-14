import { Socket, Server as SocketIOServer } from "socket.io";
import { Events } from "../enums/event.enum";
import { handleConnection } from "../handlers/connection.handler";
import { handleCreateGame } from "../handlers/create-game.handler";
import { handleGuessGame } from "../handlers/guess-game.handler";
import { handleUserRoomsRequest } from "../handlers/user-rooms.handler";
import { rooms } from "../state/rooms.state";

export function initializeSocket(io: SocketIOServer) {
  io.on(Events.Connection, (socket: Socket) => {
    handleConnection(socket);
    handleCreateGame(socket);
    handleUserRoomsRequest(socket);
    handleGuessGame(socket, rooms);
  });
}
