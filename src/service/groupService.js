import db from '../models/index'

const getGroups = async() => {
    try {
        let data  = await db.Group.findAll({
            order:[['name', 'ASC']]
        })
        return{
            EM: 'Get groups success!',
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Error from service!',
            EC: 0,
            DT: []
        }
    }
}

module.exports = {
    getGroups
}