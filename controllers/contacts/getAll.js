const { Contact } = require('../../models/contactModel')
const { RequestError } = require('../../helpers')

const getAll = async (req, res) => {
    const { _id: owner } = req.user
    const { page = 1, limit = 20, favorite = '' } = req.query
    const status = favorite === 'true' ? true : false
    const skip = (page - 1) * limit
    const contacts = await Contact.find({ owner, favorite: status }, '', {
        skip: skip,
        limit: limit,
    }).populate('owner', '-_id email')
    if (!contacts) {
        throw RequestError(404)
    }
    return res.json(contacts)
}
module.exports = getAll
