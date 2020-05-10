var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 登录
router.post("/login",function(req,res,next){
  var param = {
    userName:req.body.userName,
    userPwd:req.body.userPwd
  }
  User.findOne(param,function(err,doc){
    console.log(doc);
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      if(doc){
        res.cookie("userId",doc.userId,{path:'/',maxAge:1000*60*60});
        // req.session.user = doc;
        res.json({
          status:'0',
          msg:'',
          result:{
            userName:doc.userName
          }
        });
      }
      else{
        res.json({
          status:'1',
          msg:'',
          result:{
            er:"没有这个用户"
          }
        })
      }
    }
  })
})

// 退出
router.post("/logout",function(req,res,next){
  res.cookie("userId","",{
    path:"/",
    maxAge:-1
  });
  res.json({
    status:"0",
    msg:'',
    result:''
  })
})

//购物车
router.get("/cart",function(req,res,next){
  console.log("外面")
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      if(doc){
        console.log("里面")
        res.json({
          status:'0',
          msg:'',
          result:doc.cartList
        })
      }
    }
  })
})
//订单
router.get("/payList",function(req,res,next){
  console.log("外面")
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      if(doc){
        console.log("里面")
        res.json({
          status:'0',
          msg:'',
          result:doc.cartList
        })
      }
    }
  })
})
//购物车删除
router.post("/cartDel",function(req,res,next){
  console.log("limian")
  var userId=req.cookies.userId,productId=req.body.productId;
  User.update({userId:userId},{$pull:{'cartList':{'productId':productId}}},function(err,doc){
    if(err){
      res.json({
        status:"1",
        msg:err.message,
        result:''
      });
    }else{
      console.log("waimina")
      res.json({
        status:"0",
        msg:'',
        result:'suc'
      });
    }
  })
})

// 查询用户地址
router.get("/addr",function(req,res,next){
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc.addressList 
      });
    }
  })
})
// 获取用户名
router.get("/username",function(req,res,next){
  var userId=req.cookies.userId;
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc.userName
      });
    }
  })
})
//改变
router.post("/cartEdit",function(req,res,next){
  var userId = req.cookies.userId,
      productId = req.body.productId,
      productNum = req.body.productNum;
      checked=req.body.checked;
      console.log(productId);
      console.log(productNum);
      console.log(checked);
  User.updateOne({"userId":userId,"cartList.productId":productId},{
    "cartList.$.productNum":productNum,
  "cartList.$.checked":checked},function(err,doc){
      console.log("li")
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        });
      }else{
        res.json({
          status:'0',
          msg:'',
          result:''
        });
        console.log(doc);
      }
    })
 })
 //select改变
router.post("/cartsEdit",function(req,res,next){
  var userId = req.cookies.userId,
      productId = req.body.productId,
      checked=req.body.checked;
      console.log(productId);
      console.log(checked);
  User.updateOne({"userId":userId,"cartList.productId":productId},{
  "cartList.$.checked":checked},function(err,doc){
      console.log("li")
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        });
      }else{
        res.json({
          status:'0',
          msg:'',
          result:''
        });
        console.log(doc);
      }
    })
 })
 //改变all
 router.post("/allEdit",function(req,res,next){
   var userId= req.cookies.userId,
        checkAll = req.body.checkAll;
      User.findOne({userId:userId},function(err,user){
        if(err){
          res.json({
            status:'1',
            msg:err.message,
            result:''
          });
        }else{
          if(user){
            user.cartList.forEach((item)=>{
              item.checked = checkAll;
            })
            user.save(function(err1,doc){
              if(err1){
                res.json({
                  status:'1',
                  msg:err.message,
                  result:''
                })
              }else{
                res.json({
                  status:'0',
                  msg:'',
                  result:''
                })
              }
            })
          }
        }
      })
 })

 //获取所有 
 router.get("/allUsers",function(req,res,next){
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let skip = (page-1)*pageSize;
  let params = {};
  let usersModel = User.find({}).skip(skip).limit(pageSize);
  usersModel.exec({},function(err,doc){
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
