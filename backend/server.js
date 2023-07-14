// Imports
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import "express-async-errors";
// File imports
import connDb from "./config/db.js";
// Routes imports
import testRoute from "./routes/testRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import jobRoute from "./routes/jobRoute.js";
// Middleware imports
import errorMiddleware from "./middlewares/errorMiddleware.js";
// Security Imports
import helmet from "helmet";
import xss from "xss-clean";
import expMongoSanitize from "express-mongo-sanitize";
// Swagger API Documentation 
import swaggerDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


// .env config
dotenv.config();

// Database connection
connDb()

// Swagger API config 
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job Portal Application",
            description: "Node ExpressJs Job Portal Application"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: ["./routes/*.js"]
}

const spec = swaggerDoc(options)

// Initializing the app
const app = express();

// Using middlewares for app
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(xss());
app.use(expMongoSanitize());


// Routes
app.use("/api/v1", testRoute)
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v2/jobs", jobRoute)


// Homeroot Route
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

// Validation middleware
app.use(errorMiddleware)

// Defining the port
const port = process.env.PORT || 6000;
// Listening on port
app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})