require('dotenv').config()

// Declarations
import express from "express"
import morgan from "morgan";
import shortid from "shortid";

// export/environment
const app = express();
const port = process.env.PORT || 4000;

// socket mount
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// morgan
app.use(morgan('combined'));

// Create a Room
app.get("/room/create", (req, res) => {
    var id = shortid.generate();
    res.json({"roomID": id});
})

io.on('connection', (data: any) => {
    var socket = data.socket;

    // join room
    socket.on('join', (data: any) => {
        let room = data.roomID;

        socket.join(data.room);
        io.to(data.room).emit({"user-joined": socket.id});
    })

    // signalling
    socket.on('signal', (data: any) => {
        let room = data.roomID;
        let message = data.message;

        io.to(room).emit('signal', socket.id, message);       
    })

    // leave room
    socket.on('disconnecting', (data: any) => {
        io.to(data.roomID).emit('disconnected', socket.id)
    })
})

// START
http.listen(port, () => {
    console.log('Listening on ' + port)
});
