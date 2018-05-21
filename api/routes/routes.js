const router = require('express').Router()
const fs = require('fs')
const path = require('path')


const user = require('../controllers/user.controller')

/*router.get('/index', (req, res)=>{
    res.sendFile(global.root + '/views/html/' + 'index.html')
})*/
/*
router.get('/indexl', function(req, res) {
    //leitura do ficheiro estático - view do user
    res.sendFile( path.join(__dirname, '../views/html/') + 'index.html');
});
*/


router.get('/posts', user.userController.getAllUsers)
router.get('/post/:id', user.userController.findOneUser)
router.delete('/post/:id', user.userController.deleteUser)
router.put('/post/:id', user.userController.updateUser)
router.post('/post', user.userController.newUser)


module.exports = router


