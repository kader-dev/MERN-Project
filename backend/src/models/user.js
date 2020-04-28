const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




const userSchema = new mongoose.Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },

    First_name: {
        type: String,
        trim: true
    },
    Last_name: {
        type: String,
        trim: true,
        uppercase: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    role: {
        type: String,
        trim: true,
        default: 'teacher'

    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})






userSchema.virtual('Departments', {
    ref: 'Department',
    localField: '_id',
    foreignField: 'manager'
})

userSchema.virtual('unite_pedagogiques', {
    ref: 'unite_pedagogique',
    localField: '_id',
    foreignField: 'Department'
})

userSchema.pre('save', async function (next) {
    try {
        if (this.method !== 'local') {
            next();
        }
        const user = this
        if (user.isModified('local.password')) {
            user.local.password = await bcrypt.hash(user.local.password, 8)
        }
        next()
    } catch (error) {
        next(error);
    }
});


userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

userSchema.methods.generateAuthToekn = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismyapp')
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens

    return userObject
}




const User = mongoose.model('User', userSchema)

module.exports = User