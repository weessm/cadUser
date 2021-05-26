const router = require('express').Router()
const AdminAuth = require('../config/middleware/AdminAuth')
const HomeController = require('./controllers/HomeController')
const PasswordController = require('./controllers/PasswordController')
const UserController = require('./controllers/UserController')

router.get('/', HomeController.index)

router.post('/users', UserController.create)
router.get('/users', AdminAuth, UserController.index)

router.get('/user/:id', AdminAuth, UserController.findUserById)
router.put('/user/:id', AdminAuth, UserController.editUser)
router.delete('/user/:id', AdminAuth, UserController.deleteUser)

router.post('/forgot-password', PasswordController.forgotPassword)
router.put('/forgot-password/:token', PasswordController.changePassword)

router.post('/login', UserController.singIn)

module.exports = router