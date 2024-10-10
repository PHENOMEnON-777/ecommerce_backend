import  express, {Express, Request, Response}  from "express";
import { PORT } from "./secreate";
import rootRouter from "./routes";
import { PrismaClient} from "@prisma/client";
import { errorMiddleware } from "./middlewares/errors";
// import authMiddleware from "./middlewares/auth";

const app:Express = express() 

app.use(express.json())



app.use('/api',rootRouter);


export const Prismaclient = new PrismaClient({
    log:['query']
})

app.use(errorMiddleware)

// app.use(authMiddleware)

app.listen(PORT, ()=>{console.log('the server is  working...')})