import express from "express";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import user from "./routes/user-routes.js"
import { connectdb } from "./db/config/connectDb.js";
import { userAuth } from "./middlewares/userAuthMiddleware.js";
import turf from './routes/turf-routes.js'

dotenv.config();
connectdb();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api", user);
app.use("/api/manager", turf)



app.get("/",(req, res) => res.send("working..."));
app.all("*", (req, res, next) => res.status(404).json({ message: " Route does not exist 😑" }));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
