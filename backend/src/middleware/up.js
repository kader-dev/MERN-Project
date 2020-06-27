const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Department = require('../models/department')
const unité_pédagogique = require('../models/unite_pedagogique')
const up = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismyapp')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        const dep = await Department.findOne({ "manager": user._id })
        const unité = await unité_pédagogique.find({ "manager": user._id })
        const manager = await User.findOne({ "email": req.body.manager })

        if (!user) {
            res.status(401).send('user not found')
        }
        req.token = token
        req.user = user
        req.unité = unité
        req.Department = dep
        req.body.manager = manager
        next()
    } catch (e) {
        res.status(401).send(e.message)
    }
}

module.exports = up