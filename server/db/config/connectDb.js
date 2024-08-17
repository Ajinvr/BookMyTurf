import mongoose from "mongoose";

export const connectdb = async () =>{
    try {
        await mongoose.connect(process.env.DBURL)
        console.log("connection to db succesfull");
    } catch (error) {
        console.log(error);
        
    }
}
