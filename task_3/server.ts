import express, {Express, Request, Response } from "express"
import { database } from "./utils/db";
import cookieParser from "cookie-parser";

const app: Express = express()

app.use(express.json());
app.use(cookieParser());
database()


export default app