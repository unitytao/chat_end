const mongoose =require('mongoose')
//scheme对象
//var Schema =mongoose.Schema
//创建一个和集合相关的SCHEMA对象
var userSchema = new mongoose.Schema({
    user: {type:String, required:true},
    password: {type:String, required:true},
    age: Number,
    mail:{type:String, required:true},
    sex:{type:Number,default:0},
    img:{type:String,default:'../../static/image/img/user.jpg'}
  });
//将schema对象转化成数据模型
var User = mongoose.model('users',userSchema)//该数据对象与集合相关联

module.exports=User