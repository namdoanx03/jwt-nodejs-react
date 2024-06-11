import userService from '../service/userService'

const handleHelloworld = (req, res) => {
    return res.render("home.ejs")
}
const handleUserPage = async (req, res) => {
    //model => get data from database
    //cookies that have not been signed
    let userList = await userService.getUserList()
    // await userService.deleteUser(4)
    return res.render("user.ejs", {userList})
}
const handleCreateNewUser = (req, res) =>{
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username

    userService.createNewUser(email, password, username)
    return res.redirect("/user")
}
const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)
    return res.redirect("/user")
}
const handleUpdateUserPage = async(req, res) => {
    let id = req.params.id
    let user = await userService.getUserById(id)
    let userData = {}
    userData = user
    // console.log("check userData:", userData)
    if(user && user.length > 0){
        userData = user[0]
    }
    return res.render("user-update.ejs", {userData})
}
const handleUpdateUser = async (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let id = req.body.id
    // console.log("check body:", req.body)
    await userService.updateUserInfor(email, username,id)
    return res.redirect("/user")
}
module.exports = {
    handleHelloworld, handleUserPage, handleCreateNewUser, handleDeleteUser,
    handleUpdateUserPage, handleUpdateUser
}