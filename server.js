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
    console.log('obj key', socketIds);
    return callback(null, true);
  });
};

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (data) => {
    console.log('this is the data', data);
    //TODO CURRENTLY GOES TO EVERYONE
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
  // TODO nothing happening in here currently
};

socketioAuth(io, { authenticate, postAuthenticate });

app.prepare().then((_) => {

  server.listen(PORT, (err) => {
    if (err) throw err;

    console.log(`> App running on port ${PORT}`);
  });
});

// const webPush = require('web-push');
//
// const pushSubscription =
//   {"endpoint":"https://fcm.googleapis.com/fcm/send/egwIrPtGzjc:APA91bEmT81SCIIVbIP_AZaOB7bBwNzF7gMHeWgogVd-yQwAHpLI7rwUUNhSU2N0MpJwlY4a5gTa2GoN9BprehMybHzSjx8kBjtY6upDqbIZ9tonOt8IRRYdPstF8w4efsyzeEBHLBtY","expirationTime":null,"keys":{"p256dh":"BDmXGZtf1htvW1vY8Sx1J6PO72r-qRXbEJj5OZ_wFNFsEbdxKJDK0qJUK-Oz9VBDccY_RkxgXgVTZyfB9MnBnBk","auth":"d3mkpdOSNVnh_ckn7yRQ_Q"}}
// ;
//
// const {vapidPublicKey, vapidPrivateKey} = {"vapidPublicKey":"BK2bVrhDYDa8ootGXO09FWiE4uP75Qp51kRnFDFDlebFw_M8GEkG9H-47l4LMAraM3Su8hxcQU4RmRV7U9cCH-s","vapidPrivateKey":"cbjT6lyHNf6fBxV_pYEAHsLEnKirML2Ac0n2PBR9dmY"};
//
//
// const payload = 'Here is a payload!';
//
// const options = {
//   // gcmAPIKey: 'AAAAmYspKZ8:APA91bHQazB2CJd_QR3U-O4JNu2fbkZWNo-sENzOKUZ5X7Ug1HO_UzJ1wUX_ZvJ72NQErk6qQewuQeWeeuhtVYgO3zDsein5f0vFWTamc2S-vKre_6IbyGhk1nEtVQxI8s7x0_GkT7tX',
//   TTL: 60,
//   vapidDetails: {
//     subject: 'mailto: brianalouie@gmail.com',
//     publicKey: vapidPublicKey,
//     privateKey: vapidPrivateKey
//   }
//
// };
//
// webPush.sendNotification(
//   pushSubscription,
//   payload,
//   options
// );
