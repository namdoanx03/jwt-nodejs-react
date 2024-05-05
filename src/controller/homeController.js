import userService from '../service/userService'

const handleHelloworld = (req, res) => {
    return res.render("home.ejs")
}
const handleUserPage = (req, res) => {
    return res.render("user.ejs")
}
const handleCreateNewUser = (req, res) =>{
    let email = req.body.email
    let password = req.body.password
    let username = req.body.username

    // userService.createNewUser(email, password, username)
    userService.getUserList()

    return res.send("handleCreateNewUser")
}
module.exports = {
    handleHelloworld, handleUserPage, handleCreateNewUser
}