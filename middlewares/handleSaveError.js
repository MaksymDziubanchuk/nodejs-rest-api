const handleSaveError = (error, data, next) => {
    const { name, code } = error
    error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400
    error.message = error.status === 409 ? 'Conflict' : 'Validation error'
    next(error)
}

module.exports = handleSaveError
