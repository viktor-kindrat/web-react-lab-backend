import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import APIRouter from "./API/Router.mjs"

const PORT = process.env.PORT || 3000;
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", APIRouter)

const run = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully!")
    app.listen(PORT, () => {
        console.log(`Server is listened on port ${PORT}`)
    })
    console.log("Open it in web ....")
}

run()