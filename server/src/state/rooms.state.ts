import { GameRoom } from "../entities/game-room.entity";

interface Rooms {
  [key: string]: GameRoom;
}

export const rooms: Rooms = {};
