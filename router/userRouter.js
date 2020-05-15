const express =require('express')
const router =express.Router()
const User =require('../db/model/userModel')
let codes={} //保存验证码信息
const Mail =require('../utils/mail')
const request =require('request')
const data ={}
/**
 * @api {post} /user/reg 用户注册
 * @apiName 用户注册
 * @apiGroup User
 *
 * @apiParam {String} user 用户名
 * @apiParam {String} password 密码
 * @apiParam {String} code 验证码
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "HU",
 *       "lastname": "TAO"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
router.post('/reg',(req,res)=>{
    //获取数据
    //数据处理
    //返回数据
    let {user, password,code,mail} =req.body
    if(!user||!password||!code||!mail) {
        return res.send({code:-1,msg:"参数错误！"})
    }else{
        code1=parseInt(code)
        if(codes[mail]!==code1){return res.send({err:-4,msg:'验证码错误'})}
        User.find({user: user})
        .then((data)=>{
            console.log(data)
            if(data.length===0){
               return User.insertMany({user:user, password:password, mail:mail})
            }else{
                res.send({code:-1, msg:'用户名已存在'})
            }
        })
        .then((data)=>{
            res.send({code:0, msg:'注册成功！',data:data})
        })
        .catch((err)=>{
            res.send({code:-2,msg:'注册失败'})
        })
    }
})

router.post('/login',(req,res)=>{
    //获取数据
    //数据处理
    //返回数据
    let {user, password} =req.body
    if(!user||!password) {
        return res.send({code:-1,msg:"参数错误"})
    }else{
        User.find({user,password})
        .then((data)=>{
            if(data.length>0){
                res.send({code:0, msg:'登陆成功',userInfo:data})
            }else{
                res.send({code:-1, msg:'用户名或密码错误'})
            }
        })
        .catch((err)=>{
            res.send({code:-1, msg:'内部错误'})
        })
    }
})

//发送邮箱验证码
router.post('/getMailCode',(req,res)=>{
    let {mail} =req.body
    console.log(req.body)
    if(mail){
        //残生随机验证码
        let code=parseInt(Math.random()*1000000)
        Mail.send(mail, code)
        .then(()=>{
            res.send({code:0, msg:'发送成功'})
            codes[mail] =code
            console.log(codes)
        })
        .catch((err)=>{
            res.send({code:-1, msg:'发送失败'})
        })
    }else{
        res.send({code:-1,msg:"邮箱错误"})
    }
})

router.get('/wxlogin',(req,res)=>{
    //获取数据
    //数据处理
    //返回数据
    const appid ='wxb2ea0e5d47967e74'
    appsecret ='023416cb76bb841c4455c6d174c4221c'
    const code =req.query.code
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`
    request(url, (err,response,body)=>{
        if(response.statusCode ===200){
            console.log(body)
            res.send(body)
        }else{
            res.send(err)
        }
        
   })
})

module.exports =router