'use strict';
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routes');
const path = require('path');
const serve = require('koa-static');
const mongoose = require('mongoose');
const convert = require('koa-convert');
const session = require('koa-session');

const config = require('./common/config');

const app = new Koa();

// 连接数据库
mongoose.connect('mongodb://' + config.dbUser + ':' + config.dbPwd + '@'
    + config.dbAddress + ':' + config.dbPort + '/' + config.dbName);
const db = mongoose.connection;
// 数据库的log 生产环境请注释掉！TODO
// mongoose.set('debug', true);
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
  //一次打开记录
  console.log('connected to db');
});

app.use(bodyParser());
app.keys = ['some keys1']
app.use(convert(session(app)));

// 以下仅作为日志用途 生产环境应当关掉 TODO
app.use(async (ctx, next)=>{
    console.log(ctx.method,ctx.url,'session',ctx.session);
    ctx.session.views += 1;
    await next();
})

// 挂载路由
app.use(router.routes());

// 静态文件服务
app.use(convert(serve(path.join(__dirname, 'public'),{
    maxAge: 60 * 60 * 24 * 30,
})));

// 开启服务 监听设置文件中设置的端口
app.listen(config.serverPort,()=>{
    // log 生产环境请注释掉！TODO
    console.log('app listening port 3000...')
})