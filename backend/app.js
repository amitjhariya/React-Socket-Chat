import Express from "express";
import {createServer} from 'http';
import indexRouter from './routes/index.js'
import cors from "cors";
import { PORT } from "./configurations/index.js";
import {InitiateMongoServer} from './configurations/db.js'
import cookieParser from "cookie-parser";
import socket from "./socket.js";


const app = Express();
const httpServer = createServer(app);

InitiateMongoServer()

socket(httpServer)

app.use(cors())
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use("/", indexRouter);

httpServer.listen(PORT, () => {
  console.log(`Server listening at port : ${PORT}`);
});

