import express from "express";
import userRouter from "./routes/user.js"
import {config} from "dotenv"


// App Engine HTML
export const app = express();

config({
    path:"./data/config.env",
});

// middleware
app.use(express.json());
app.use("/users", userRouter);


app.get("/", (req,res) => {
    res.send("Nice Working")
})

