import express from "express";
import cors from "cors";
import connectMongoDB from "./config/dbconfig.js";
import router from "./routes/index.js";

const app = express();
app.use(cors());

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

const dbUrl = process.env.DB_URI || "mongodb://127.0.0.1:27017/db_react";

connectMongoDB(dbUrl);

app.use("/", router);

export const viteNodeApp = app;
