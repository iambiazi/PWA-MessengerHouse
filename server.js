const { createServer } = require('http');
const path = require('path');
const next = require('next');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const jwtKey = require('./jwtpw');


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
            parsed._id = parsed.username;
            parsed.unread = [];
            User.create(parsed, (err, data) => {
              if (err) {
                res.statusCode = 422;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({status: 'user already exists'}));
              } else {
                const token = {
                  jwt: jwt.sign({
                    username: parsed.username,
                    status: 'logged in',
                  }, jwtKey),
                };
                res.writeHead(201, {
                  //TODO removed 'Secure;' for development
                  'Set-Cookie': `jwt=${JSON.stringify(token)}; HttpOnly`,
                  "Content-Type": "application/json",
                });
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
          if (record.length) {
            bcrypt.compare(parsed.password, record[0].password, (err, result) => {
              if (err || !result) {
                res.statusCode = 422;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify('error with login. Incorrect username/password combo'));
                return console.error(err);
              }
              const token = {
                jwt: jwt.sign({
                  username: parsed.username,
                  status: 'logged in',
                }, jwtKey),
              };
              res.writeHead(201, {
                //TODO removed 'Secure;' for development
                'Set-Cookie': `jwt=${JSON.stringify(token)}; HttpOnly`,
                "Content-Type": "application/json",
              });
              res.end(JSON.stringify({status: 'logged in'}));
            });
          } else {
            res.statusCode = 422;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify('error with login. Incorrect username/password combo'));
          }
        });
      });

  } else {
    if (req.url.startsWith('/browser') || req.url.startsWith('/messenger')) {
      if (req.headers.cookie) {
        const jwtCookie = req.headers.cookie.match(/jwt={"jwt":"(.*)"/);
        if (jwtCookie) {
          const decoded = jwt.verify(jwtCookie[1], jwtKey);
          if (decoded.status === 'logged in') {
            req.url = req.url.startsWith('/browser') ? '/browser' : '/messenger';
          } else {
            req.url = '/';
          }
        } else {
          req.url = '/';
        }
      } else {
        req.url = '/';
      }
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

  socket.on('unread', (username) => {
    if (username !== undefined) {
      User.findById({_id: username}, (err, result) => {
        if (err) {
          console.error(err);
        }
        result.unread.forEach(msg => {
          io.to(`${socketIds[username]}`).emit('message', JSON.parse(msg));
        });
        result.unread = [];
        result.save(result);
      });
    }
  });

  socket.on('message', (data) => {
    data.recipients.forEach(person => {
      if (socketIds[person]) {
        io.to(`${socketIds[person]}`).emit('message', data);
      } else {
        User.findById({_id: person}, (err, result) => {
          result.unread = [...result.unread, JSON.stringify(data)];
          result.save(result);
        });
      }
    });
});

  socket.on('typing', (data) => {
    data.recipients.forEach(person => {
      io.to(`${socketIds[person]}`).emit('typing', data.username);
    });
  });

  socket.on('disconnect', () => {
    //can create another storage object so we can have constant lookup, depennds if we want to
    // prioritize time or space
    for (let key in socketIds) {
      if (socketIds[key] === socket.id) {
        delete socketIds[key];
      }
    }
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
}).catch(err => console.error(err));

