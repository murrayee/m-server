/**
 * Created by bear on 2017/7/17.
 */
const path =require('path')
const Koa = require('koa')
const convert = require('koa-convert')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const cors=require('koa2-cors');
const koaLogger = require('koa-logger')
const session = require('koa-session-minimal')
const MongoStore = require('koa-generic-session-mongo')
const router = require('./routers/api')
const app = new Koa()
const server = require('http').Server(app.callback());
// 配置session中间件
app.use(session({
    db:'murray',
    key: 'USER_SID',
    store: new MongoStore()
}))

// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())
//跨域
app.use(cors())

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname , './test')
))

// 初始化路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 监听启动端口



server.listen( 3003,()=>{
    "use strict";

    console.log(`the server is start at port 3003`)

} )

//

//sockte.io服务

const io = require('socket.io')(server);

const userDao=require("./dao/userDao")
const msgDao=require("./dao/msgDao")

io.set('heartbeat interval', 60000);
io.set('heartbeat timeout', 5000);

io.on('connection', function (socket) {

    socket.on('message', function (payload) {

        console.log(payload)

        msgDao.msgSave(socket, payload);

    });

    socket.on('disconnect', function () {
        console.log("用户离开")

    });

    socket.on('user:online', function (data) {

        // msgDao.sendOfflineMessage(socket, data.userId);

        console.log('发送离线消息')

    });
});


module.exports = server
