import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
const socket = io.connect("http://localhost:4000");

function Client2() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  function sendMessage() {
    if (message.trim() !== "") { 
      socket.emit("send_message", { message });
      setMessage(""); 
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, []);

  return (
    <div className="container">
      <h1>Client 2</h1>
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

export default Client2;
