var express = require('express');

var app = express();

var fortune = require('./lib/fortune.js');

// var credentials = require('./credentials.js');

//set up handlebars view engine
//指定了默认布局为main,除非特殊指明,都用这个
var handlebars = require('express3-handlebars').create({ 
  defaultLayout:'main',
  partialsDir: 'views/partials',
  layoutDir: '/views',
  helpers : {
    section: function(name, options) {
      if(!this._sections) { this._sections = {};}
      this._sections[name] = options.fn(this);
      return null;
    }
  }
});

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

//设置和访问cookie
// var cookie = require('cookie-parser');
// app.use(cookie)(credentials.cookieSecret);

//if use code snippet above, it will turns:
//TypeError: Cannot create property 'next' on string '2p+)L$-zlcIX-TP'

//链入cookie-parser中间件后,链入express-session中间件
var credentials = {
  cookieSecret: '2p+)L$-zlcIX-TP',
};

var session = require('express-session');
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
}));

//引入exemption clause middleware
app.use(require('./lib/tourRequiresWaivers.js'));

//引入shopping cart validation middleware
var cartValidation = require('./lib/cartValidation.js');

app.use(cartValidation.checkWaivers);
app.use(cartValidation.checkGuestCounts);

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

//测试querytest页面,设置路由
app.get('/jquery-test', function(req, res) {
  res.render('jquery-test', {
    section: 'jquery',
  });
});

//针对nursery-rhyme视图与AJAX调用的路由处理程序
app.get('/nursery-rhyme', function(req, res) {
  res.render('nursery-rhyme');
});
app.get('/data/nursery-rhyme', function(req, res) {
  res.json({
    animal: 'squirrel',
    bodyPart: 'tail',
    adjective: 'bushy',
    noun: 'heck',
  });
});

//感谢页面"/thank-you"的路由设置
app.get('/thank-you', function(req, res) {
  res.render('thank-you');
});

//处理表单请求,重定向到303

// introduce/inlet the 'body-parser' middleware
app.use(require('body-parser')());

app.get('/newsletter', function(req, res) {
  //we will learn CSRF later, at the moment, only provide a dummy value
  res.render('newsletter', { csrf:'CSRF token goes there', });
});

// app.post('/newsletter', function(req, res) {
//   var name = req.body.name || '', email = req.body.email || '';
//   //input certificate
//   if(!email.match(VALID_EMAIL_REGEX)) {
//     if(req.xhr) { return res.json({ error: 'Invalid name email address.'}); }
//     req.session.flash = {
//       type: 'danger',
//       intro: 'Validation error!',
//       message: 'The email address you entered was not ',
//     };
//     return res.redirect(303, '/newsletter/archive');
//   }

//   new NewsletterSignup({ name: name, email: email }).save(function(err) {
//     if(err) {
//       req.session.flash = {
//         type: 'danger',
//         intro: 'Database error!',
//         message: 'There was a database error; please try again later.',
//       };
//       return res.redirect(303, '/newsletter/archive');
//     }
//     if(req.xhr) { return res.json({ success: true }); }
//     req.session.flash = {
//       type: 'success',
//       intro: 'Thank you!',
//       message: 'You have now been signed up for the newsletter.',
//     };
//     return res.direct(303, '/newsletter/archive');
//   });
// });

// this is the html one.
// app.post('/process', function(req, res) {
//   console.log('From (from querystring): ' + req.query.form);
//   console.log('CSRF token (from hidden form field): ' + req.body._csrf);
//   console.log('Name (from visible form field): ' + req.body.name);
//   console.log('Email (from visible form field): ' + req.body.email);
//   res.redirect(303,'/thank-you');
// });

// this is the AJAX one.
app.post('/process', function(req, res){
  if(req.xhr || req.accepts('json,html') === 'json') {
    //if ERROR, send {error: 'error description' }
    res.send({ success: true });
  } else {
    //if ERROR, redirect to ERROR page
    res.redirect(303, '/thank-you');
  }
});

//add the fomidable modules, and its router handling code
var formidable = require('formidable');

app.get('/contest/vacation-photo', function(req, res) {
  var now = new Date();
  res.render('contest/vacation-photo', {
    year:now.getFullYear(),
    month:now.getMonth()
  });
});

app.post('/contest/vacation-photo/:year/:month', function(req, res) {
  var form = new formidable.IncomingForm();
  form.parser(req, function(err, fields, files) {
    if(err) { return res.redirect(303, '/error');}
    console.log('received fields:');
    console.log(fields);
    console.log('received files:');
    console.log(files);
    res.redirect(303, '/thank-you');
  });
});
//":year", ":month" s路由参数

//jQuery文件上传(写注释不要总是在写是什么,而是写为什么!)
var jqupload = require('jquery-file-upload-middleware');

app.use('/upload', function(req, res, next) {
  var now = Date.now();
  jqupload.fileHandler({
    uploadDir: function(){
      return __dirname + '/public/uploads/' + now;
    },
    uploadUrl: function(){
      return 'up/uploads/' + now;
    },
  })(req, res, next);
});

//If sessions has flash object, add it into the context.
//After it show once, you should delete the flash, use the code below:
// app.use(function(req, res, next) {
//   //if flash, pass it to context, then delete it
//   res.locals.flash = req.session.flash;
//   delete req.session.flash;
//   next();
// });


//app.use是添加中间件的方法
//定制404页面 404 catch-all 处理器(中间件middleware)
app.use(function(req, res) {
  res.status(404);
  res.render('404');
  // res.type('text/plain');
  // res.send('404 - Not Found');
});

//定制500页面 500错误处理器(中间件)
app.use(function(err, req, res) {
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