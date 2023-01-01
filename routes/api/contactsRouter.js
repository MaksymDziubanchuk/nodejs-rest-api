const express = require('express')

const ctrl = require('../../controllers/contacts')

const router = new express.Router()

const { ctrlWrapper } = require('../../helpers')

const {
    validateBody,
    isValidId,
    validateFavoriteBody,
} = require('../../middlewares')

const { schemas } = require('../../models/contactModel')

router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getOne))

router.post('/', validateBody(schemas.addSchema), ctrlWrapper(ctrl.postOne))

router.put(
    '/:contactId',
    isValidId,
    validateBody(schemas.addSchema),
    ctrlWrapper(ctrl.updateOne)
)

router.patch(
    '/:contactId/favorite',
    isValidId,
    validateFavoriteBody(schemas.updateFavoriteSchema),
    ctrlWrapper(ctrl.updateStatusContact)
)

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.deleteOne))

module.exports = router
