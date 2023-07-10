
//importing modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import "./db/database.js";
import UserRouter from "./routes/user.js";

//setting port * need .env file set up
dotenv.config();
const PORT = process.env.PORT;
const app = express();

//middleware
app.use(express.json());
app.use(cors({credentials: true}));

//for app to use routes
app.use("/api/user", UserRouter);

//setting up routes
app.get("/", (request, response)=>{
    response.json({message: "This is the home route"});
});

//run server
app.listen(PORT, ()=> {
    console.log("App is running on port:", PORT);
});


