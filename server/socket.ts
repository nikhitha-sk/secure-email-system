import { Server } from "socket.io";
import http from "http";

export function initSocket(server: http.Server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("User Connected");

    socket.on("sendEmail", (data) => {
      io.emit("newEmail", data);
    });
  });
}