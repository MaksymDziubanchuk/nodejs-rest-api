const { Contact } = require('../../models/contactModel')
const { RequestError } = require('../../helpers')

const updateStatusContact = async (req, res) => {
    const result = await Contact.findByIdAndUpdate(
        req.params.contactId,
        req.body,
        {
            new: true,
        }
    )

    if (!result) {
        throw RequestError(404)
    }

    return res.json(result)
}

module.exports = updateStatusContact
