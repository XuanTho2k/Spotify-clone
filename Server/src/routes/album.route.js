import express from "express";
import { AlbumController } from "../controllers/album.controller.js";
import upload from "../middleware/multer.middleware.js";

const albumRouter = express.Router();

albumRouter.post("/add", upload.single("imageFile"), AlbumController.addAlbum);
albumRouter.get("/list", AlbumController.listAlbum);
albumRouter.post("/remove", AlbumController.removeAlbum);

export default albumRouter;
