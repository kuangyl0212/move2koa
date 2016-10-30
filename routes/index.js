'use strict'

const router = new require('koa-router')();
const Post = require('../models/Post');
const User = require('../models/User');

const findUser = async (option)=>{
    let result;
    await User.findOne(option,(err,user)=>{
        if (user) result = true;
    })
    return result;
  }

router.get('/home', async (ctx, next)=>{
        await Post
        .find()
        // 首页只获取标题 这样做是因为 如果获取全部内容的话 不排除内容量十分巨大 造成阻塞
        .select('title createTime')
        // 按时间排序
        .sort('-createTime')
        .exec(function (err, posts) {
            if (err) return console.error(err);
            // console.log('posts---',posts);
            ctx.body = posts;
        })
        await next();
})

router.get('/article',async (ctx,next)=>{
    var id = ctx.query.id;
    await Post.findOne({_id: id},function (err, post) {
        if (err) return console.error(err);
        ctx.body = post;
    });
    await next();
});

// 发表文章
router.post('/post',async (ctx,next)=>{
    console.log('POST /post',ctx.request.body);
    await Post.findOne({title: ctx.request.body.title},(err,post)=>{
        console.log('11111',err,post)
        if (err) ctx.body = 'err';
        if (post) ctx.body = 'title_exist';
    })
    var post = new Post({
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        createTime: ctx.request.body.createTime,
    });
    await post.save().then(()=>{
        ctx.body = 'success';
    });
    await next()
});

// 用户
router.get('/users/check', async(ctx, next)=> {
    console.log('get usercheck---');
    console.log('check---',ctx.session);
    if (ctx.session.uid) {
        await User.findOne({_id: ctx.session.uid},(err,user)=>{
            delete user.password;
            if (user) {
                ctx.body = {
                    code: 1,
                    user: user
                }
            } else ctx.body = 0;
        })
    } else ctx.body = 0;
    await next();
});

router.post('/users/reg', async(ctx,next)=> {
  var data = ctx.request.body;
  var findUsername = await findUser({user_name: data.user_name});
  var findEmail = await findUser({email: data.email});

console.log('result--->',findUsername,findEmail)
  if (findUsername == true) ctx.body = {msg:'exist'};
  if (findEmail == true) ctx.body = {msg:'email_exist'};

  if (!findUsername && !findEmail) {
      let user = new User({
        user_name: data.user_name,
        email: data.email,
        password: data.password,
        })
        user.save();
        ctx.body = {msg:'success'};
  }
  await next();

});

router.post('/users/login', async (ctx, next)=> {
    var data = ctx.request.body;
    // console.log('data---',data);
    await User.findOne({email: data.email},function(err,user){
        // console.log('err',err,'user',user);
        if (err) {
            ctx.body = new Error(err);
        } else {
            if (user) {
                if (user.password == data.password) {
                    // 登录成功的后端操作 todo
                    ctx.session.uid = user._id;
                    ctx.body = {msg:'success',token:user._id};
                } else {
                    ctx.session.user = user;
                    ctx.body = {msg: 'pass_err'};
                }
            } else {
                ctx.body = {msg:'not_exist'};
            }
        }
    })
    await next()
});

router.get('/users/logout',async (ctx, next)=>{
    console.log('logout...')
    ctx.session.uid = null;
    ctx.body = 'success';
    await next()
})

module.exports = router;