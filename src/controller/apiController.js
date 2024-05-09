import loginRegisterService from '../service/loginRegisterService'

const testApi = (req, res) => {
    return res.status(200).json({
        message:"OK",
        data:'test api'
    })
}
const handleRegister = async (req, res) => {
    try {
        //req.body: email, phone, username, password
        if (!req.body.email || !req.body.phone || !req.body.password){
            return res.status(200).json({
                EM: "Missing required parameters", // error message
                EC: '1', //error code
                DT: '', // data
            })
        }
        if (req.body.password && req.body.password.length < 4){
            return res.status(200).json({
                EM: "Your password must have more than 4 letters", // error message
                EC: '1', //error code
                DT: '', // data
            })
        }
        //service: create user
        let data = await loginRegisterService.registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, //error code
            DT: '', // data
        })
    } catch (error) {
        return res.status(500).json({
            EM: "A user is created successfully!", // error message
            EC: '0', //error code
            DT:'', // data
        })
    }
}
module.exports = {
    testApi, handleRegister
}