import express from "express";
import { SongController } from "../controllers/song.controller.js";
import upload from "../middleware/multer.middleware.js";

const songRouter = express.Router();

songRouter.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  SongController.addSong
);
songRouter.get("/list", SongController.listSong);
songRouter.post("/remove", SongController.removeSong);

export default songRouter;
