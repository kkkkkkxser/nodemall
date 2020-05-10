var express = require('express')
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

//链接mongodb数据库
mongoose.connect('mongodb://127.0.0.1:27017/nodemall');
mongoose.connection.on("connected",function(){
    console.log("MongoDB connected success.")
});
mongoose.connection.on("error",function(){
    console.log("MongoDB connected fail.")
});
mongoose.connection.on("disconnected",function(){
    console.log("MongoDB connected disconnected.")
});

// 手办
router.get("/hand",function(req,res,next){
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let sort = req.param("sort");
    let skip = (page-1)*pageSize;
    let params = {};
    let goodsModel = Goods.find({'productType':'hand'}).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice':sort});
    goodsModel.exec({},function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            });
        }
    })
});

// 其他
router.get("/others",function(req,res,next){
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let sort = req.param("sort");
    let skip = (page-1)*pageSize;
    let params = {};
    let goodsModel = Goods.find({'productType':'others'}).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice':sort});
    goodsModel.exec({},function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            });
        }
    })
});
// 玩具
router.get("/doll",function(req,res,next){
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let sort = req.param("sort");
    let skip = (page-1)*pageSize;
    let params = {};
    let goodsModel = Goods.find({'productType':'doll'}).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice':sort});
    goodsModel.exec({},function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            });
        }
    })
});
// clothes
router.get("/clothes",function(req,res,next){
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let sort = req.param("sort");
    let skip = (page-1)*pageSize;
    let params = {};
    let goodsModel = Goods.find({'productType':'clothes'}).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice':sort});
    goodsModel.exec({},function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            });
        }
    })
});
// 加入购物车
router.post("/addCart",function(req,res,next){
    var userId = req.cookies.userId;productId = req.body.productId;
    var User =require('../models/user')
    // console.log(prodcutId);
    User.findOne({userId:userId},function(err,userDoc){
        if(err){
            res.json({
                status:"1",
                msg:err.message
            })
        }
        else{
            // console.log("userDoc:"+userDoc);
            if(userDoc){
                // console.log(prodcutId);
                Goods.findOne({productId:productId},function(err1,doc){
                    // console.log(prodcutId);
                    if(err1){
                        res.json({
                            status:"1",
                            msg:err1.message
                        })
                    }
                    else{
                        if(doc){
                            // console.log(req.body);
                            // console.log("doc"+doc);
                            doc.productNum = "1";
                            doc.checked = true;
                            console.log("doc"+doc);
                            userDoc.cartList.push(doc);
                            console.log("userDoc"+userDoc);
                            userDoc.save(function (err2,doc2){
                                console.log(doc2);
                                if(err2){
                                    res.json({
                                        status:"1",
                                        msg:err2.message
                                    })
                                }else{   
                                    res.json({
                                        status:"0",
                                        msg:'',
                                        result:'success'
                                    })
                                }
                            })
                        }
                    }
                })
            }
        }
    })
});

//查看详情
router.get("/detail",function(req,res,next){
    productId=req.param("productId");
    Goods.findOne({productId:productId},function(err,doc){
        // console.log(prodcutId);
        if(err){
            res.json({
                status:"1",
                msg:err1.message
            })
        }
        else{
            res.json({
                status:"0",
                msg:'',
                result:doc
            })
        }
    })
})

//获得所有商品
 router.get("/allGoods",function(req,res,next){
    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let skip = (page-1)*pageSize;
    let params = {};
    let goodsModel = Goods.find({}).skip(skip).limit(pageSize);
    goodsModel.exec({},function(err,doc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            });
        }else{
            res.json({
                status:'0',
                msg:'',
                result:{
                    count:doc.length,
                    list:doc
                }
            });
        }
    })
  });
module.exports = router;