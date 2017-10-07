var express = require('express');

var app = express();

//set up  handlebars view engine
//指定了默认布局为main,除非特殊指明,都用这个
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

//static方法将一个或多个目录指定为包含静态资源的目录,相当于为所有静态文件创建了一个路由
//渲染文件(不经过任何特殊处理)并发送给客户端
app.use(express.static(__dirname + '/public'));

//virtual array of lucky cookies
var fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
];

//app.get 是用来设置路由的方法
app.get('/', function(req, res) {
  // res.type('text/html');
  res.render('home');
  // res.send('Meadowlark Travel');
});

app.get('/about', function(req, res) {
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('about', { fortune: randomFortune});
  // res.type('text/plain');
  // res.send('About Meadowlark Travel');
});

//app.use是添加中间件的方法
//定制404页面 404 catch-all 处理器(中间件middleware)
app.use(function(req, res) {
  res.status(404);
  res.render('404');
  // res.type('text/plain');
  // res.send('404 - Not Found');
});

//定制500页面 500错误处理器(中间件)
app.use(function(req, res) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
  // res.type('text/plain');
  // res.end('500 - Server Error');
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' +
     app.get('port') + '; press Ctrl-C to terminate.');
});