import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import routerServer from "./src/routes/server.route.js";
import connectDB from "./src/config/mongoDB.config.js";
import connectCloudinary from "./src/config/cloudinary.config.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

//connectDB
connectDB();

// connect cloudinary
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("tiny"));

//route

app.use("/api", routerServer);

app.listen(port, () => console.log(`Server started on ${port}`));
