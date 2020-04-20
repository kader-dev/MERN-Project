const mongoose = require('mongoose')
const unite_pedagogique_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    Department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    })

const unite_pedagogique = mongoose.model('unite_pedagogique', unite_pedagogique_Schema)

module.exports = unite_pedagogique