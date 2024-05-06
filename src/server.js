import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/wed";
require("dotenv").config()
import bodyParser from "body-parser";


const app = express()
const PORT = process.env.PORT || 8080;

// config view engine 
configViewEngine(app);

//config body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// init wed routes 
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http = `+ PORT)
})