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

mongoose.set('debug', true);
// mongoose.connect('mongodb://' + config.dbUser + ':' + config.dnPwd + '@'
//     + config.dbAddress + ':' + config.dbPort + '/' + config.dbName);
mongoose.connect('mongodb://blogUser:blogAdmin@localhost:24678/blog');
const db = mongoose.connection;
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
  //一次打开记录
  console.log('connected to db');
});



app.use(bodyParser());
app.keys = ['some keys1']
app.use(convert(session(app)));
app.use(async (ctx, next)=>{
    console.log(ctx.method,ctx.url,'session',ctx.session);
    ctx.session.views += 1;
    await next();
})



app.use(router.routes());
app.use(convert(serve(path.join(__dirname, 'public'),{
    maxAge: 60 * 60 * 24 * 30,
})));

app.listen('3000',()=>{
    console.log('app listening port 3000...')
})