import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/album.model.js";

export class AlbumController {
  static addAlbum = async (req, res) => {
    try {
      const { name, desc, bgColour } = req.body;
      const imageFile = req.file;

      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      const albumData = {
        name,
        desc,
        bgColour,
        image: imageUpload.secure_url,
      };
      const album = albumModel(albumData);
      await album.save();
      res.json({ success: true, message: "Added Album!" });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  };
  static listAlbum = async (req, res) => {
    try {
      const albumList = await albumModel.find();
      res.json({ success: true, albums: albumList });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  };
  static removeAlbum = async (req, res) => {
    try {
      await albumModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Album removed!" });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  };
}
