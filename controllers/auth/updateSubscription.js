const { User } = require('../../models/userModel')

const updateSubscription = async (req, res) => {
    const result = await User.findByIdAndUpdate(req.user, req.body, {
        new: true,
    })

    if (!result) {
        throw RequestError(404)
    }

    return res.json(result)
}

module.exports = updateSubscription
