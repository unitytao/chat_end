"use strict";
const nodemailer =require('nodemailer');
let transporter =nodemailer.createTransport({
    host:"smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
        user:'1060065729@qq.com',
        pass:'nnuqingtmydubddb'
    }
});

function send(mail,code){
    //邮件信息
    let mailobj ={
        from:'"jinitaimei"<1060065729@qq.com>',
        to:mail,
        subject:"alibaba",
        text: `您的验证码是${code},有效期五分钟`
    }

    return new Promise((resolve,reject)=>{
        transporter.sendMail(mailobj, (err,data)=>{
            if(err){
                reject()
            }else{
                resolve()
            }
        })
    })
   
}
module.exports ={send}