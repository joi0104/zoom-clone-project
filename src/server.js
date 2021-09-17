import http from "http";
import express from "express";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

// http 서버와 ws 서버가 둘다 작동
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser");
  socket.on("close", () => {
    console.log("Disconnected to Browser");
  });
  socket.on("message", (message) => {
    sockets.forEach((socketItem) => {
      socketItem.send(message.toString("utf8"));
    });
  });
  socket.send("hello from the server");
});

server.listen(3000, () => {
  console.log("Listening on server");
});
