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
            err:"没有这个用户"
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
//删除地址
router.post("/deleteAdd",function(req,res,next){
  var userId=req.cookies.userId,userName=req.body.userName;
  console.log(userName)
  User.update({userId:userId},{$pull:{'addressList':{'userName':userName}}},function(err,doc){
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
//删除订单
router.post("/deleteOrder",function(req,res,next){
  var userId=req.cookies.userId,orderTotal=req.body.orderTotal;
  console.log(orderTotal)
  User.update({userId:userId},{$pull:{'orderList':{'orderTotal':orderTotal}}},function(err,doc){
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
  let sort = 1;
  let params = {};
  let usersModel = User.find({}).skip(skip).limit(pageSize);
  usersModel.sort({"userId":sort});
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

// 添加账号
router.post("/regist",function(req,res,next){
  console.log("in")
  var userName = req.body.userName;
  var userPwd = req.body.userPwd;
  console.log(userName);
  var user = new User({
    userName:userName,
    userPwd:userPwd
  })
  console.log(user);
  user.save(function(err,doc){
    if(err){
        res.json({
          status:"1",
          msg:err.message
        })
    }else{
      res.json({
        status:"0",
        msg:'',
        result:'success'
      })
    }
  })
})
// 添加地址
router.post("/addAdress",function(req,res,next){
  console.log("in");
  var userId = req.cookies.userId;
  var userName = req.body.userName;
  var streetName = req.body.streetName;
  var tel = req.body.tel;
  var addAdress={userName:userName,streetName:streetName,tel:tel};

 console.log(addAdress)
  User.findOne({userId:userId},function(err,userDoc){
    if(err){
      console.log("first")
      res.json({
        status:'1',
        msg:err.message,
      });
    }else{
      console.log(userDoc)
      userDoc.addressList.push(addAdress);
      userDoc.save(function(err1,doc1){
        if(err1){
          console.log("second")
          res.json({
              status:"1",
              msg:err1.message
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
  })
})

//获取当前账号信息
router.get("/getU",function(req,res,next){
  userId = req.param("userId");
  console.log(userId);
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
     if(doc){
       res.json({
         status:'0',
         msg:'',
         result:doc
       })
     }
    }
  })
});
//修改当前账号信息
router.post("/changeU",function(req,res,next){
  var userId = req.body.userId,
      userName=req.body.userName,
      userPwd=req.body.userPwd;
  User.updateOne({"userId":userId},{"userName":userName,"userPwd":userPwd},function(err,doc){
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
    }
  })
})
//删除当前账号信息
router.post("/deleteU",function(req,res,next){
  var userId = req.body.userId;
  User.remove({userId:userId},function(err,doc){
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
    }
    })
})

// 添加用户
router.post("/addU",function(req,res,next){
  console.log("in")
  var userId = req.body.userId;
  var userName = req.body.userName;
  var userPwd = req.body.userPwd;
  console.log(userName);
  var user = new User({
    userId:userId,
    userName:userName,
    userPwd:userPwd
  })
  console.log(user);
  user.save(function(err,doc){
    if(err){
        res.json({
          status:"1",
          msg:err.message
        })
    }else{
      res.json({
        status:"0",
        msg:'',
        result:'success'
      })
    }
  })
})
// 我的订单
router.get("/myOrder",function(req,res,next){
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
        result:doc.orderList
      });
    }
  })
})
// 删除订单
// 添加订单
router.post("/addOrder",function(req,res,next){
  var userId = req.cookies.userId;
  var total =req.body.total;
  var payList=req.body.payList;
  var nowAdd=req.body.nowAdd;
  var order={orderTotal:total,goodsList:payList,addressInfo:nowAdd};
  console.log(order);
  User.findOne({userId:userId},function(err,userDoc){
    if(err){
      console.log("first")
      res.json({
        status:'1',
        msg:err.message,
      });
    }else{
      userDoc.orderList.push(order);
      userDoc.save(function(err1,doc1){
        if(err1){
          console.log("second")
          res.json({
              status:"1",
              msg:err1.message
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
  })
})
// 加入购物车
router.post("/addCart",function(req,res,next){
  var userId = req.cookies.userId;productId = req.body.productId;
  var Goods =require('../models/goods')
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
//查找用户
router.get("/searchU",function(req,res,next){
  searchU = req.param("searchU");
  var query= new RegExp(req.query.searchU, 'i');
 User.find( {$or:[{"userName": query}]},function(err,doc){
   if(err){
     res.json({
       status:'1',
       msg:err.message
     });
   }else{
    if(doc){
      res.json({
        status:'0',
        msg:'',
        result:doc
      })
    }
   }
 })
});
module.exports = router;
