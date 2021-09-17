alert("hi");

const url = window.location.host;
const socket = new WebSocket(`ws://${url}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("Just got this: ", message.data, " from the server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected to Server");
});

setTimeout(() => {
  socket.send("hello from browser");
}, 10000);
