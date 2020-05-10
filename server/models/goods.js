var mongoose = require('mongoose')
var Schema = mongoose.Schema;

// 定义数据
var productSchema = new Schema({
    "productId":String,
    "productName":String,
    "productType":String,
    "salePrice":Number,
    "productImage":String,
    "checked":Boolean,
        "productNum":String
});

module.exports = mongoose.model('Good',productSchema);