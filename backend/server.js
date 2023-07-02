// Imports
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
// File imports
import connDb from "./config/db.js";
// Routes imports
import testRoute from "./routes/testRoute.js";
import authRoute from "./routes/authRoute.js";
// Middleware imports
import errorMiddleware from "./middlewares/errorMiddleware.js";

// .env config
dotenv.config();

// Database connection
connDb()

// Initializing the app
const app = express();

// Using middlewares for app
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use("/api/v1", testRoute)
app.use("/api/v1/auth", authRoute)


// Validation middleware
app.use(errorMiddleware)

// Defining the port
const port = process.env.PORT || 6000;
// Listening on port
app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})