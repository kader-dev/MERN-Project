var express = require('express');
var router = express.Router();
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')

const upload = multer({
  limits: {
    fileSize: 1000000000000
  },
  fileFilter(req, file, cb) {
    //if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    //  return cb(new Error('Please upload an image'))
   // }
    cb(undefined, true)
  }
})


//create user
router.post('/', upload.single("file"), async (req, res) => {
  req.body.file = req.file.buffer
  const user = new User(
    req.body)
  try {
    await user.save()
    const token = await user.generateAuthToekn()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send({ msg: 'please enter all fields' })
  }
})

//get all users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({})
    res.status(201).send(users)
  }
  catch (e) { res.status(400).send(e) }
})

//get user by id
router.get('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  const _id = req.params.id
  try {
    await User.findByIdAndDelete(_id)
    res.status(200).send(" succes delete")
  }
  catch (e) {
    res.status(500).send(e)
  }
})

//update user
router.patch('/:id', async (req, res) => {
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

//login
router.post('/login', async (req, res) => {

  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToekn()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send('user not found')
  }
})

//get profile
router.get('/profile', auth, async (req, res) => {
  res.send(req.user)
})

//logout
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {

      return token.token !== req.token
    })
    await req.user.save()
    res.send('logout')
  } catch (e) {
    res.status(500).send()
  }
})


//logout
router.post('/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send('logoutAll')
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router;
