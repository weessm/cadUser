const router = require('express').Router()
const HomeController = require('./controllers/HomeController')
const PasswordController = require('./controllers/PasswordController')
const UserController = require('./controllers/UserController')

router.get('/', HomeController.index)

router.get('/users', UserController.index)
router.post('/users', UserController.create)

router.get('/user/:id', UserController.findUserById)
router.put('/user/:id', UserController.editUser)
router.delete('/user/:id', UserController.deleteUser)

router.post('/forgot-password', PasswordController.forgotPassword)
router.put('/forgot-password/:token', PasswordController.changePassword)

module.exports = router