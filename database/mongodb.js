import mongoose from 'mongoose';
import { DB_URI, NODE_ENV}  from "../config/env.js";
import e from "express";

if(!DB_URI) {
    throw new Error("PLease define the MONGODB_URI environment variable inside .env.<development/production");
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`Connected to database in ${NODE_ENV} mode`);
    }catch(error) {
        console.error('Error connecting to database: ', error);
        process.exit(1);
    }
}

export default connectToDatabase;