// src/app.ts
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

const app = express();
const port = 8000;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
//app.use(cors());

// Set up Socket.io connection
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on("connection", (socket: Socket) => {
  console.log("Connected to socket.io");

  // Example: Send a welcome message to the connected user
  socket.emit("message", "Welcome to the chat!");

  // Example: Listen for messages from the client
  socket.on("message", (msg : any) => {
    console.log("Message from client:", msg);

    // Example: Broadcast the received message to all connected clients
    io.emit("message", msg);
  });

  // Example: Listen for disconnection
//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
});

/**
 * Here it will be server.listen instead of app.listen or app.get
 */
// app.get("/", (req, res) => {
//   res.send("Hello, Express with TypeScript!");
// });
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
