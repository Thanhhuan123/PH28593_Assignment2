var express = require('express');
var router = express.Router();

var usersCtrl = require('../controllers/users.ctrl');
var mdw = require('../middlewares/users.mdl');

router.get('/',mdw.check_login ,usersCtrl.usersList);

router.get('/', usersCtrl.usersAdd); 
router.post('/', usersCtrl.usersAdd); 

router.post('/deleteUsers', usersCtrl.usersDelete);

module.exports = router;