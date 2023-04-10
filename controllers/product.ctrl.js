var myMD = require('../models/product.model');
var fs = require('fs');

exports.productList = async (req, res, next) => {

    //tạo chức năng lọc

    res.render('product/list'); // gửi ds ra view, ở bên view sẽ nhận biến là listProduct
};

exports.product = async (req, res, next) => {
    let msg = '';

    let dk_loc = null;
    if (typeof (req.query.price) != 'undefined') {
        dk_loc = { price: req.query.price }; // localhost:3000/product?price=100
        // dk_loc = { price: {$gte: req.query.price} };
    }

    let idCat = req.body.idCatLoc
    var iCat = 0
    let listCat = await myMD.catModel.find();
    let list
    
    // lọc thể loại
    if (req.method == 'POST') {
        if (idCat) {
            let locCat = { id_cat: idCat }
            dk_loc = locCat
            listCat.map((item, i) => {
                if (item.id == idCat) {
                    iCat = i
                }
            })
        }
    }

    var sort = null

    // sort price
    let sortPrice = req.body.sortPrice
    let isSort = false
    var iSort = 0
    if (sortPrice) {
        iSort = sortPrice == 1 ? -1 : 1
        sort = { price: iSort }
        isSort = true
    }


    let sortName = req.body.sortPrice
    var iSort = 0
    if (sortPrice) {
        iSort = sortName == 1 ? -1 : 1
        sort = { name: iSort }
        isSort = true
    }

    list = await myMD.productModel.find(dk_loc).populate('id_cat').sort(sort); // tham chiếu tới cột sẽ tham chiếu 
    if (req.method == 'POST') {
        // thêm sản phẩm
        if (req.body.type == 'add') {
            let objProduct = new myMD.productModel();
            objProduct.name = req.body.name;
            objProduct.price = req.body.price;
            objProduct.desc = req.body.desc;
            objProduct.id_cat = req.body.cat;

            try {
                console.log(req.file);
                fs.rename(req.file.path, './public/upload/' + req.file.originalname,
                    async (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            //không có lỗi
                            objProduct.img = '/upload/' + req.file.originalname;
                            try {
                                let new_prod = await objProduct.save();
                                console.log(new_prod);
                                msg = 'Đã thêm thành công';
                            } catch (error) {
                                msg = "Lỗi : " + error.message;
                                console.log(error);
                            }
                        }
                    });
            } catch (error) {
                try {
                    objProduct.img = '/images/product-1.png';
                    let new_prod = await objProduct.save();
                    console.log(new_prod);
                    msg = 'Đã thêm thành công';
                } catch (error) {
                    msg = "Lỗi : " + error.message;
                    console.log(error);
                }
            }

            res.redirect('/product')

        }
    }

    if (req.body.type == 'update') {
        // sửa sản phẩm
        // tạo model để gán dữ liệu post
        let objProduct = new myMD.productModel();
        objProduct.name = req.body.name;
        objProduct.price = req.body.price;
        objProduct.desc = req.body.desc;
        objProduct.id_cat = req.body.cat;

        objProduct._id = req.body.id;

        try {
            await myMD.productModel.findByIdAndUpdate({ _id: req.body.id }, objProduct);
            msg = 'Đã cập nhật thành công';
        } catch (error) {
            msg = 'Lỗi ghi csdl' + error.message;
            console.log(error);
        }
        res.redirect('/product')
    }
    res.render('product/list', { msg: msg, listCat: listCat, listProduct: list, iCat: iCat,iSort:iSort });
};

exports.productDetail = async (req, res, next) => {
    let msg = '';

    let idProduct = req.params.idProduct;
    let objProduct = await myMD.productModel.findById(idProduct).populate("id_cat");
    let listCat = await myMD.catModel.find();

    if (req.method == 'POST') {
        // viết kiểm tra hợp lệ dữ liệu...

        // tạo model để gán dữ liệu post
        let objProduct = new myMD.productModel();
        objProduct.name = req.body.name;
        objProduct.price = req.body.price;
        objProduct.desc = req.body.desc;
        objProduct.id_cat = req.body.cat;

        objProduct._id = idProduct // dùng cho chức năng sửa

        // thực hiện ghi vào csdl
        try {
            await myMD.spMOdel.findByIdAndUpdate(idProduct, objSP);
            msg = 'Đã cập nhật thành công';
        } catch (error) {
            msg = 'Lỗi ghi csdl' + error.message;
            console.log(error);
        }
    }
    res.render('product/detail', { msg: msg, objProduct: objProduct, listCat: listCat });

};

exports.productDelete = async (req, res, next) => {
    let msg = '';
    let id = req.body.id;
    await myMD.productModel.findByIdAndDelete(id);
    res.redirect('/product');
}

