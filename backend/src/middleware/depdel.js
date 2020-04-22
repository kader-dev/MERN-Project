const Department = require('../models/department')
const depdel = async (req, res, next) => {
    try {
        const department = await Department.findOne({ "_id": req.params.id })
        req.department = department
        next()
    } catch (e) {
        res.status(401).send(e.message)
    }
}




module.exports = depdel