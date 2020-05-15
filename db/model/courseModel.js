const mongoose =require('mongoose')
//scheme对象
//var Schema =mongoose.Schema
//创建一个和集合相关的SCHEMA对象
var courseSchema = new mongoose.Schema({
    courseName :{type:String, required:true},
    school :{type:String, required:true},
    imgSrc:{type:String, required:true},
    browser:{type: Number,default:0},
    dataUrl:{type:String, required:true},
    status:{type:Number, default:0},
    type:{type:String, required:true},
    ownerId:{type:Number, required:true}
  });
//将schema对象转化成数据模型
var Course = mongoose.model('users',userSchema)//该数据对象与集合相关联

module.exports=Course