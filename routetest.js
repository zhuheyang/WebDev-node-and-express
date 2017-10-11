//各个路由会有什么不同, 客户端会看到什么, 控制台会输出什么?
var app = require('express')();

app.use(function (req, res, next) {
  console.log('\n\nALLWAYS');
  next();
});
app.get('/a', function (req, res) {
  console.log('/a: router ends');
  res.send('a');
});
app.get('/a', function (req, res) {
  console.log('/a: never called');
});


app.get('/b', function (req, res, next) {
  console.log('/b: router not terminates');
  next();
});
app.use(function (req, res, next) {
  console.log('SOMETIMES');
  next();
});
app.get('/b', function (req, res, next) {
  console.log('/b(part 2): throw error');
  throw new Error('b fails');
});
app.use('/b', function (err, req, res, next) {
  console.log('/b detect the error and passes ');
  next(err);
});


app.get('/c', function (err, req) {
  console.log('/c: throw error');
  throw new Error('c fail');
});

app.use('/c', function (err, req, res, next) {
  console.log('/c: detects err but does not pass');
  next();
});

//检测到'/c'请求中的未处理错误, 结果是500.
app.use(function (err, req, res, next) {
  console.log('detect unhandled error: ' + err.message);
  res.send('500 - server error');
});

//检测到'/b'请求中未能寻找到的错误,结果是404.
app.use(function (req, res) {
  console.log('unhandled router');
  res.send('404 - unfounded');
});

app.listen(3000, function () {
  console.log('monitoring port 3000');
});
