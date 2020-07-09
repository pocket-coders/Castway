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

io.on('connection', (socket: any) => {
    // trying to join room
    socket.on('join', (roomID: string) => {
        socket.join(roomID);
        io.to(roomID).emit({"connected": socket});
    })

    // on disconnect
    socket.on('disconnecting', () => {
        const rooms = Object.keys(socket.rooms);
        for (const roomID in rooms) {
            io.to(roomID).emit({"disconnected": socket})
        }
    })
})

// START
http.listen(port, () => {
    console.log('Listening on ' + port)
});
