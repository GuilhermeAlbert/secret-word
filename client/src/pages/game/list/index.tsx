import { useEffect, useState } from "react";
import { GameRoom } from "../../../app/entities/game-room.entity";
import { Header } from "../../../components/header";
import useSocket from "../../../app/hooks/socket.hook";
import { Events } from "../../../app/enums/event.enum";
import { useApp } from "../../../app/contexts/app/hooks/app.hook";

export function ListGamesPage(): JSX.Element {
  const [gameRooms, setRooms] = useState<GameRoom[]>([]);

  const socket = useSocket();
  const { state: appState } = useApp();

  useEffect(() => {
    if (socket && appState.userIdentifier) {
      socket.emit(Events.RequestUserRooms, appState.userIdentifier);

      socket.on(Events.UserRoomsList, (userRooms) => {
        setRooms(userRooms);
      });
    }

    return () => {
      if (socket) {
        socket.off(Events.UserRoomsList);
      }
    };
  }, [socket, appState.userIdentifier]);

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
