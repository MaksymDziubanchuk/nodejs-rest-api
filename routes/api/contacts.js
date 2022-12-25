const express = require('express')

const ctrl = require('../../controllers/contacts')

const router = new express.Router()

const {ctrlWrapper} = require("../../helpers")

const {validateBody} = require("../../middlewares")

const schema = require("../../schemas/contacts")

router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:contactId', ctrlWrapper(ctrl.getOne))

router.post('/', validateBody(schema), ctrlWrapper(ctrl.postOne))

router.delete('/:contactId', ctrlWrapper(ctrl.deleteOne))

router.put('/:contactId', validateBody(schema), ctrlWrapper(ctrl.updateOne))

module.exports = router
