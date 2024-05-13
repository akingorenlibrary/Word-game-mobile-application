import express from "express"
import {router} from "./routes/users.js"
import {dbConnection} from "./db.js";
import dotenv from "dotenv"

const app=express();

dotenv.config();
dbConnection();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(router);


app.listen(process.env.PORT,process.env.MYIP);