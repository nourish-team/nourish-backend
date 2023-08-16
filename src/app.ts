import express, { Application, Router } from "express";
import router from "./routes";
import cors from "cors";
import dotenv from "dotenv";

import "dotenv/config";


const app: Application = express();

const allowedOrigins = ["http://10.0.2.2:8080"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.static("public"));
app.use(express.json());
app.use(router);


export default app