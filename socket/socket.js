module.exports =function(io){
    var socketList ={};
    var users=[];
    var member =0;

    io.sockets.on('connection', (socket) => {
        console.log('socket 连接成功');
       
        socket.on('join',name =>{
            //console.log(socket)
            if(!(name in socketList)){
                console.log(name)
                socket.name = name;
                socketList[name] =socket;
                users.push(name)
                member++
                //console.log(socketList)
                socket.broadcast.emit('welcome',name)
                socket.emit('welcome',name)
            }else{
                socket.name = name;
                socketList[name] =socket
                socket.broadcast.emit('welcome',name)
                socket.emit('welcome',name)
            }
        })

        //接收信息
        socket.on('message',data =>{
            console.log(data);
            //广播消息
            socket.broadcast.emit('gbmsg',data)
        })
        //一对一聊天
        socket.on('private message',data =>{
            console.log(data)
            if(data.userTo in socketList) {
                socketList[data.userTo].emit('receive private message', data);
            }
        })
        //用户离开
        socket.on('disconnection', function(){
            //移除
            console.log(socket.name)
            if(socket.name in socketList){
                delete(socketList[socket.name]);
                users.splice(users.indexOf(socket.name), 1);
            }
            socket.broadcast.emit('disconnection',socket.name)
            console.log[users]
        })
      });
}