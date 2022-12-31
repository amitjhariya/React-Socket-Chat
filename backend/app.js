import Express from "express";
import {createServer} from 'http';
import {Server } from "socket.io";
import indexRouter from './routes/index.js'
import cors from "cors";
import { PORT } from "./configurations/index.js";
import {InitiateMongoServer} from './configurations/db.js'


const app = Express();
const httpServer = createServer(app);
InitiateMongoServer()


app.use(cors())
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))


app.use("/", indexRouter);



const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const users = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', (data) => {
    console.log('A user disconnected',data);
  });

  socket.on('login', (username) => {
    console.log(`User ${username} logged in`);
    users.set(username, socket.id);
  });

  socket.on('message', (data) => {
    console.table(users)
    console.log('Received message:', data);
    const { to, text } = data;
    const socketId = users.get(to);
    io.to(socketId).emit('message', { from: data.from, text });
  });
});

const chat = io.of('/chat');

chat.on('connection', (socket) => {
  socket.on('join room', (room) => {
    socket.join(room);
  });

  socket.on('leave room', (room) => {
    socket.leave(room);
  });

  socket.on('message', (data) => {
    chat.in(data.room).emit('message', data);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening at port : ${PORT}`);
});
