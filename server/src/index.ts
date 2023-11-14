import app from "./configuration/app.configuration";
import { server, SERVER_PORT } from "./configuration/server.configuration";
import { io } from "./configuration/socket.configuration";
import routes from "./routes";
import { initializeSocket } from "./services/socket.service";

app.use(routes);

initializeSocket(io);

server.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
