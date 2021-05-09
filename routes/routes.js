const router = require('express').Router()
const HomeController = require('../controllers/HomeController')
const UserController = require('../controllers/UserController')

router.get('/', HomeController.index)

router.get('/users', UserController.index)
router.post('/users', UserController.create)
router.get('/user/:id', UserController.findUserById)
router.put('/user/:id', UserController.editUser)
router.delete('/user/:id', UserController.deleteUser)

module.exports = router