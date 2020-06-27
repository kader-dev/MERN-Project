const Department = require('../models/department')
const User = require('../models/user')
const depdel = async (req, res, next) => {
    try {
        const department = await Department.findOne({ "_id": req.params.id })
        await User.findOneAndUpdate(
            { "_id": department.manager },
            { $pull: { "roles": "department_manager" } },
            { returnNewDocument: true })
        req.department = department
        next()
    } catch (e) {
        res.status(401).send(e.message)
    }
}




module.exports = depdel