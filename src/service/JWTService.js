import { where } from 'sequelize/dist/index.js'
import db from '../models/index'

const getGroupWithRoles = async (user) => {
    let roles = await db.Group.findOne({
        where:{id: user.groupId},
        attributes: ["id", 'name', "description"],
        include:{
            model:db.Role,
            attributes:["id", "url", "description"],
            throught: {attributes:[]}
        }
    })
    return roles ? roles: {}
}

module.exports = {
    getGroupWithRoles
}