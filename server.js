const express = require("express");
const app = express();


const io = require('socket.io')(server)
// const server = require("server");
var http = require('http');
var server = http.Server(app);
const { v4: uuidv4 } = require('uuid');

app.set('view engine', 'ejs');




app.use(express.static('public'))





app.get('/', (req, res) => {
    // res.status(200).send("hello world");
    res.redirect(`/${uuidv4()}`)
    // console.log(roomId)
})





app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
    // console.log(roomId)
})


// io.on('connection', socket => {
//     socket.on('join-room', () => {
//         console.log("we have joined the room")
//     })
// })


server.listen(8000, function () {
    console.log('VideoCall server running');
});