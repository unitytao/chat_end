const mongoose =require('mongoose')
//scheme对象
//var Schema =mongoose.Schema
//创建一个和集合相关的SCHEMA对象
var chatDataSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    uid:{type:String,required:true},
    name:{type:String},
    msg:{type:String,required:true},
    date:{type:Date,default:new Date()},
    id:{type:Number},
    img:{type:String}
  });
//将schema对象转化成数据模型
var chatData = mongoose.model('chat_datas',chatDataSchema)//该数据对象与集合相关联

module.exports=chatData