const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { handleSaveError } = require('../middlewares')

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
            unique: true,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'Set owner'],
        },
    },
    { versionKey: false, timestamps: true }
)

contactSchema.post('save', handleSaveError)

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

const Contact = model('contact', contactSchema)

module.exports = {
    Contact,
    schemas,
}
