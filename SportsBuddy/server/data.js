import mongoose from "mongoose";
import { config } from "dotenv";
import Event from "./models/eventModel.js";
config();

const data =[]

mongoose.connect(process.env.MONGO_URL, {}).then(() => console.log("Database connected successfully")).catch((err) => console.log("Database connection error:", err));

const importData = async () => {
    try {
        await Event.insertMany(data);
        console.log("Data Imported!");
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();   