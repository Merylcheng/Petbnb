import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { receiverId } = useParams();
  console.log(receiverId);
  useEffect(() => {
    console.log("Fetching messages...");
    fetch("/api/messages", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched messages:", data);
        setMessages(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the messages!", error);
      });
  }, []);

  //console.log receiver and sender
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(
      "Sending message to receiverId:",
      receiverId,
      "with content:",
      newMessage
    );

    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        receiver: receiverId,
        messageContent: newMessage,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Message sent:", data);
        setMessages([...messages, data]);
        setNewMessage("");
      })
      .catch((error) => {
        console.error("There was an error sending the message!", error);
      });
  };

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <strong>{message.sender.name}:</strong> {message.messageContent}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Messages;
