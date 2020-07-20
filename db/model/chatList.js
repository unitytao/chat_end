const mongoose =require('mongoose')
//scheme对象
//var Schema =mongoose.Schema
//创建一个和集合相关的SCHEMA对象
var chatSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    uid:{type:String,required:true},
    imgUrl:{type:String,required:true},
    name:{type:String, required:true},
    time:{type:Date, default:new Date()},
    news:{type:String, required:true},
    email:{type:String},
    dataListId:{type:String, required:true},
    tips:{type:Number, required:true,default:0}
  });
//将schema对象转化成数据模型
var Chat = mongoose.model('chat_lists',chatSchema)//该数据对象与集合相关联

module.exports=Chat