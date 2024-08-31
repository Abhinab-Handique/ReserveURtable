import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MongoDb_URI,{
        dbName:"RESTURANT"
    }).then(()=>{
        console.log("connected successfully");
    })
    .catch(err=>{
        console.log(err);
    })
};