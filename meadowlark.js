var express = require('express');

var app = express();

var fortune = require('./lib/fortune.js');

//set up handlebars view engine
//指定了默认布局为main,除非特殊指明,都用这个
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

function getWeatherData() {
  return {
    locations: [
      {
        name: 'Portland',
        forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
        weather: 'Overcast',
        temp: '54.1 F (12.3 C)',
      },
      {
        name: 'Bend',
        forecastUrl: 'http://wunderground.com/US/OR/Bend.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
        weather: 'Partly Cloudy',
        temp: '55.0 F (12.8 C)',
      },
      {
        name: 'Manzanita',
        forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
        iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
        weather: 'Light Rain',
        temp: '55.0 F (12.8 C)',
      },
    ],
  };
}

//static方法将一个或多个目录指定为包含静态资源的目录,相当于为所有静态文件创建了一个路由
//渲染文件(不经过任何特殊处理)并发送给客户端
app.use(express.static(__dirname + '/public'));

/* 该中间件来检测查询字符串的test=1 必须放在所有路由之前 */
app.use(function(req, res, next) {
  //不处于生产环境中,env means Environment, includes two types, the other is dev.
  //用一个url参数来打开测试
  res.locals.showTests = app.get('env') !== 'production' && 
    req.query.test === '1';
  next();
});

//创建中间件给res.locals.partials对象添加数据
app.use(function(req, res, next) {
  if(!res.locals.partials) {res.locals.partials = {};}
  res.locals.partials.weather = getWeatherData();
  next();
});

//app.get 是用来设置路由的方法
app.get('/', function(req, res) {
  res.render('home');
  // res.type('text/html');
  // res.send('Meadowlark Travel');
});

app.get('/about', function(req, res) {
  //在路由中应指明视图应该使用哪个页面测试文件
  res.render('about', { 
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js'
  });
  // res.type('text/plain');
  // res.send('About Meadowlark Travel');
});

// 为联系表单的RequestGroupRate页面与点击连接hood-river页面设置路由
app.get('/tours/hood-river', function(req, res) {
  res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function(req, res) {
  res.render('tours/request-group-rate');
});

// 为oregan-coast设置路由
app.get('/tours/oregon-coast', function(req, res) {
  res.render('tours/oregon-coast');
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

// if( app.thing == null) console.log( 'bleat! ');