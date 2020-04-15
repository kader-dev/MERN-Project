const User = require('../models/user')
const department = async (req, res, next) => {
    try {
        const Fisrt_name = req.body.manager
        const user = await User.findOneAndUpdate(
            { "Fisrt_name": Fisrt_name },
            { $set: { "role": "department_manager" } },
            { returnNewDocument: true })
        try {
            user.save()
        } catch (e) {
        }
        if (!user) {
            throw new Error()
        }
        req.body.manager = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'please authenticate' })
    }
}

module.exports = department