var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/product.ctrl');

var mdw = require('../middlewares/users.mdl');

// muốn thêm mới thì phải có cả 2 phương thức là get và post
// router.get('/',mdw.check_login,productCtrl.productList);
// router.post('/',productCtrl.productList);

router.get('/', mdw.check_login,productCtrl.product); //get để hiển thị lên form
const multer = require('multer')
const upload = multer({ dest: './tmp' })
router.post('/', upload.single('img'),productCtrl.product); // post để nhận dữ liệu

router.post('/deleteProduct', productCtrl.productDelete);

router.get('/detail/:idProduct', productCtrl.productDetail);
router.post('/detail/:idProduct', productCtrl.productDetail);


// router.post('/', ,productCtrl.product);

module.exports = router;