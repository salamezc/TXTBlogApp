import express from "express";
import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//variable to set up a route
const UserRouter = express.Router();

UserRouter.use(express.json());

//get created user
UserRouter.get("/", async (request, response)=>{
    await User.find()
    .then((result)=>{
        response.status(200).json({result})
    })
    .catch(err=>{
        response.status(200).json({error: err})
    })
});

//user register route/create a user
UserRouter.post("/register", async (request, response)=>{
    try {
        const {name, email, password} = request.body;
        if (name && email && password){
            const hashPassword = await bcrypt.hash(password, 10) //#10 is how many times we want to sort our password
            const user = await User.create({name, email, password: hashPassword})
            response.status(200).json({msg: "User Registered Succesfully", user: user})
        }else{
            response.status(400).json({msg: "Please Fill the Required Fields"})
        }
    } catch(error) {
        response.status(400).json({error: error})
    }
}); 

//user login route ( request #404 = not found) (request #201 = successfully logged in)
UserRouter.post("/login", async (request, response) => {
    try {
        const {email, password} = request.body;
        const existUser = await User.findOne({email}) 
        if (!existUser){
            response.status(404).json({error: "User not Found"})
        }
        const comparePassword = await bcrypt.compare(password, existUser.password)
        if (!comparePassword){
            response.status(400).json({msg: "Wrong Credentials"})
        }
        const token = jwt.sign({id: existUser._id}, process.env.SECRET)
        response.status(201).json({msg: "User Logged In", token: token})
    } catch (error) {
        response.status(400).json({error: error})
    }
});

export default UserRouter;