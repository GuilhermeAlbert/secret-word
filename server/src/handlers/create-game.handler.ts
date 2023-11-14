import { Socket } from "socket.io";
import { GameRoom } from "../entities/game-room";
import { Events } from "../enums/event.enum";

const rooms: Record<string, GameRoom> = {};

export function handleCreateGame(socket: Socket) {
  socket.on(
    Events.CreateGame,
    ({ roomName, password, ...otherData }: GameRoom) => {
      console.log(`Room ${roomName} created with password ${password}`);

      rooms[roomName] = { password, roomName, ...otherData };
      socket.join(roomName);

      socket.emit("roomCreated", { roomName, password });
      socket.emit(Events.RoomsListUpdated, Object.keys(rooms));
    }
  );
}
