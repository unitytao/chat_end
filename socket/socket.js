const chatData =require('../db/model/dataList.js')
const Chat =require('../db/model/ChatList.js')
module.exports =function(io){
    var socketList ={};
    var users=[];
    var member =0;

    io.sockets.on('connection', (socket) => {
        console.log('socket 连接成功');
       
        socket.on('join',data =>{
            //console.log(socket)
            if(!(data.userId in socketList)){
                console.log(data)
                socket.userId = data.userId;
                socketList[data.userId] =socket;
                users.push(data.name)
                //console.log(socketList)
                socket.broadcast.emit('welcome',data.name)
                socket.emit('welcome',data.name)
            }else{
                socket.userId = data.userId;
                socketList[data.userId] =socket
                socket.broadcast.emit('welcome',data.name)
                socket.emit('welcome',data.name)
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
            let Data1 = Object.assign({}, data);
            Data1.name =data.user
            let Data2 = Object.assign({}, data);
            Data2.name =data.user
            Data2.gid =Data2.userId
            Data2.userId =Data2.uid
            Data2.uid =Data2.gid
            Data2.id =1
            //console.log(Data1,Data2)
            Chat.find({userId:data.uid,uid:data.userId})
            .then((Data)=>{
               // console.log(Data)
                chatData.insertMany([Data1,Data2])
                Chat.updateOne({_id:Data[0]._id},{news:data.msg})
                .then((msg)=>{
                    console.log(msg)
                    if(data.uid in socketList) {  
                        socketList[data.uid].emit('receive private message', data);
                    }else{
                        let tip =Data[0].tips
                        tip++
                        Chat.updateOne({_id:Data[0]._id},{tips:tip})
                        .then((data2)=>{
                           // console.log(data2)
                        })
                    }
                })
            })
           
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