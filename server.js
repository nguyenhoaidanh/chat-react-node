const app = require('express')();
var express = require('express');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use('/upload', express.static(__dirname + '/upload'));
app.use('/', express.static('dist'));
app.use(cors());
let friends = [];
io.on('connection', socket => {
  console.log(socket.id, 'some one connect');
  let friend = {
    id: socket.id,
    name: socket.id
  };
  friends.push(friend);
  socket.on('SEND_TO_FRIEND', data => {
    io.emit('SEND_TO_FRIEND', data);
  });
  socket.on('SOME_ONE_TYPING', data => {
    socket.broadcast.emit('SOME_ONE_TYPING', data);
  });
  socket.on('GET_LIST_USER_ONLINE', () => {
    socket.emit('SET_LIST_USER_ONLINE', friends);
    socket.broadcast.emit('SET_LIST_USER_ONLINE', friends);
  });
  socket.on('SET_NAME', data => {
    for (var x of friends) if (x.id == data.id) x.name = data.name;
    socket.broadcast.emit('SET_LIST_USER_ONLINE', friends);
  });
  socket.on('disconnect', () => {
    friends = friends.filter(data => data.id !== socket.id);
    socket.broadcast.emit('SET_LIST_USER_ONLINE', friends);
    console.log(socket.id, ' is disconnet');
  });
});
function isArray(value) {
  return value && typeof value === 'object' && value.constructor === Array;
}
server.listen(process.env.PORT || 8000, () => {
  console.log('connected to port 8000!');
});
app.post('/sendFiles', function(req, res) {
  var files = isArray(req.files.files) ? req.files.files : [req.files.files];
  var promises = [];
  files.forEach(f => {
    var fName = '/upload/' + f.name;
    var pm = new Promise((resolve, reject) => {
      f.mv('.' + fName, function(err) {
        if (err) {
          res.status(200).send({err});
          reject(err);
        } else {
          console.log(fName);
          resolve(fName);
        }
      });
    });
    promises.push(pm);
  });
  Promise.all(promises).then(values => {
    res.status(200).send({err: 0, fileUrls: values});
  });
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
