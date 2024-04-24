// Client1.js

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  function sendMessage() {
    socket.emit("send_message", { message });
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, []);

  return (
    <div>
      <h1>Client 1</h1>
      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send message</button>
      <h2>Message Received: {messageReceived}</h2>
    </div>
  );
}

export default App;

// import { useEffect, useState } from "react";
// import io from "socket.io-client";
// const socket = io.connect("http://localhost:4000");

// function App() {
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");
//   function sendMessage() {
//     console.log("Button clicked");
//     socket.emit("send_message", { message: message });
//   }
//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageReceived(data.message);
//     });
//   }, [socket]);

//   return (
//     <div className="App">
//       <input
//         placeholder="Message"
//         onChange={(e) => {
//           setMessage(e.target.value);
//         }}
//       />
//       <button onClick={sendMessage}>Send message</button>
//       <h1>
//         Message: {messageReceived}</h1>
//     </div>
//   );
// }

// export default App;
