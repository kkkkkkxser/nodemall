var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    "userId":String,
    "userName":String,
    "userPwd":String,
    "cartList":[
        {
        "productId":String,
        "productName":String,
        "salePrice":Number,
        "productImage":String,
        "checked":Boolean,
        "productNum":String,
        "productType":String
        }
    ],
    "addressList":[
        {
            "addressId":String,
            "userName":String,
            "streetName":String,
            "postCode":Number,
            "tel":Number,
            "isDefault":Boolean
        }
    ],
        "orderList":[{
        "orderTotal":Number,
        "goodsList":[{
            "productId":String,
            "productName":String,
            "salePrice":Number,
            "productImage":String,
            "checked":Boolean,
            "productNum":String,
            "productType":String
        }],
        "addressInfo":[{
            "addressId":String,
            "userName":String,
            "streetName":String,
            "postCode":Number,
            "tel":Number,
            "isDefault":Boolean
        }]
    }
    ],
});

module.exports = mongoose.model("User",userSchema,"users")