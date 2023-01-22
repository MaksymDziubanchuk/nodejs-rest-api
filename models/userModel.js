const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { handleSaveError } = require('../middlewares')

const subscriptionOptions = ['starter', 'pro', 'business']

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: subscriptionOptions,
            default: 'starter',
        },
        avatarURL: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            default: null,
        },
    },
    { versionKey: false, timestamps: true }
)

userSchema.post('save', handleSaveError)

const registerSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid(...subscriptionOptions),
})

const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
})

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionOptions),
})

const schemas = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
}

const User = model('user', userSchema)

module.exports = {
    User,
    schemas,
}
