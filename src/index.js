// require('dotenv').config({path:'./env'})//we not use this instead we use two lines 

import dotenv from "dotenv";


// import mongoose from "mongoose"
// import {DB_NAME} from "./constants"
// import express from "express"
// import connectDB from "./db"// this give error on run npm run dev in terminal so we do 
import connectDB from "./db/index.js"

dotenv.config({
    path:"./env"
})


connectDB()
.then(()=>{
    let port=process.env.PORT||8000
    app.listen(port,()=>{
        console.log(`Server is running at ${port}`)
    })
})
.catch((error)=>{
    console.log("Mongo DB connection failed :",error)
} )
//this is our first approach to connect db 
/*
const app=express();


;(async()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       app.on("error",(error)=>{
        console.log("ERROR: "+error);
        throw error;
       })

       app.listen(process.env.PORT,()=>{
        console.log(`app is listen on port ${process.env.PORT}`)
       });

    } catch (error) {
        console.error("ERROR: "+error)
        throw error
    }
})() */