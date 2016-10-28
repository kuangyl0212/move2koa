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
mongoose.connect('mongodb://' + config.dbAddress + ':' + config.dbPort + '/' + config.dbName);
const db = mongoose.connection;
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
  //一次打开记录
  console.log('connected to db');
});

app.use(bodyParser());

app.use(convert(session(app)));
app.use(async (ctx, next)=>{
    console.log('session',ctx.session);
    await next();
})

app.use(convert(serve(path.join(__dirname, 'public'),{
    maxAge: 60 * 60 * 24 * 30,
})));

app.use(router.routes());

app.listen('3000',()=>{
    console.log('app listening port 3000...')
})