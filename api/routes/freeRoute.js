const router = require('express').Router()
const path = require('path')


router.get('/index', function(req, res) {
    res.sendFile( path.join(__dirname, '../views/html/') + 'index.html');
});

module.exports = router
