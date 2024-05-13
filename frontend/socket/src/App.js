import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css"; // Import custom CSS for styling

const socket = io.connect("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  function sendMessage() {
    if (message.trim() !== "") { // Check if the message is not empty or whitespace
      socket.emit("send_message", { message });
      setMessage(""); // Clear the input after sending the message
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, []);

  return (
    <div className="container">
      <h1>Client 1</h1>
      <div className="message-container">
        <input
          className="message-input"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
      <div className="received-message">
        <h2>Message Received:</h2>
        <p>{messageReceived}</p>
      </div>
    </div>
  );
}

export default App;
