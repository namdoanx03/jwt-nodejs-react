import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/wed";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser";
import connection from "./config/connectDB";
import configCors from "./config/cors";
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 8080;

//config cors
configCors(app)

// config view engine 
configViewEngine(app);

//config body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//test connection DB
connection()
// init wed routes 
initWebRoutes(app);
initApiRoutes(app)

app.listen(PORT, () => {
    console.log(`Server is running on http = `+ PORT)
})