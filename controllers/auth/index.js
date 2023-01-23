const register = require('./register')
const login = require('./login')
const authenticate = require('./authenticate')
const getCurrent = require('./getCurrent')
const logout = require('./logout')
const updateSubscription = require('./updateSubscription')
const updateAvatar = require('./updateAvatar')

module.exports = {
    register,
    login,
    authenticate,
    getCurrent,
    logout,
    updateSubscription,
    updateAvatar,
}
