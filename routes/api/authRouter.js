const express = require('express')

const ctrl = require('../../controllers/auth')

const router = new express.Router()

const { ctrlWrapper } = require('../../helpers')

const { validateBody, upload } = require('../../middlewares')

const { schemas } = require('../../models/userModel')

router.post(
    '/signup',
    validateBody(schemas.registerSchema),
    ctrlWrapper(ctrl.register)
)

router.post(
    '/login',
    validateBody(schemas.loginSchema),
    ctrlWrapper(ctrl.login)
)

router.get('/current', ctrl.authenticate, ctrlWrapper(ctrl.getCurrent))

router.post('/logout', ctrl.authenticate, ctrlWrapper(ctrl.logout))

router.patch(
    '/',
    ctrl.authenticate,
    validateBody(schemas.updateSubscriptionSchema),
    ctrlWrapper(ctrl.updateSubscription)
)
router.patch(
    '/avatars',
    ctrl.authenticate,
    upload.single('avatar'),
    ctrlWrapper(ctrl.updateAvatar)
)

module.exports = router
