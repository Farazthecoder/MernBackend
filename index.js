import express from 'express';
import dotenv from "dotenv";
import dbConnection from './db/db.js';
import cors from "cors"

const app = express();

dotenv.config({
    path:".env"
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

// Logic for the routers 

import bookRoute from "./routes/book.route.js"
import SignupRoute from "./routes/User.route.js"

app.get("/",(req,res)=>{
    res.send("Hello from the server");
 });

app.use("/book", bookRoute);
app.use("/user", SignupRoute);

dbConnection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("app listening on port",process.env.PORT);
    })
}).catch(err => console.log("failed to listen on port",err.message));