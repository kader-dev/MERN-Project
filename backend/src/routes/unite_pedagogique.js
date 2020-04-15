const express = require('express')
const unité_pédagogique = require('../models/unite_pedagogique')
const department = require('../middleware/department')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/user')


//add up
router.post('/', async (req, res) => {
    const up = new unité_pédagogique({
        ...req.body
    })
    try {
        await up.save()
        res.status(200).send(up)
    } catch (e) {
        res.status(400).send(e)
    }
}
)

//get all up
router.get('/', async (req, res) => {
    const list_unités_pédagogique = await unité_pédagogique.find({})
    try {
        res.status(200).send(list_unités_pédagogique)
    } catch (e) {
        res.status(400).send(e)
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
        res.status(500).send(e)
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
        res.status(500).send(e)
    }

})




module.exports = router;
