import db from '../models/index'

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
            nest :true
        })
        if(users){
            return {
                EM:'get data success',
                EC:0,
                DT:users
            }
        }else{
            return {
                EM: 'get data success',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs with service',
            EC: 1,
            DT: []
        }
    }
}
const getUserWithPagination = async(page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
            
        })
        let totalPages = Math.ceil(count/limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users:rows
        }
        return {
            EM: 'fetch ok',
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs with service',
            EC: 1,
            DT: []
        }
        
    }
}
const createNewUser = async (data) => {
    try {
        await db.User.create({

        })
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id:data.id}
        })
        if(user){
            //update
            user.save()
        }else{
            //not found
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async(id) => {
    try {
        let user = await db.User.findOne({
            where:{id: id}
        })
        if(user){
            await user.destroy()
            return {
                EM: 'Delete user succeeds',
                EC: 0,
                DT: []
            }
        }else{
            return {
                EM: 'user not exist',
                EC: 2,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'error from service',
            EC: 2,
            DT: []
        }
    }
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}