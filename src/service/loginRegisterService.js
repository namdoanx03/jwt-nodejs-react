require('dotenv').config
import db from '../models/index'
import bcrypt from "bcryptjs";
import { raw } from 'body-parser';
import { Op } from 'sequelize';
import { getGroupWithRoles } from './JWTService'
import { createJWT} from '../middleware/JWTAction'

const salt = bcrypt.genSaltSync(10)

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt)
    return hashPassword
}
const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true
    }
    return false
}
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true
    }
    return false
}
const registerNewUser = async (rawUserData) => {
    try {
        //check email/phonenumber are exist
        let isEmailExist = await checkEmailExist(rawUserData.email)
        console.log('check email: ', isEmailExist)
        if (isEmailExist === true) {
            return {
                EM: 'The email is already exist',
                EC: 1
            }
        }
        let isPhonelExist = await checkPhoneExist(rawUserData.phone)
        if (isPhonelExist === true) {
            return {
                EM: 'The phone is already exist',
                EC: 1
            }
        }
        //hash user password
        let hashPassword = hashUserPassword(rawUserData.password)

        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
            groupId:4
        })
        return {
            EM: 'A user is created successfully!',
            EC: 0
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs in service...',
            EC: -2
        }
    }

}
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); //true or false
}
const handleUserLogin = async(rawData) =>{
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin }, 
                    { phone: rawData.valueLogin }
                ]
            }
        })
        if(user){
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            if(isCorrectPassword === true){
                
                //let token
                //test roles
                let groupWithRoles = await getGroupWithRoles(user)
                let payload = {
                    email : user.email,
                    groupWithRoles,
                    username: user.username,
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
                let token = createJWT(payload)
                return {
                    EM: 'OK!',
                    EC: 0,
                    DT: {
                        access_token: token, 
                        groupWithRoles,
                        email: user.email, 
                        username: user.username
                    }
                }
            }
        }
        console.log(">>>Input user with email/phone:", rawData.valueLogin, "password:", rawData.password )
            return {
                EM: 'Your email/phone number or password is incorrect!',
                EC: 1,
                DT: ''
            }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs in service...',
            EC: -2
        }
    }
}
module.exports = {
    registerNewUser, handleUserLogin, hashUserPassword, checkEmailExist, checkPhoneExist
}