import { useEffect, useState } from "react";
import { GameRoom } from "../../../app/entities/game-room";
import { Header } from "../../../components/header";
import useSocket from "../../../app/hooks/socket.hook";
import { Events } from "../../../app/enums/event.enum";

export function ListGamesPage(): JSX.Element {
  const [gameRooms, setRooms] = useState<GameRoom[]>([]);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on(Events.RoomsListUpdated, (updatedRoomsList) => {
        setRooms(updatedRoomsList);
      });
    }

    return () => {
      if (socket) {
        socket.off(Events.RoomsListUpdated);
      }
    };
  }, [socket]);

  return (
    <>
      <div className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <Header title={"My games"} />

          <ul>
            {gameRooms.map((room, index) => (
              <li key={index}>
                {room.roomName} | Tip: {room.tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
