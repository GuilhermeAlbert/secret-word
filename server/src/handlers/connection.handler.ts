import { Socket } from "socket.io";

export function handleConnection(socket: Socket) {
  console.log("A user connected", socket.connected);
}
