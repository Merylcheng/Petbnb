import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { receiverId } = useParams();

  useEffect(() => {
    // console.log("Component mounted. Fetching messages...");

    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();
        console.log("Fetched messages:", data);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  //console receiver and sender
  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(
      "Sending message to receiverId:",
      receiverId,
      "with content:",
      newMessage
    );

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          receiver: receiverId,
          messageContent: newMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      console.log("Message sent:", data);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
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
