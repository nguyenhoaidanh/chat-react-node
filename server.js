const app = require('express')();
var express=require('express');
const server = require('http').Server(app);
const io = require('socket.io')(server); 
const cors = require('cors'); 
const path = require('path'); 
app.use('/',express.static('dist'));
app.set('views', __dirname + '/dist');
app.set('view engine','ejs'); 
app.use(cors()); 
let friends = [];
let msg = []
io.on('connection', socket => {
    console.log(socket.id,'some one connect')
    let friend={id:socket.id,name:socket.id, src:'https://www.freshmorningquotes.com/wp-content/uploads/2015/11/cute-and-beautifull-girls-profile-pictures.jpg'}
    friends.push(friend);  
    socket.on('SEND_TO_FRIEND', (data) => {
        console.log(socket.id,data)
        io.emit('SEND_TO_FRIEND', data);
    });
    socket.on('GET_LIST_USER_ONLINE', () => {
        socket.emit('SET_LIST_USER_ONLINE', friends);
        socket.broadcast.emit('SET_LIST_USER_ONLINE', friends);
    });
    socket.on('disconnect', () => {
        friends = friends.filter(data => data.id !== socket.id); 
        socket.broadcast.emit('SET_LIST_USER_ONLINE', friends);
        console.log(socket.id,' is disconnet')
    });
});
server.listen(8000||process.env.PORT, () => console.log('connected to port 8000!'));

app.get('/', (req, res) => {
    console.log('connected to port 8000!')
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});