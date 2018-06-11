const router = require('express').Router()
const path = require('path')


router.get('/index', function(req, res) {
    res.sendFile( path.join(__dirname, '../views/html/') + 'index.html');
});


router.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/html/') + 'login.html')
})

module.exports = router
