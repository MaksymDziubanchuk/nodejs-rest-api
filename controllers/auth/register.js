const bcrypt = require('bcrypt')
const { User } = require('../../models/userModel')
const { RequestError } = require('../../helpers')
const garavatar = require('gravatar')

const register = async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user) {
        throw RequestError(409, 'Email in use')
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const avatarURL = garavatar.url(email)

    const newUser = await User.create({
        ...req.body,
        avatarURL,
        password: hashPassword,
    })

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

module.exports = register
