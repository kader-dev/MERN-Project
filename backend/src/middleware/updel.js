const unité_pédagogique = require('../models/unite_pedagogique')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Department = require('../models/department')

const updel = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'thisismyapp')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    req.user = user
    const dep = await Department.findOneAndUpdate(
        { "manager": req.user._id },
        { $pull: { "list_up": req.params.id } },
        { returnNewDocument: true })
    dep.save()
    next()
}


module.exports = updel