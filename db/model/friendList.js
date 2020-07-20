const mongoose =require('mongoose')
var Schema =mongoose.Schema
//scheme对象
//var Schema =mongoose.Schema
//创建一个和集合相关的SCHEMA对象
var friendListSchema = new mongoose.Schema({
    userId: {type:String, required:true},
   // friend:{type:String, required:true},
    friend:{
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    date:{type:Date, default:Date()}
  });
//将schema对象转化成数据模型
var friendList = mongoose.model('friend_lists',friendListSchema)//该数据对象与集合相关联

module.exports=friendList