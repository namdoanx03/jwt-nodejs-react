import express from "express";
import apiController from '../controller/apiController'

const router = express.Router()

const initApiRoutes = (app) => {
    //path, handler
    //rest api
    //GET, POST, PUT, DELETE
    router.get("/test-api", apiController.testApi)
    router.post("/register", apiController.handleRegister)
    return app.use("/api/v1/", router)
}
export default initApiRoutes