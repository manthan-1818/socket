const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
// });
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });
io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);
  
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});
server.listen(4000, () => {
  console.log("listening on *:4000");
});

// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const path = require("path"); // Import the path module
// const indexPath = path.join(__dirname, "./public/index.html");
// const cors = require("cors");
// const axios = require("axios");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(
//   server,
//   {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST", "DELETE", "PATCH"],
//     },
//   },
//   { transports: ["websocket"] }
// );

// app.use(cors());

// io.on("connection", (socket) => {
//   console.log("A server connected");

//   // Listen for messages from clients
//   socket.on("chat message", (msg) => {
//     console.log("Messsssage:", msg);
//     // Broadcast the message to all connected clients
//     io.emit("chat message", msg);
//     console.log("chat message", msg);
//   });

//   // Listen for disconnection
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });
// const port = 5000;
// server.listen(port, () => {
//   console.log("Server is running on http://localhost:4000");
// });

// // app.get('/', async (req, res) => {
// //   try {
// //     // Fetch data from external API after 5 seconds delay
// //     await new Promise(resolve => setTimeout(resolve, 5000));
// //     const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
// //     res.send(response.data); // Handle the fetched data
// //   } catch (error) {
// //     console.error('Error fetching data:', error);
// //     res.status(500).send('Error fetching data');
// //   }
// // });

// // app.use(cors({
// //   origin: '*',
// //   methods: ['GET', 'POST']
// // }));

// // Enable CORS for all origins
