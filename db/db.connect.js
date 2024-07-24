// const mongoose = require("mongoose");
import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config()
const mongoURI = process.env.MONGODB;

const initializeDatabase = async () => {
    try {
        const connection = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        if (connection) {
            console.log("connected successfully");
        }
    } catch (error) {
        console.log("Connection failed", error);
    }
};

// module.exports = { initializeDatabase };
export default initializeDatabase
