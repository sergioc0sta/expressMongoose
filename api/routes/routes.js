const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const user = require('../controllers/user.controller')

router.get('/posts', user.userController.getAllUsers)
router.get('/find/:id', user.userController.findOneUser)
router.delete('/delete', user.userController.deleteUser)
router.put('/post/:id', user.userController.updateUser)
router.post('/post', user.userController.newUser)

module.exports = router


