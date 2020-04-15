const mongoose = require('mongoose')
const unite_pedagogique = require('./unite_pedagogique');
const DepartmentSchema = new mongoose.Schema({
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
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    list_up: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'unite_pedagogique'
        }
    ]
},
    {
        timestamps: true
    })

DepartmentSchema.virtual('unite_pedagogiques', {
    ref: 'unite_pedagogique',
    localField: '_id',
    foreignField: 'Department'
})

const Department = mongoose.model('Department', DepartmentSchema)

module.exports = Department