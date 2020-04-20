const express = require('express')
const unité_pédagogique = require('../models/unite_pedagogique')
const Department = require('../models/department')
const up = require('../middleware/up')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/user')


//add up
router.post('/', up, async (req, res) => {
    const up = new unité_pédagogique({
        ...req.body
    })
    try {
        await up.save()
        res.status(200).send(up)
    } catch (e) {
        res.status(400).send(e.message)
    }
    const dep = await Department.findOneAndUpdate(
        { "_id": req.body.Department._id },
        { $push: { "list_up": up } },
        { returnNewDocument: true })
    dep.save()
}
)

//get all up
router.get('/', async (req, res) => {
    const list_unités_pédagogique = await unité_pédagogique.find({})
    try {
        res.status(200).send(list_unités_pédagogique)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//dep by unites
router.get('/test', async (req, res) => {
    const liste = await unité_pédagogique.aggregate([{ $group: { _id: "$Department", uni: { $push: "$name" } } }])
    try {
        res.status(200).send(
            res.json(
                liste.map(
                    (u => u

                    )
                )

            )
        )
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//get all up by user
router.get('/my', up, async (req, res) => {

    const list_unités_pédagogique = await unité_pédagogique.find({ "Department": req.body.Department._id })
    try {
        res.status(200).send(list_unités_pédagogique)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//delete up
router.delete('/:id', async (req, res) => {
    try {
        const up = await unité_pédagogique.findOneAndDelete(req.params.id)
        if (!up) {
            return res.status(404).send("unité_pédagogique not found")
        }
        res.send(up)
    } catch (e) {
        res.status(500).send(e.message)
    }
})


//update up
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', "name"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const up = await unité_pédagogique.findById(req.params.id)
        if (!up) {
            return res.status(404).send("unité_pédagogique not found")
        }
        updates.forEach((update) => up[update] = req.body[update])
        await up.save()
        res.send(up)
    } catch (e) {
        res.status(500).send(e.message)
    }
})




module.exports = router;
