const express =require('express')
const router =express.Router()
const User =require('../db/model/userModel.js')
const Chat =require('../db/model/ChatList.js')
const chatData =require('../db/model/dataList.js')
const friendRquest =require('../db/model/friendRequest.js')
const friendList =require('../db/model/friendList')


router.post('/addfriend',(req,res)=>{
    //获取数据
    //数据处理
    //返回数据
    let  {userId,text,recipientId} =req.body
    console.log(req.body)
    if(!userId||!recipientId) {
        return res.send({code:-3,msg:"参数错误！"})
    }else{
        if(text!==null){
            friendRquest.insertMany({userId,recipientId,text})
            .then((data)=>{
                res.send({code:0, msg:'好友请求发送成功！',data:data})
            })
            .catch((err)=>{
                res.send({code:-2,msg:'发送失败'})
            })
        }else{
            friendRquest.insertMany({userId,recipientId})
        .then((data)=>{
            res.send({code:0, msg:'好友请求发送成功！',data:data})
        })
        .catch((err)=>{
            res.send({code:-2,msg:'发送失败'})
        })
    }
}
})

router.post('/accept',(req,res)=>{
    //获取数据
    //数据处理
    //返回数据
    let  {userId,recipientId} =req.body
    console.log(req.body)
    if(!userId||!recipientId) {
        return res.send({code:-3,msg:"参数错误！"})
    }else{
        friendRquest.find({userId,recipientId})
        .then((data)=>{
            if(data.length ===0){
                res.send('请求已过期')
            }else{
                friendRquest.updateOne({_id:data[0].id},{accept:true})
                friendList.insertMany([{userId:userId, friend:recipientId},{userId:recipientId,friend:userId}])
                .then((data)=>{
                    console.log(data)
                    res.send({code:0, msg:'添加成功',data:data})
                })           
            }
        })
        .catch((err)=>{
            res.send({code:-2,msg:'请求失败'})
        })
    }
})

router.post('/createChat',(req,res)=>{
    //获取数据
    //数据处理
    //返回数据
    let  {userId,recipientId} =req.body
    console.log(req.body)
    if(!userId||!recipientId) {
        return res.send({code:-3,msg:"参数错误！"})
    }else{
         User.find({_id:{ $in: [userId,recipientId]}})
         .then((data)=>{
         const user1 =data[0]
         const user2 =data[1]
         let obj1 ={userId:user1._id, uid:user2._id,name:user2.user,msg:'你们已经是好友啦，开始聊天吧！',id:2,img:user2.img,id:1}
         let obj2 ={userId:user2._id, uid:user1._id,name:user1.user,msg:'你们已经是好友啦，开始聊天吧！',id:2,img:user1.img,id:1}
         chatData.insertMany([obj1,obj2])
         .then((data)=>{
           console.log(data)
           Chat.insertMany([{userId:user1._id,uid:user2._id,imgUrl:user2.img,name:user2.user,news:'你们已经是好友啦，开始聊天吧!',email:user2.mail,dataListId:data[0]._id,tips:1},{userId:user2._id,uid:user1._id,imgUrl:user1.img,name:user1.user,news:'你们已经是好友啦，开始聊天吧!',email:user1.mail,dataListId:data[0]._id,tips:1}])    
           res.send({code:0, msg:'好友请求发送成功！',data:data})
       })
         })
        .catch((err)=>{
            res.send({code:-2,msg:'发送失败'})
        })
    }
})
module.exports =router