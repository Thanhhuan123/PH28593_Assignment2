const mongoose = require('mongoose') //nhúng thư viện 
mongoose
  .connect('mongodb+srv://huandtph28593:huan1243@thanhhuan.az8i7jl.mongodb.net/CP17310?retryWrites=true&w=majority') // mở kết nối csdl, bh_306 là tên csdl (collection), nếu k tồn tại thì sẽ tự tạo 1 csdl mới
  .catch((err) => {
    console.log('loi ket noi csdl') // nên để tv k dấu
    console.log(err)
  })
module.exports = { mongoose }
