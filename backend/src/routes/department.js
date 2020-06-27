const express = require('express')
const Department = require('../models/department')
const department = require('../middleware/department')
const depdel = require('../middleware/depdel')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/user')
//add department
router.post('/', department, async (req, res) => {
    const deparment = new Department({
        ...req.body
    })
    try {
        await deparment.save()
        res.status(200).send(deparment)
    } catch (e) {
        res.status(400).send(e.message)
    }
})
//get all departments
router.get('/', async (req, res) => {
    const list_deparmnets = await Department.find({})
    try {
        res.status(200).send(list_deparmnets)
    } catch (e) {
        res.status(400).send(e.message)
    }
})
//get by id
router.get('/:id', async (req, res) => {
    const department = await Department.find({ "_id": req.params.id })
    try {
        res.status(200).send(res.json(department))
    } catch (e) {
        res.status(400).send(e.message)
    }
})
//get  department by user
router.get('/depert/my', auth, async (req, res) => {
    const list_deparmnets = await Department.find({ "manager": req.user.id })
    try {
        res.status(200).send(list_deparmnets)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//delete department
router.delete('/:id', depdel, async (req, res) => {
    try {
        await req.department.remove()
        res.status(200).send('succes')
    } catch (e) {
        res.status(500).send(e.message)
    }
})

//update department
router.patch('/:id', department, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', "manager", "name"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const department = await Department.findById(req.params.id)
        await User.findOneAndUpdate(
            { "_id": department.manager },
            { $pull: { "roles": "department_manager" } },
            { returnNewDocument: true })
        if (!department) {
            return res.status(404).send("deparment not found")
        }
        updates.forEach((update) => department[update] = req.body[update])
        await deparment.save()
        const list_departments = await Department.find({})
        res.send(list_departments)
    } catch (e) {
        res.status(500).send(e.message)
    }

})
module.exports = router;