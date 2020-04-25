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
    list_Teachers: [{
        teacher: {
            type: String
        }
    }],
    Department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true
    })

unite_pedagogique_Schema.pre('remove', async function (next) {
    const unite = this
    await unite_pedagogique.deleteMany({ list_up: unite._id })
    next()
})
const unite_pedagogique = mongoose.model('unite_pedagogique', unite_pedagogique_Schema)

module.exports = unite_pedagogique