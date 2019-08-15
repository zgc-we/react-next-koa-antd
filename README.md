# 项目安装

```
yarn install 下载包
npm run dev 运行
npm run build 打包
```
# [Koa](https://chenshenhai.github.io/koa2-note/)

## Koa 介绍
```
koa是从2013年11月开始发布，更新的。和express相比，koa太年轻了.但它（用文档上的话说）通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套，并极大地提升常用错误处理效率。Koa 不在内核方法中绑定任何中间件，仅仅提供了一个轻量优雅的函数。

严格的说koa并不是完整的web框架，实际使用的时候，开发者根据自己的需要，需要用到其他的中间件。

koa只是提供了一种不同于connect的中间件解决方案，另外再加上一些对request,response的简单封装。这个看它的api就看的出来。比如，对请求/login?name=a&pwd=b,直接用koa的api,只能取url,query(name=a&pwd=b),它不像其他的框架，会进行进一步的封装，将请求的参数封装成键值形式。这时，需要用其他中间件如koa-bodyparser来完成。

[可用到的中间件](https://github.com/koajs/koa/wiki)可供参考
```

## Koa 常用中间件
```
var path = require('path')
var route= require('koa-route');//路由
var koa = require('koa');
var gzip = require('koa-gzip');//gzip压缩
var staticCache = require('koa-static-cache');//在响应中添加对静态文件缓存的header
var json = require('koa-json');//返回json格式的响应
var bodyParser = require('koa-bodyparser');//解析请求参数
var app = koa();

var user_controller=require('./app/controllers/userController');

app.use(staticCache(path.join(__dirname, 'public'), {
  maxAge:24 * 60 * 60
}))
app.use(bodyParser());
app.use(gzip());
app.use(route.post('/login', new user_controller().login));
app.use(json({pretty: false}));

app.listen(8000);
```

## Koa 中间件的实现，简单的实现一个打印组件实现
```
var koa = require('koa');
var app = koa();
//添加中间件1
app.use(function *(next){
  var start = new Date;
  console.log("start=======1111");
  yield next;
  console.log("end=======1111");
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});
//添加中间件2
app.use(function *(){
  console.log("start=======2222");
  this.body = 'Hello World';
  console.log("end=======2222");
});

app.listen(3000);
/*
start=======1111
start=======2222
end=======2222
end=======1111
GET / - 10
start=======1111
start=======2222
end=======2222
end=======1111
GET /favicon.ico - 5
*/
```

**说明**
app.use()来添加中间件。use函数接受一个generator function。这个generator function就是一个中间件。generator function有一个参数next。这个next是下一个中间件generator function的对应generator对象。yield next;调用下一个中间件的代码。具体代码如下：

```
app.callback = function(){
  var mw = [respond].concat(this.middleware);
  var gen = compose(mw);
  var fn = co.wrap(gen);
  var self = this;

  if (!this.listeners('error').length) this.on('error', this.onerror);

  return function(req, res){
    res.statusCode = 404;
    var ctx = self.createContext(req, res);
    onFinished(res, ctx.onerror);
    fn.call(ctx).catch(ctx.onerror);
  }
};
app.listen = function(){
  debug('listen');
  var server = http.createServer(this.callback());
  return server.listen.apply(server, arguments);
};
```
---
**listen()时，执行callback(),里面返回function(req,res)回调，然后是对node原生的监听listen().也就是说，上面代码相当于**
(```)
var http = require("http");

http.createServer(function(request, response) {
    res.statusCode = 404;
    var ctx = self.createContext(req, res);
    onFinished(res, ctx.onerror);
    fn.call(ctx).catch(ctx.onerror);
}).listen(8888);
```



