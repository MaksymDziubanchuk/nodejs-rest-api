const { Contact } = require('../../models/contactModel')
const { RequestError } = require('../../helpers')

const getOne = async (req, res) => {
    const id = req.params.contactId
    const contact = await Contact.findById(id)
    if (!contact) {
        throw RequestError(404)
    }
    return res.json(contact)
}

module.exports = getOne
