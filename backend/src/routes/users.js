var express = require('express');
var router = express.Router();
const User = require('../models/user')


//create user
router.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    //const token = await user.generateAuthToekn()
    res.status(201).send({ user })
  } catch (e) {
    res.status(400).send(e)
  }
})

//get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.status(201).send(users)
  }
  catch (e) { res.status(400).send(e) }
})

//get user by id
router.get('/users/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const user = await User.findById(_id)
    res.status(200).send(user)
  }
  catch (e) {
    res.status(404).send(e)
  }
})

//delete user by id
router.delete('/users/:id', async (req, res) => {
  const _id = req.params.id
  try {
    await User.findByIdAndDelete(_id)
    res.status(200).send(" succes delete")
  }
  catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/users/:id', async (req, res) => {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(404).send({
      error: 'invalid updates'
    })
  }

  try {
    const user = await User.findById(_id)
    updates.forEach((update) => user[update] = req.body[update])
    await user.save()
    res.send(user)
  }
  catch (e) {
    res.status(400).send(e)
  }

})

module.exports = router;
