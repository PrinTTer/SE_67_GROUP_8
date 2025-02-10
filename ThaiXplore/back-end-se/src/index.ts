import express from "express";
import http from "http";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {config} from "./configs/config";
import mongoose from "mongoose";
import router from "./routes/index"

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(config.PORT , ()=> {
    console.log("Server running on http://localhost:3000/");
});

const MONGO_URL = config.MONGODB_URL;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error' , (error)=>console.log(error));


app.use('/' , router());