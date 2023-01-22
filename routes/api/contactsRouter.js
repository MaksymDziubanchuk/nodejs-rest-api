const express = require('express')

const router = new express.Router()

const { ctrlWrapper } = require('../../helpers')

const ctrl = require('../../controllers/contacts')
const { authenticate } = require('../../controllers/auth')

const {
    validateBody,
    isValidId,
    validateFavoriteBody,
} = require('../../middlewares')

const { schemas } = require('../../models/contactModel')

router.get('/', authenticate, ctrlWrapper(ctrl.getAll))

router.get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getOne))

router.post(
    '/',
    authenticate,
    validateBody(schemas.addSchema),
    ctrlWrapper(ctrl.postOne)
)

router.put(
    '/:contactId',
    authenticate,
    isValidId,
    validateBody(schemas.addSchema),
    ctrlWrapper(ctrl.updateOne)
)

router.patch(
    '/:contactId/favorite',
    authenticate,
    isValidId,
    validateFavoriteBody(schemas.updateFavoriteSchema),
    ctrlWrapper(ctrl.updateStatusContact)
)

router.delete(
    '/:contactId',
    authenticate,
    isValidId,
    ctrlWrapper(ctrl.deleteOne)
)

module.exports = router
