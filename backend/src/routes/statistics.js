const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const Department = require('../models/department')
const unité_pédagogique = require('../models/unite_pedagogique')




router.get('/', async (req, res) => {
    try {
        const DepartmentNum = await Department.count()
        const UpNum = await unité_pédagogique.count()
        const UserNum = await User.count()
        res.status(200).send({DepartmentNum,UpNum,UserNum})
    } catch (e) {
        res.status(400).send(e.message)
    }
})
















module.exports = router;