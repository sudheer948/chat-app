import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";

const ChatWindow = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const loggedInUser = useSelector((store) => store.user);
  const messagesEndRef = useRef(null);
  const loggedInUserId = loggedInUser._id;

  console.log(messages);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + userId, {
      withCredentials: true,
    });

    console.log(chat);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      console.log(senderId);
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        _id: senderId?._id,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, [userId]);

  useEffect(() => {
    if (!loggedInUserId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: loggedInUser.firstName,
      userId: loggedInUserId,
      targetUserId: userId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, userId }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, _id: userId },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [loggedInUserId, userId]);

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      userId: loggedInUserId,
      targetUserId: userId,
      text: newMessage,
    });

    setNewMessage("");
  };

  const fetchToUser = async () => {
    const res = await axios.get(BASE_URL + "/toUser/" + userId, {
      withCredentials: true,
    });
    console.log(res.data);
    setUser(res.data);
  };

  useEffect(() => {
    fetchToUser();
  }, [userId]);

  if (user === null)
    return <h1 className="text-2xl  text-center">No user found</h1>;

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Chat Header */}
      <div className="p-5 bg-white border-b flex items-center gap-3 shrink-0 animate-chat-header">
        <div className="w-11 h-11 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
          {user.firstName.charAt(0)}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Chat with {user.firstName}
          </h2>
          <p className="text-sm text-green-500">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-5 overflow-y-auto">
        {messages.map((msg, index) => {
          const { firstName, lastName, text, _id } = msg;

          return (
            <div
              key={index}
              className={`flex mb-4 ${
                loggedInUserId === _id
                  ? "justify-end animate-message-right"
                  : "justify-start animate-message-left"
              }`}
            >
              <div className="bg-white p-3 rounded-xl shadow-sm max-w-[75%] hover:shadow-md transition-shadow duration-300">
                {text}
              </div>
            </div>
          );
        })}

        {/* Auto-scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t animate-input-enter flex items-center gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 min-w-0 p-3 rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
        />

        <button
          onClick={sendMessage}
          className="px-6 py-3 rounded-lg text-white font-semibold
          bg-linear-to-r from-indigo-500 to-violet-600
        hover:from-indigo-600 hover:to-violet-700
          shadow-md hover:shadow-lg
          transition-all duration-300
          active:scale-95 shrink-0"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
