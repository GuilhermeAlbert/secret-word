import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_BASE_URL } from "../../configuration/environment.configuration";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socketIo: Socket = io(SOCKET_BASE_URL);

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
