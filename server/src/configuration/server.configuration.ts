import http from "http";
import app from "./app.configuration";

export const SERVER_PORT = 3001;

export const server = http.createServer(app);
