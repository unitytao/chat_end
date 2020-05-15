const express =require('express')
const router =express.Router()
const multer =require('multer')

var storage =multer.diskStorage({

    destination: function(req,file,cb){
        cb(null, './static/img')
    },
    //给文件重命名，并添加后缀
    filename: function(req,file,cb){
        var fileFormat =(file.originalname).split(".")
        //给图片加上时间戳防止重名
        cb(null, fileFormat[0] + '-' +Date.now() + '.' +fileFormat[fileFormat.length - 1])
    }
})
var upload =multer({
    storage:storage
});

router.post('/upload', upload.single('files'),(req, res)=>{
    let{size, mimetype, filename} =req.file
    let types =['jpg','jpeg','png','gif'] //允许上传的数据类型
    let tmpType =mimetype.split('/')[1]
    let url =filename
    if(types.indexOf(tmpType)==-1){
        return res.send({err:-1, msg:'文件类型错误！'})
    }else if(size>2*1024*1024){
        return res.send({err:-2, msg:'图片尺寸过大！'})
    }else{
        res.send({code:0, msg:'上传成功！',url:url})
    }
})



module.exports =router
