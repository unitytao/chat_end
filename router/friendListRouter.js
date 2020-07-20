const express =require('express')
const router =express.Router()
const User =require('../db/model/userModel.js')
const Chat =require('../db/model/ChatList.js')
const chatData =require('../db/model/dataList.js')
const friendRquest =require('../db/model/friendRequest.js')
const friendList =require('../db/model/friendList')

router.post('/cleanTips',(req,res)=>{
    //获取数据
    //数据处理
    //返回数据
    let  {id} =req.body
    console.log(req.body)
    if(!id) {
        return res.send({code:-3,msg:"参数错误！"})
    }else{
        Chat.findById({_id:id})
        .then((data)=>{
            if(data.length ===0){
                res.send({code:-1,msg:'err'})
            }else{
                console.log(data)
                Chat.updateOne({_id:data._id},{tips:0})
                .then(()=>{
                    res.send({code:0, msg:'success'})
                })           
            }
        })
        .catch((err)=>{
            res.send({code:-2,msg:'请求失败'})
        })
    }
})

router.post('/getrequest',(req,res)=>{
    console.log(req.body)
    let  {userId} =req.body
    if(!userId){
        return res.send({code:-1,msg:"参数错误！"})
    }else{
        console.log(userId)
        friendRquest.find({recipientId:userId})
        .then((data1)=>{
            console.log(data1)
            var d1 =data1[0].userId
            User.find({_id:{ $in: [d1]}})
            .then((data)=>{
               console.log(data)
                res.send({code:0,msg:"查询成功",user:data,data:data1})
            })
        })    
        .catch((err)=>{
            res.send({code:-1,msg:"查询失败",err:err})
        })
    }
})
   

router.post('/getfriend',(req,res)=>{
    let  {userId} =req.body
    if(!userId){
        return res.send({code:-1,msg:"参数错误！"})
    }else{
        friendList.find({userId:userId}).populate('friend')
        .then((data)=>{
            res.send({code:0,msg:"查询成功",data:data})
        })
        .catch((err)=>{
            res.send({code:-1,msg:"查询失败",err:err})
        })
    }
})


router.post('/getfriendListData',(req,res)=>{
    let  {userId} =req.body
    if(!userId){
        return res.send({code:-1,msg:"参数错误！"})
    }else{
        friendList.find({userId:userId})
        .then((data)=>{
            res.send({code:0,msg:"查询成功",data:data})
        })
        .catch((err)=>{
            res.send({code:-1,msg:"查询失败",err:err})
        })
    }
})

router.post('/getchatlist',(req,res)=>{
    let  {userId} =req.body
    if(!userId){
        return res.send({code:-1,msg:"参数错误！"})
    }else{
        Chat.find({userId:userId})
        .then((data)=>{
            res.send({code:0,msg:"查询成功",data:data})
        })
        .catch((err)=>{
            res.send({code:-1,msg:"查询失败",err:err})
        })
    }
})

router.post('/getchatData',(req,res)=>{
    let  {userId} =req.body
    if(!userId){
        return res.send({code:-1,msg:"参数错误！"})
    }else{
        chatData.find({userId:userId}).sort({"date":-1}).limit(5)
        .then((data)=>{
            res.send({code:0,msg:"查询成功",data:data})
        })
        .catch((err)=>{
            res.send({code:-1,msg:"查询失败",err:err})
        })
    }
})

module.exports =router