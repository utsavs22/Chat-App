const express = require('express')
const cors = require('cors')
const connectToMongo = require("./db");
const UserRoutes = require('./routes/UserRoutes')
const MessagesRoute = require('./routes/MessagesRoute')
const socket = require('socket.io')

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth",UserRoutes);
app.use("/api/messages",MessagesRoute);

connectToMongo();

const server = app.listen(process.env.PORT, () => {
    console.log(`ChatOp listening on Port ${process.env.PORT}`)
})

const io  = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials: true,
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (username) => {
        onlineUsers.set(username, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message)
        }
    });
});

