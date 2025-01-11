import mongoose from "mongoose";
import { config } from "dotenv";
import Event from "./models/eventModel.js";
config();

const data = [
  {
    "name": "Lucknow Marathon",
    "description": "A long-distance running event for professionals and enthusiasts. Join us to test your endurance and determination.",
    "time": "06:00",
    "date": "2025-08-25",
    "category": "Running",
    "difficulty": "Advanced",
    "participants": [
      "678290a44da7e3a0788a73e3",
      "678290a44da7e3a0788a73e6",
      "678292058e92ea4894f9da42",
      "678292058e92ea4894f9da44",
      "678292058e92ea4894f9da48"
    ],
    "location": {
      "address": "Gomti Nagar Track",
      "city": "Lucknow",
      "state": "Uttar Pradesh"
    },
    "maxParticipants": 500,
    "registrationFee": 500,
    "createdBy": "6782925c8c6ab84ee7822fa7"
  },
  {
    "name": "Kanpur City Run",
    "description": "A vibrant running event covering the city's scenic routes. Perfect for runners of all levels.",
    "time": "07:00",
    "date": "2025-09-10",
    "category": "Running",
    "difficulty": "Intermediate",
    "participants": [
      "678290a44da7e3a0788a73e5",
      "678290a44da7e3a0788a73e8",
      "678292058e92ea4894f9da43",
      "678292058e92ea4894f9da47",
      "678292058e92ea4894f9da49"
    ],
    "location": {
      "address": "Nana Rao Park",
      "city": "Kanpur",
      "state": "Uttar Pradesh"
    },
    "maxParticipants": 300,
    "registrationFee": 300,
    "createdBy": "6782925c8c6ab84ee7822fa7"
  },
  {
    "name": "Varanasi Sunrise Run",
    "description": "Experience the beautiful sunrise while running along the ghats of Varanasi. A unique and refreshing event for runners.",
    "time": "05:30",
    "date": "2025-10-05",
    "category": "Running",
    "difficulty": "Beginner",
    "participants": [
      "678290a44da7e3a0788a73e7",
      "678290a44da7e3a0788a73e9",
      "678292058e92ea4894f9da42",
      "678292058e92ea4894f9da46",
      "678292058e92ea4894f9da48"
    ],
    "location": {
      "address": "Assi Ghat",
      "city": "Varanasi",
      "state": "Uttar Pradesh"
    },
    "maxParticipants": 200,
    "registrationFee": 250,
    "createdBy": "6782925c8c6ab84ee7822fa7"
  },
  {
    "name": "Noida Speed Run",
    "description": "A fast-paced running event to challenge your speed and stamina. Suitable for runners aiming to beat their personal bests.",
    "time": "06:30",
    "date": "2025-11-12",
    "category": "Running",
    "difficulty": "Advanced",
    "participants": [
      "678290a44da7e3a0788a73e6",
      "678290a44da7e3a0788a73e8",
      "678292058e92ea4894f9da44",
      "678292058e92ea4894f9da45",
      "678292058e92ea4894f9da49"
    ],
    "location": {
      "address": "Sector 62 Running Track",
      "city": "Noida",
      "state": "Uttar Pradesh"
    },
    "maxParticipants": 400,
    "registrationFee": 400,
    "createdBy": "6782925c8c6ab84ee7822fa7"
  },
  {
    "name": "Agra Heritage Run",
    "description": "A heritage-themed run passing by iconic monuments like the Taj Mahal. Celebrate culture and fitness together.",
    "time": "06:00",
    "date": "2025-12-05",
    "category": "Running",
    "difficulty": "Intermediate",
    "participants": [
      "678290a44da7e3a0788a73e3",
      "678290a44da7e3a0788a73e9",
      "678292058e92ea4894f9da42",
      "678292058e92ea4894f9da46",
      "678292058e92ea4894f9da47"
    ],
    "location": {
      "address": "Mehtab Bagh",
      "city": "Agra",
      "state": "Uttar Pradesh"
    },
    "maxParticipants": 350,
    "registrationFee": 350,
    "createdBy": "6782925c8c6ab84ee7822fa7"
  }
]



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