const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("a user connected: " + socket.id);

    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log("User joined room: " + room);
    });

    socket.on("sendMessage", (data) => {
        io.to(data.room).emit("message", data.message);
        console.log('Message sent')
    });

    socket.on("disconnect", () => {
        console.log("user disconnected: " + socket.id);
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
