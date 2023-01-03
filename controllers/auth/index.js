const register = require('./register')
const login = require('./login')
const authenticate = require('./authenticate')
const getCurrent = require('./getCurrent')
const logout = require('./logout')
const updateSubscription = require('./updateSubscription')

module.exports = {
    register,
    login,
    authenticate,
    getCurrent,
    logout,
    updateSubscription,
}
