import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from './routes/userRoute.js'
import chatRoute from './routes/chatRoute.js'

dotenv.config({});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MOONGO_URI)
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

// user routes
app.use('/api/user',userRoute)
app.use('/api/chat',chatRoute)


app.listen(process.env.PORT, () =>
  console.log(`Server is Running on Port ${process.env.PORT}`)
);
