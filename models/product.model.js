var db = require('./db') // nhúng module vừa tạo (là cái db.js, cái gì mà module.exports thì gọi là 1 module)

const productSchema = new db.mongoose.Schema( // định nghĩa khuôn mẫu cho sp
  {
    // liệt kê ra tên các cột (chính là document, phải giống y hệt tên các cột bên mgdb)
    name: { type: String, required: true }, //true là phải điền, false là k bắt buộc điền
    price: { type: Number, required: true },
    desc: { type: String, required: false },
    img: { type: String, required: false},
    id_cat: {
      type: db.mongoose.Schema.Types.ObjectId,
      ref: 'catModel', //tham chiếu tới bảng thể loại
    },
  },
  {
    // bảng mà ta sẽ làm việc (collection)
    collection: 'Product',
  },
)
let productModel = db.mongoose.model('productModel', productSchema) //tạo model

const catSchema = new db.mongoose.Schema( // định nghĩa khuôn mẫu cho thể loại
  {
    name: { type: String, required: true },
  },
  {
    collection: 'Category',
  },
)
let catModel = db.mongoose.model('catModel', catSchema)

module.exports = { productModel, catModel } // muốn dùng ở các nơi khác thì phải export ra
