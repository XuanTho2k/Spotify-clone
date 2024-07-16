import express from "express";
import songRouter from "./song.route.js";
import albumRouter from "./album.route.js";
const routerServer = express.Router();

routerServer.use("/songs", songRouter);
routerServer.use("/albums", albumRouter);

export default routerServer;
