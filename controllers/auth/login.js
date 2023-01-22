const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../../models/userModel')
const { RequestError } = require('../../helpers')

const { SECRET_KEY } = process.env

const login = async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        throw RequestError(401, 'Email is wrong')
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw RequestError(401, 'Password is wrong')
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' })

    const result = await User.findByIdAndUpdate(
        user._id,
        { token: token },
        { new: true }
    )

    if (!result) {
        throw RequestError(404)
    }

    res.status(201).json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    })
}

module.exports = login
