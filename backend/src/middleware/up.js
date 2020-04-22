const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Department = require('../models/department')

const up = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismyapp')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        const dep = await Department.findOne({ "manager": user._id })
        const email = req.body.manager
        const manager = await User.findOneAndUpdate(
            { "email": email },
            { $set: { "role": "up_manager" } },
            { returnNewDocument: true })
        try {
            manager.save()
        } catch (e) {
        }
        if (!user) {
            res.status(401).send('user not found')
        }
        req.token = token
        req.user = user
        req.body.Department = dep._id
        req.body.manager = manager

        next()
    } catch (e) {
        res.status(401).send(e.message)
    }
}

module.exports = up