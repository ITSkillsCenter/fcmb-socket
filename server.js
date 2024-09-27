const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
  app.disable("x-powered-by");

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

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
