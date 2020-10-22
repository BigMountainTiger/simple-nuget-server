const express = require('express');
const http = require('http');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(function (req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

app.get('/', async (req, res) => {

  const text = await new Promise( (res, rej) => {

    setImmediate(() => {
      res(`Hello world - ${req.query.id}`);
    })
  });

  res.send(text);
});
 
http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});