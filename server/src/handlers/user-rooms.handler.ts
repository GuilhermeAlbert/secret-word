import { Socket } from "socket.io";
import { Events } from "../enums/event.enum";
import { rooms } from "../state/rooms.state";

export function handleUserRoomsRequest(socket: Socket) {
  socket.on(Events.RequestUserRooms, (userId) => {
    const userRooms = Object.values(rooms).filter(
      (room) => room.userId === userId
    );

    console.log(userRooms);

    socket.emit(Events.UserRoomsList, userRooms);
  });
}
