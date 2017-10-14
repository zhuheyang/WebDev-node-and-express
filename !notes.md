>warning: minimatch@0.3.0: Please update to minimatch 3.0.2 or higher 
>to avoid a RegExp DoS issue  
这里有一个warning, RegExp, Regular-Expression 正则表达式  
>__dirname会被解析为正在执行的脚本所在的目录, Eg:/home/sites/app.js 
>__dirname会被解析为:/home/sites

.vimrc文件进行编辑器相关设置
public文件夹之所以叫public: 是因为该目录下所有文件都会直接对外开放!

// app.get 是用来设置路由的方法  
// app.use 是添加中间件的方法  

// static方法将一个或多个目录指定为包含静态资源的目录,相当于为所有静态文件创建了一个路由,  
// 同时渲染文件(不经过任何特殊处理)并发送给客户端  

===========================================================================

'--save --save-dev' 一个是运行时依赖项(product), 一个是开发依赖项  
页面测试 的相关依赖可以放在开发依赖项中,在部署网站的现场实例时,可以减少项目依赖项
```bash
cp node_modules/mocha/mocha.js public/vendor  
cp node_modules/mocha/mocha.css public/vendor  
```
因为vendor要在brower中运行,所以将其放在public目录下  
容易分清哪些代码是自己负责测试与修改的,哪些代码不应触碰.(把用到的第三方库放在一个特殊的目录
(Eg:vendor 中)

`req.query` 是一个对象 包含以键值对存放的查询字符串参数(通常成为GET请求参数)

=============================================================

>因此对于已经track且有改动的文件添加ignore规则, 如下:
>
>git rm -r --cached 要忽略的文件 (如: git rm -r --cahced build/*, 如修改列表中的内容全部是不需要的, 那么你可以使用最最简单的>命令搞定git rm -r --cached .)
>git add .
>git commit -m " commet for commit ....."
>git push

=============================================================

>性能调优第一条原则:先测量,再调优!

BDD Behaviour Driven Development 行为驱动开发
TDD Test-Driven Development 测试驱动开发

# 页面测试
mocha用于页面测试,其中测试通常需要assert(或expect)函数,Node框架中有,但浏览器没有
于是需要Chai断言库

进行页面测试 通常先进行一个整体的测试,对于每个页面都要有可运行的测试
之后就可以针对特定的页面进行不同的测试了.

# 跨页测试
无头浏览器 headless browser 没有界面的浏览器(屏幕不显示东西,但是表现像浏览器)


>即便只是进行业务测试代码的书写,也要写一部分,差不多了就要测试一下,不要累计代码
>人的记忆是有限的,人也是一定会犯错的,控制不代表不会犯

=======================================================================

body-parser在node3.0时已经移出connect部分. namely deprecated.
define: only connect with the 'json' and 'urlencoded' 's convenient-oriented middleware.

body-parser deprecated bodyParser: use individual json/urlencoded middlewares meadowlark.js:158:31
body-parser deprecated undefined extended: provide extended option node_modules\body-parser\index.js:105:29

=======================================================================


>少了最前面的斜杠"?" 这是很要命的.不要怀疑机器出了问题.

```bash
Error: Timeout of 2000ms exceeded. For async tests and hooks, 
ensure "done()" is called; if returning a Promise, ensure it resolves.
```
时间不够所以测试就没有成功,应该设置时间的,这样子测试就能正常进行了.看看源码找找错误!

# 跨页测试(crosspage-test)的测试结果
>设置了timeout 理所当然没有起作用,实在是对mocha了解不深,任重而道远!  
>  Cross-Page Tests  
>    1) requesting a group rate quote from the hood river tour page should populate the referrer field  
>    2) requesting a group rate from the oregon coast tour page should populate the referrer field  
>    ✓ visiting the "request group rate" page directly should result in an empty referred field (807ms)  
>  1 passing (6s)  
>  2 failing  
>
>  1) Cross-Page Tests
>       requesting a group rate quote from the hood river tour page should populate the referrer field:
>  2) Cross-Page Tests
>       requesting a group rate from the oregon coast tour page should populate the referrer field:
>      Uncaught AssertionError: Unspecified AssertionError
>      at qa/tests-crosspage.js:23:11
>      Uncaught AssertionError: Unspecified AssertionError
>      at qa/tests-crosspage.js:35:9
>      at EventLoop.done (node_modules/zombie/lib/eventloop.js:589:11)
>      at Immediate.<anonymous> (node_modules/zombie/lib/eventloop.js:688:71)

# ESLint
   Eslint: How to disable “unexpected console statement” in Node.js?
   Put this in your .eslintrc.json:
```json
   {
     "rules":{
         "no-console":0
     }
   }
```

# 使用了JSHint,但是都没有反应,没有发出应该使用三个等号的"抱怨":
  Eg: if( app.thing == null) console.log( 'bleat! ');

#grunt自动化
Grunt中loadNpmTask,可使用forEach方法将创建的数组中的插件名称顺序加载!
  
============================================================================================================

# Handlebars 模板引擎 template engine

# 表单处理 form-processing

req.xhr与req.accepts 两个Express提供的属性:  
XHR(XML HTTP), 如果是AJAX请求,req.xhr值为true,同时req.accepts视图确定返回的最佳响应类型  
处理AJAX表单与普通的HTML表单  

Twitter Bootstrap风格

# 文件上传

# cookie
```
// RequireJS cannot load CommonJS modules as-is. 
// However, there is a minimal modification you can make to them to load them.
// use define! 
var credentials = require('./lib/credentials.js');

// 设置和访问cookie
var cookie = require('cookie-parser');
app.use(cookie(credentials.cookieSecret));
// 之前是app.use(cookie)(credentials.cookieSecret), 结果变成上面那样子就可以运行了, 
// 妈的路漫漫其修远兮.

//if use code snippet above, it will turns:
//TypeError: Cannot create property 'next' on string '2p+)L$-zlcIX-TP'

// if happens that: cookieSecret is a string, you can't use its attr as it is an objects,
// you can use this:
// var credentials = {
//   cookieSecret: '2p+)L$-zlcIX-TP',
// };

```


关于Credentials.js无法输出的问题描述与解答:
Error: Module is not defined in NodeJS:  
>It seems like you're trying to run the code in a browser,  
>and the error you're getting is saying that module is not defined. 
>If this code is intended to be run in a browser, 
>you'll have to package it with Webpack or Browserify first.

>Node doesn't have its own XmlHttpRequest, 
>which is something we take for granted in the web/browser world. 
>This is likely the cause of the errors in your AJAX module. 
>It is trying to reference a variable (XmlHttpRequest) which doesn't exist, 
>and since it doesn't exist the file gets an error.

# session

# middleware
>In the previous examples, our middleware will use statement:"return next();" to early terminate,  
>Express does not expect middleware's return value, and it will never use the value to do anythin,  
>Therefore, this just shorten the 'next();' and 'return;'.

### 注意//code.jquery.com/jquery-2.0.2.min.js
>Because of the Internet's reason, the jquery.com demands you climb over 
>the wall to loading, so be careful when you use this cdn!
>You should carefully check your proxy settings so as to let it load fluently.

发现问题的解决方法不应该是苦苦思想如何描述它以免后面的的人不要踩坑,
而是解决它!这是<代码大全>中有提到过的!

# 邮件基础知识
SMTP,简单邮件传输协议 MSA,邮件提交代理 MTA, 邮件传输代理
Simple Email Transmission protocols, Main Summit Agent, Main Transmission Agent.
与HTTP请求相像,邮件信息包括头部与主体;
>who send the Email; send to who; the receive data; topic, etc;
>those Meta Message was provided by the Email handle Program(Mail handler),

### 判断邮件是否投递成功的两种选择
1. 使用支持错误报告的MSA
2. 选择使用直接投递(但很有可能邮件会被标记为垃圾邮件)
>两种选择都不简单,都超出了该书的范围
>基础知识要牢固,玩起特定场景的新东西时才会流畅灵活!
>数学授之以渔,考之以
>鱽鱾鲀鱿鲃鲂鲉鲌鲄鲆鲅鲇鲏鲊鲋鲐鲈鲍鲎鲝鲘鲙鲗鲓鲖鲞鲛鲒鲚鲜鲟鲔鲕鲑鲧鲬鲪鲫鲩鲣鲨鲡鲢鲤鲠鲥鲦鲺鲯鲹鲴鲶鲳鲮鲭
>前端也是,基础越深入,玩得也深入.深呼吸!

>1aa21489bb6147e000339f683bcd885160d601f1
>This is my own new personal access token now, 
>It won'be seen again, so I put it in there.

### Nodemailer using gmail, Cannot create property 'mailer' on string 'SMTP'
>The nodemailer has been reworked, so old code structure could throw such error. 
>Try use the following structure:
```
smtpTrans = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    xoauth2: xoauth2.createXOAuth2Generator({
    user: 'kylevantil14@gmail.com',
   //and other stuff
```
>The current problem Today for help is the change of information faster, 
>and Alexander was good when he said "nodemailer is reworked";

### mailTransport's define
```
// or you can just connect a SMTP server:
/* var mailTransport = nodemailer.createTransport('SMTP', {
  host: 'smtp.meadowlarktravel.com',
  secureConnection: true, // use SSL port: 465
  auth: {
    user: credentials.meadowlarkSmtp.user,
    pass: credentials.meadowlarkSmtp.password,
  }
});
 */
 ```




