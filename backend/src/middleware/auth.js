const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Department = require('../models/department')
const auth = async (req, res, next) => {
    try {
        console.log(req.Department)
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismyapp')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        const dep = await Department.findOne({ "manager": user._id })
     
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        req.body.Department = dep
        next()
    } catch (e) {
        res.status(401).send({ error: 'please authenticate' })
    }
}

module.exports = auth