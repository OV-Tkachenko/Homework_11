const p_chat = document.getElementById("id_chat");
const p_message_form = document.getElementById("id_message_form");
const p_message_input = document.getElementById("id_message_input");
const p_socket = new WebSocket("ws://localhost:8080");

p_socket.onopen = (e) => {
  console.log("Соединение успешно установлено.");
};

p_socket.onmessage = (event) => {
  const p_message = JSON.parse(event.data);
  const p_message_element = document.createElement("div");
  
  if (p_message.type === "system") {
    p_message_element.classList.add("system-message");
  }

  p_message_element.textContent = p_message.content;
  p_chat.appendChild(p_message_element);
  p_chat.scrollTop = p_chat.scrollHeight;
};

p_socket.onclose = (event) => {
  if (event.wasClean) {
    console.log(`Соединение закрыто чисто, код = ${event.code}, причина = ${event.reason}`);
  } else {
    console.log("Соединение прервано");
  }
};

p_socket.onerror = (error) => {
  console.log(`Ошибка: ${error.message}`);
};

p_message_form.onsubmit = (e) => {
  e.preventDefault();
  if (p_message_input.value) {
    const p_message = {
      type: "user",
      content: p_message_input.value,
    };
    p_socket.send(JSON.stringify(p_message));
    p_message_input.value = "";
  }
};