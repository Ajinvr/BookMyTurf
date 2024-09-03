import express from "express";
import cors from 'cors'
import { connectdb } from "./db/config/connectDb.js";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import user from "./routes/user-routes.js"
import admin from "./routes/admin-routes.js"
import turf from './routes/turf-routes.js'
import manager from './routes/manger-routes.js'
import order from './routes/order-routes.js'

dotenv.config();
connectdb();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
  optionsSuccessStatus: 200 
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api", user);
app.use("/api/turf",turf)
app.use("/api/order",order)
app.use("/api/manager",manager)
app.use("/api/admin",admin)


app.get("/",(req, res) => res.send("working..."));
app.all("*", (req, res, next) => res.status(404).json({ message: " Route does not exist" }));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
