//importing necessary modules to set up db (dotenv, mongoose)
import dotenv from 'dotenv';
import mongoose from 'mongoose';

//set up dotenv
dotenv.config();

//configuring URL w/ MONGO_URL from .env file!
//.then is a callback function; programmed it so that it displays message to console if succesfully connected with the database
//.catch is another callback function; programmed it to catch errors and display them to consolcc q
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Connected to the Database"))
.catch(err=>console.log(err));



