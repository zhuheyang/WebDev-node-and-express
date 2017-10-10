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

>少了最前面的斜杠"?" 这是很要命的.不要怀疑机器出了问题.

```bash
Error: Timeout of 2000ms exceeded. For async tests and hooks, 
ensure "done()" is called; if returning a Promise, ensure it resolves.
```
时间不够所以测试就没有成功,应该设置时间的,这样子测试就能正常进行了.看看源码找找错误!

# 跨页测试(crosspage-test)的测试结果
设置了timeout 理所当然没有起作用,实在是对mocha了解不深,任重而道远!
  Cross-Page Tests
    1) requesting a group rate quote from the hood river tour page should populate the referrer field
    2) requesting a group rate from the oregon coast tour page should populate the referrer field
    ✓ visiting the "request group rate" page directly should result in an empty referred field (807ms)
  1 passing (6s)
  2 failing

  1) Cross-Page Tests
       requesting a group rate quote from the hood river tour page should populate the referrer field:
  2) Cross-Page Tests
       requesting a group rate from the oregon coast tour page should populate the referrer field:
      Uncaught AssertionError: Unspecified AssertionError
      at qa/tests-crosspage.js:23:11
      Uncaught AssertionError: Unspecified AssertionError
      at qa/tests-crosspage.js:35:9
      at EventLoop.done (node_modules/zombie/lib/eventloop.js:589:11)
      at Immediate.<anonymous> (node_modules/zombie/lib/eventloop.js:688:71)

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



