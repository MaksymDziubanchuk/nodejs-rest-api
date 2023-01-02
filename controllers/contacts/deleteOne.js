const { Contact } = require('../../models/contactModel')
const { RequestError } = require('../../helpers')

const deleteOne = async (req, res) => {
    const status = await Contact.findByIdAndRemove(req.params.contactId)
    if (!status) {
        throw RequestError(404)
    }
    return res.json({ message: 'contact deleted' })
}

module.exports = deleteOne
