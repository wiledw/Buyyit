import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import io from 'socket.io-client';
import "./Home.css";

export default function Home() {
  const { user } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState({ message: '' });
  const [messages, setMessages] = useState([]); // Use state to store messages

  useEffect(() => {
    if (user) { // Only proceed if user is not null
      const socketInstance = io('http://localhost:3000');
      setSocket(socketInstance);
    
      socketInstance.on('connect', () => {
        console.log('Connected to server');
        appendMessage('You joined the room', user.name);
        socketInstance.emit('new-user', user.name); // Now safe to use user.name
      });

      socketInstance.on('chat-message', data => {
        appendMessage(`${data.name}: ${data.message}`, data.name);
      });

      socketInstance.on('user-connected', name => {
        appendMessage(`${name} connected`, name);
      });

      socketInstance.on('user-disconnected', name => {
        appendMessage(`${name} disconnected`, name);
      });

      return () => {
        if (socketInstance) {
          socketInstance.disconnect();
        }
      };
    }
  }, [user]); // Add user as a dependency

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = data.message;
    const clientName = user.name;

    if (socket && message) {
      socket.emit('send-chat-message', message);
      appendMessage(`You: ${message}`, clientName); // Show your own messages too
      setData({message: ''});
    }
  };

  const appendMessage = (text, sender) => {
    console.log(sender);
    setMessages(prevMessages => [...prevMessages, { text, sender }]);
  };

  return (
    <div className="page-container">
      <div>
        <h1>Welcome to Buyyit</h1>
      </div>
      <div id="chatbox">
      {user && (
        <div id="chat-container">
           <div id="message-container">
           {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender === user.name ? 'own-message' : 'other-message'}`}>
                {message.text}
              </div>
            ))}
          </div>
            <form id="send-container" onSubmit={handleSubmit}>
              <input type="text" id="message-input" placeholder="Enter message..." 
                value={data.message} onChange={(e) => setData({...data, message: e.target.value})}/>
              <button type="submit" id="send-button">Send</button>
            </form>
          </div>
      )}
      </div>
    </div>
  );
}
