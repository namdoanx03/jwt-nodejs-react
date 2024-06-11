require("dotenv").config()
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/wed";
import initApiRoutes from "./routes/api";
import connection from "./config/connectDB";
import configCors from "./config/cors";
import { verify } from "jsonwebtoken";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express()
const PORT = process.env.PORT || 8080;

//config cors
configCors(app)

// config view engine 
configViewEngine(app);

//config body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//config cookie parser
app.use(cookieParser())

//test connection DB
// connection()

// init wed routes 
initWebRoutes(app);
initApiRoutes(app)

app.use((req, res) => {
    return res.send('404 not found')
})

app.listen(PORT, () => {
    console.log(`Server is running on http = `+ PORT)
})