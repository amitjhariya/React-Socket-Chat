import { Server } from "socket.io";
import Users from "./models/Users.js";
import Messages from "./models/Message.js";
import Groups from "./models/ChatGroup.js";

const Socket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("disconnect", (data) => {
      console.log("A user disconnected", data);
    });

    socket.on("login", async (data) => {
      // console.log(`${data.name} ${socket.id} logged in`);
      const user = await Users.updateOne(
        { _id: data._id },
        { socket: socket.id }
      );
      // console.log(user)
    });

    socket.on("message", async (data) => {
      // console.table(users);
      // console.log("Received message:", data);
      const { to, from, text } = data;
      const groups = await Groups.findById(to).select("name").populate({
        path: "users",
        select: "socket name",
      });


      const message = Messages.create({ sender: from, text });

      groups.users.map((user, i) => {
        // console.log(`Sending MSG to ${user}`)
        if (user._id == from) return;
        io.to(user.socket).emit("message", { from, text });
      });

      // io.to(socketId).emit("message", { from: data.from, text });
    });
  });

  const chat = io.of("/chat");

  chat.on("connection", (socket) => {
    socket.on("join_room", (room) => {
      socket.join(room);
    });

    socket.on("leave_room", (room) => {
      socket.leave(room);
    });

    socket.on("message", (data) => {
      chat.in(data.room).emit("message", data);
    });
  });
};

export default Socket;
