import { Socket } from "socket.io";
import { GameRoom } from "../entities/game-room.entity";
import { Events } from "../enums/event.enum";
import { rooms } from "../state/rooms.state";

export function handleCreateGame(socket: Socket) {
  socket.on(Events.CreateGame, (data: GameRoom) => {
    rooms[data.roomName] = data;

    socket.join(data.roomName);
  });
}
