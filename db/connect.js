const mongoose =require('mongoose')
//连接数据库
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true,useUnifiedTopology: true});
//创建数据库的连接对象
var db = mongoose.connection
db.on('err', console.error.bind(console,'connection error:'))
db.once('open',function(){
    console.log('数据库连接成功')
})
