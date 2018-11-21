const { createServer } = require('http');
const path = require('path');
const next = require('next');



const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

const messages = [];



app.prepare().then((_) => {
  const server = createServer((req, res) => {
    if (req.url === '/sw.js' || req.url.startsWith('/precache-manifest')) {
      app.serveStatic(req, res, path.join(__dirname, '.next', req.url));
    } else {
      handle(req, res);
    }
  });


  server.listen(PORT, (err) => {
    if (err) throw err;

    console.log(`> App running on port ${PORT}`);
  });

  const io = require('socket.io').listen(server);

  io.on('connection', socket => {
    console.log('a user connected');
    socket.on('message', data => {
      console.log('this is the data', data);
      messages.push(data);
      socket.broadcast.emit('message', data);
    })
  });
});



// const app = require('express')()
// const server = require('http').Server(app)
//
// const next = require('next')
// const http = require('http')
//
// const dev = process.env.NODE_ENV !== 'production'
// const nextApp = next({ dev })
// const nextHandler = nextApp.getRequestHandler()
//
// // fake DB
// const messages = []
//
// // socket.io server
//
//
//
// nextApp.prepare().then(() => {
//   app.get('/messages', (req, res) => {
//     res.json(messages)
//   })
//
//   app.get('*', (req, res) => {
//     return nextHandler(req, res)
//   })
//
//   server.listen(3000, (err) => {
//     if (err) throw err
//     console.log('> Ready on http://localhost:3000')
//   })
//
//   const io = require('socket.io').listen(server)
//
//   io.on('connection', socket => {
//     socket.on('message', (data) => {
//       messages.push(data)
//       socket.broadcast.emit('message', data)
//     })
//   })
//
// })
