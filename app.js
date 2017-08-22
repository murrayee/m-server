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


// 配置session中间件
/*
 1 url mongodb connection url (full connection string. host, port, db, ssl options will be ignored)
 2 db mongodb-native database object or database name (test by default)
 3 collection collection name (sessions by default)
 4 host db hostname (127.0.0.1 by default)
 5 port db port (27017 by default)
 6 ttl ttl in milliseconds (if set it overrides cookie maxAge)
 7 user user for MongoDB
 8 password password for MongoDB authentication
 9 ssl use SSL to connect to MongoDB (false by default)
 */
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
    path.join(__dirname , './static')
))

// 初始化路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 监听启动端口
app.listen( 3003 )

console.log(`the server is start at port 3003`)
