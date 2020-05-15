const express =require('express')
const db =require('./db/connect.js')
const path =require('path')
const app =express()
const bodypaser =require('body-parser')
//设置跨域访问
app.all('*', function(req, response, next) {
 
    //设置允许跨域的域名，*代表允许任意域名跨域
    response.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
    //跨域允许的请求方式
    response.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    //设置响应头信息
    response.header("X-Powered-By",' 3.2.1')
    response.header("Content-Type", "application/json;charset=utf-8");
    next();
 });

var server =app.listen(8888)
var io =require('socket.io').listen(server)
require('./socket/socket.js')(io);

app.use(bodypaser.urlencoded({extended: false}))
app.use(bodypaser.json())
app.use('/public', express.static(path.join(__dirname,'./static')))
//引入路由
const userRouter =require('./router/userRouter')
const fileRouter =require('./router/fileRouter')
app.use('/user', userRouter)
app.use('/file', fileRouter)

app.listen(3000,()=>{
    console.log('server start')
})