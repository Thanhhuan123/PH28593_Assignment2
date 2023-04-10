var express = require('express');
var router = express.Router();

var homeCtrl = require('../controllers/home.ctrl');
var mdw = require('../middlewares/users.mdl');

router.get('/', mdw.check_login ,homeCtrl.index); // trỏ vào file index trong file home.controllers.js

router.get('/login' ,homeCtrl.login);
router.post('/login',homeCtrl.login);

router.get('/reg' ,homeCtrl.Reg);
router.post('/reg',homeCtrl.Reg);

router.get('/logout',mdw.check_login ,homeCtrl.Logout);

module.exports = router;
