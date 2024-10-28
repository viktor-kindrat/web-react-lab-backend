import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import APIRouter from "./API/Router.mjs"
import MediaRouter from "./Media/Router.mjs"

const PORT = process.env.PORT || 5555;
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", APIRouter)
app.use("/media", MediaRouter)

const run = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully!")
    app.listen(PORT, () => {
        console.log(`Server is listened on port ${PORT}`)
    })
}

run()