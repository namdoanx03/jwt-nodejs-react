import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/wed";

const app = express()
const PORT = process.env.PORT || 8080;
// config view engine 
configViewEngine(app);

// init wed routes 
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http = `+ PORT)
})