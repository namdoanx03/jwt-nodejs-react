import express from "express";
import homeController from '../controller/homeController'

const router = express.Router()

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloworld)
    router.get("/user", homeController.handleUserPage)
    router.post("/users/create-user", homeController.handleCreateNewUser)
    router.post("/delete-user/:id", homeController.handleDeleteUser)
    router.get("/update-user/:id", homeController.handleUpdateUserPage)
    router.post("/user/update-user", homeController.handleUpdateUser)

    return app.use("/", router)
}
export default initWebRoutes