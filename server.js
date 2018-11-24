const { createServer } = require('http');
const path = require('path');
const next = require('next');
const bcrypt = require('bcrypt');

const saltRounds = 10;


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  if (req.url === '/sw.js' || req.url.startsWith('/precache-manifest')) {
    app.serveStatic(req, res, path.join(__dirname, '.next', req.url));
  } else if (req.url === '/signup' && req.method === 'POST') {
    let body = [];
    req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        const parsed = JSON.parse(body);
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(parsed.password, salt, function(err, hash) {
            parsed.password = hash;
            console.log(parsed);
            User.create(parsed, (err, data) => {
              if (err) {
                res.statusCode = 422;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify('user already exists'));
              } else {
                res.statusCode = 201;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({status: 'logged in'}));
              }
            });
          });
        });
      });
  } else if (req.url === '/login' && req.method === 'POST') {
    let body = [];
    req
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(body);
        const parsed = JSON.parse(body);
        User.find({username: parsed.username}, (err, record) => {
          if (err) {
            res.statusCode = 422;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify('error with login. Incorrect username/password combo'));
            return console.error(err);
          }
          console.log('jack says label this', parsed);
          console.log('another', record);
          bcrypt.compare(parsed.password, record[0].password, (err, result) => {
            if (err || !result) {
              res.statusCode = 422;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify('error with login. Incorrect username/password combo'));
              return console.error(err);
            }
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({status: 'logged in'}));
          });
        });
      });

  } else {
    handle(req, res);
  }
});

const io = require('socket.io').listen(server);
const socketioAuth = require('socketio-auth');
const { User } = require('./User');

const authenticate = (client, data, callback) => {
  // const { username, password } = data;
  // User.find({ username, password }, (err, user) => {
  //   if (err || !user) {
  //     console.log('error finding user');
  //     return callback((new Error('user not found or dup')));
  //   }
    // TODO missing password check conditional logic here
    return callback(null, true);
  // });
};

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (data) => {
    console.log('this is the data', data);
    //TODO CURRENTLY GOES TO EVERYONE
    socket.broadcast.emit('message', data);
  });
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const postAuthenticate = (socket, data) => {
  socket.emit('test', data);
  // TODO nothing happening in here currently
};

socketioAuth(io, { authenticate, postAuthenticate });

app.prepare().then((_) => {


  server.listen(PORT, (err) => {
    if (err) throw err;

    console.log(`> App running on port ${PORT}`);
  });
});
