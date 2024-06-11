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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/images/pet4.jpg')` }}
    >
      <div className="max-w-md w-full bg-indigo bg-opacity-90 shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold text-center mb-4 text-indigo-600">
          ChatBox
        </h1>

        <ul className="space-y-4">
          {messages.map((message) => (
            <li key={message._id} className="p-3 bg-gray-100 rounded-md">
              <strong className="text-blue-500">{message.sender.name}:</strong>{" "}
              {message.messageContent}
            </li>
          ))}
        </ul>
        <form onSubmit={sendMessage} className="mt-4 flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
