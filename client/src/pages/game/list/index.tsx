import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useApp } from "../../../app/contexts/app/hooks/app.hook";
import { GameRoom } from "../../../app/entities/game-room.entity";
import { Events } from "../../../app/enums/event.enum";
import { AppRoutes } from "../../../app/enums/route.enum";
import useSocket from "../../../app/hooks/socket.hook";
import { Card } from "../../../components/card";
import { Header } from "../../../components/header";

export function ListGamesPage(): JSX.Element {
  const [gameRooms, setRooms] = useState<GameRoom[]>([]);

  const socket = useSocket();
  const { state: appState } = useApp();
  const navigate: NavigateFunction = useNavigate();

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
        <div className="-mx-3 mb-6">
          <Header title={"My games"} />

          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-4">
              {gameRooms.map((gameRoom, index) => (
                <div className="item">
                  <Card
                    key={index}
                    title={gameRoom.tip}
                    subtitle={gameRoom.password}
                    onClick={() =>
                      navigate(AppRoutes.PlayGame, {
                        state: {
                          room: gameRoom.roomName,
                          password: gameRoom.password,
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
