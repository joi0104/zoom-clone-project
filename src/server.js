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

wss.on("connection", (socket) => {
  console.log(socket);
});

server.listen(3000, () => {
  console.log("Listening on server");
});
