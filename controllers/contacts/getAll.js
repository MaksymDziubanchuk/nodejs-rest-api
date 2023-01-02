const { Contact } = require('../../models/contactModel')
const { RequestError } = require('../../helpers')

const getAll = async (_, res) => {
    const contacts = await Contact.find()
    if (!contacts) {
        throw RequestError(404)
    }
    return res.json(contacts)
}
module.exports = getAll
