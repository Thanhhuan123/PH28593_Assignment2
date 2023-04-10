var db = require('./db')

const usersSchema = new db.mongoose.Schema( // định nghĩa khuôn mẫu cho sp
  {
    // liệt kê ra tên các cột (chính là document, phải giống y hệt tên các cột bên mgdb)
    username: { type: String, required: true }, //true là phải điền, false là k bắt buộc điền
    email: { type: String, required: true },
    pass: { type: String, required: true },
    role: { type: String, required: true},
  },
  {
    // bảng mà ta sẽ làm việc (collection)
    collection: 'User',
  },
)

let usersModel = db.mongoose.model('usersModel', usersSchema) //tạo model

module.exports = { usersModel} // muốn dùng ở các nơi khác thì phải export ra
