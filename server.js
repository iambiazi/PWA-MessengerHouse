const { createServer } = require('http');
const path = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  if (req.url === '/sw.js' || req.url.startsWith('/precache-manifest')) {
    app.serveStatic(req, res, path.join(__dirname, '.next', req.url));
  } else {
    handle(req, res);
  }
});

const io = require('socket.io')(server);
io.on('connection', socket => {
  console.log('a user connected');
  socket.on('message', data => {
    console.log('this is the data', data);
    socket.broadcast.emit('message', data);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.prepare().then((_) => {



  server.listen(PORT, (err) => {
    if (err) throw err;

    console.log(`> App running on port ${PORT}`);
  });

});



