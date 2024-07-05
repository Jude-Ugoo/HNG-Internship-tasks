import express, { Express, Request, Response } from "express"
import { database } from "./utils/db";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route";

const app: Express = express()
const PORT = 8801
app.use(express.json());
app.use(cookieParser());
database()


app.get('/', (req: Request, res:Response) => {
    res.send('Hello World')
})

app.use('/auth', authRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})