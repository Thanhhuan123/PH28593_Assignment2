const myMD = require('../models/users.model');

exports.check_login = async (req,res,next) => {

    if (req.session.userLogin) {
        // đã đăng nhập
        next();
    } else {
        // nếu chưa đăng nhập thì điều hướng về login 
        res.redirect('/login');
    }
};