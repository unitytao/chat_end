const express =require('express')
const app =express()

var server =app.listen(8888)
var io =require('socket.io').listen(server)
require('./socket/socket.js')(io);



app.get('/', (req,res)=>{
    res.send('Hello word')
})

app.listen(3000,()=>{
    console.log('server start')
})