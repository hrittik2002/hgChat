import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import './App.css';
const socket = io('http://localhost:8000' , { transports: ['websocket'] });

interface Message {
  user: string;
  content: string;
}
function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.emit("message", "test from client");
    socket.on('message', (data: Message) => {
      console.log(data)
      //setMessages((prevMessages) => [...prevMessages, data]);
    });



    // Clean up the socket connection on component unmount
    // return () => {
    //   socket.disconnect();
    // };
  }, [socket]);

  const sendMessage = () => {
    // Emit a 'message' event to the server
    console.log(inputMessage)
    socket.emit("message", inputMessage);
    setInputMessage('');
  };
  return (
    <div className="App">
      {/* <ul>
        {messages.map((msg, index) => (
          <li key={index}>{`${msg.user}: ${msg.content}`}</li>
        ))}
      </ul> */}
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
