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
        const parsed = JSON.parse(body);
        User.find({username: parsed.username}, (err, record) => {
          if (err) {
            res.statusCode = 422;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify('error with login. Incorrect username/password combo'));
            return console.error(err);
          }
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
    if (req.url.startsWith('/browser')) {
      req.url = '/browser';
    }
    handle(req, res);
  }
});

const io = require('socket.io').listen(server);
const socketioAuth = require('socketio-auth');
const { User } = require('./User');
const socketIds = {};

const authenticate = (client, data, callback) => {
  const { username } = data;
  User.find({ username }, (err, user) => {
    if (err || !user) {
      console.log('error finding user');
      return callback((new Error('user not found or dup')));
    }
    socketIds[username] = client.id;
    return callback(null, true);
  });
};

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (data) => {
    data.recipients.forEach(person => {
      io.to(`${socketIds[person]}`).emit('message', data);
    });
});

  socket.on('typing', (data) => {
    data.recipients.forEach(person => {
      io.to(`${socketIds[person]}`).emit('typing', data.username);
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const postAuthenticate = (socket, data) => {
  // TODO optional space to add additional logic
};

socketioAuth(io, { authenticate, postAuthenticate });

app.prepare().then((_) => {

  server.listen(PORT, (err) => {
    if (err) throw err;

    console.log(`> App running on port ${PORT}`);
  });
});

