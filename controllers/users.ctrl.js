var myMD = require('../models/users.model');

exports.usersList = async (req, res, next) => {

    let list = await myMD.usersModel.find();
    res.render('users/list', { listUsers: list });
};

exports.usersAdd = async (req, res, next) => {
    let msg = '';
    let list;
    list = await myMD.usersModel.find();
    if (req.method == 'POST') {
        if (req.body.type == 'add') {
            // viết kiểm tra hợp lệ dữ liệu...
            // tạo model để gán dữ liệu post
            let objUsers = new myMD.usersModel();
            objUsers.username = req.body.username;
            objUsers.email = req.body.email;
            objUsers.pass = req.body.pass;

            objUsers.role = req.body.role == 'user' ? 'user' : 'admin';
            // thực hiện ghi vào csdl
            try {
                let new_sp = await objUsers.save();
                console.log(new_sp);
                msg = 'Đã thêm thành công'
            } catch (error) {
                msg = 'Lỗi ghi csdl' + error.message;
                console.log(error);
            }
            res.redirect('/users')
        }

        if (req.body.findUser == '') {
            list = await myMD.usersModel.find(); // tham chiếu tới cột sẽ tham chiếu 

        } else {
            list = await myMD.usersModel.find({ username: req.body.findUser })
        }
    }
    res.render('users/list', { msg: msg, listUsers: list });
};

exports.usersDelete = async (req, res, next) => {
    let msg = '';
    let id = req.body.id;
    await myMD.usersModel.findByIdAndDelete(id);
    res.redirect('/users');
}