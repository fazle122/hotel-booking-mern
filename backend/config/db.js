import mongoose from "mongoose";

const connectDB = async() => {
    try{
        const connectionResponse = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`DB connected : ${connectionResponse.connection.host}`)

    }catch(error){
        console.log(`DB error : ${ error.message}`);
    }
}

export default connectDB;