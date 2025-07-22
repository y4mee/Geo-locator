const express = require("express");
const socketIo = require("socket.io");
const app = express();
const http = require("http");
const path = require("path");

const server = http.createServer(app);
const io = socketIo(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  console.log("A user connected");

  socket.on("disconnect", () => {

    io.emit("user-disconnected", { id: socket.id });
    console.log("A user disconnected");
    
  });
   
});

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(3001);
