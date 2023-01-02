const { Contact } = require('../../models/contactModel')

const postOne = async (req, res, next) => {
    const newContact = await Contact.create(req.body)

    return res.status(201).json(newContact)
}

module.exports = postOne
