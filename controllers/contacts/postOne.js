const { Contact } = require('../../models/contactModel')

const postOne = async (req, res, next) => {
    const { _id: owner } = req.user
    const newContact = await Contact.create({ ...req.body, owner })

    return res.status(201).json(newContact)
}

module.exports = postOne
