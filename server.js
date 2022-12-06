import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  // options
});

io.on("connection", (socket) => {
  socket.on("join_room", (room, cb) => {
    socket.join(room);
    socket.data.room = room;
    cb({
      value: `Connected`,
    });
  });

  /**
   * Sending to all clients in room except sender
   * @param {string} action
   * @param {*} data
   */
  const sender = (action, data) => {
    socket.broadcast.to(socket.data.room).emit(action, data);
  };

  socket.on("send_message", (data) => sender("get_message", data));
});

httpServer.listen(3000, () => {
  console.log(`Socket IO is running on port 3000.`);
});
