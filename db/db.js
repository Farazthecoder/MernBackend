import mongoose from "mongoose";

const dbConnection = async ()=>{
    try {
       const mongoDbConnection =  await mongoose.connect(`${process.env.MONGODB_URI}ApniLibrary`);
        console.log(mongoDbConnection.connection.host);
    } catch (error) {
        console.log("error connecting to MongoDB:",error.message);
    }
}

export default dbConnection;