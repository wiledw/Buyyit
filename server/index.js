const express = require('express');
const io = require('socket.io')(3000, {
    cors: "http://localhost:3000",
    methods:["GET", "POST"],
},);
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database Connected"))
.catch(() => console.log("Database failed to connect", err))

// middleware
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '2mb', extended: true }));
var corsOptions = {
    origin: ['https://wiledw.github.io/buyyit'], // Your allowed origins
    credentials: true, // This allows cookies and credentials to be included in the requests
};

app.use(cors(corsOptions));


app.use('/', require('./routes/authRoutes'))
app.use((err, req, res, next) => {
    if (err.type === 'entity.too.large') {
        return res.status(413).json({ error: 'Payload too large' });
    }

    next(err);
});

const users = {}
// Socket.io implementation
io.on('connection', (socket) => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { 
            message : message,
            name: users[socket.id]
        });
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})


const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))
