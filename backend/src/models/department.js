const mongoose = require('mongoose')
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
    list_UP: [{
        UP: {
            name: {
                type: String,
                trim: true
            }
        },
    }]
},
    {
        timestamps: true
    })

const Department = mongoose.model('Department', DepartmentSchema)

module.exports = Department