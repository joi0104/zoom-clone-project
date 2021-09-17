const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const url = window.location.host;
const socket = new WebSocket(`ws://${url}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerHTML = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected to Server");
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
});
