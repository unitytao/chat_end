const mongoose =require('mongoose')
//scheme对象
//var Schema =mongoose.Schema
//创建一个和集合相关的SCHEMA对象
var friendRequestSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    text:{type:String, required:false,default:'交个朋友吧~'},
    recipientId:{type: String, required:true},
    accept:{type:Boolean,default:false},
    date:{type:Date, default: Date()},
    tips:{type:Number, default:0}
  });
//将schema对象转化成数据模型
var friendRequest = mongoose.model('friend_requests',friendRequestSchema)//该数据对象与集合相关联

module.exports=friendRequest