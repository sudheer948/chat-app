import { useParams } from "react-router-dom";

const ChatWindow = () => {
  const { userId } = useParams();

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="p-5 bg-white border-b">
        <h2 className="text-lg font-semibold">Chat with User {userId}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="flex justify-start mb-4">
          <div className="bg-white p-3 rounded-xl shadow-sm">Hello!</div>
        </div>

        <div className="flex justify-end mb-4">
          <div className="bg-indigo-600 text-white p-3 rounded-xl">
            Hi! How are you?
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-3 rounded-lg bg-gray-100 outline-none"
        />
      </div>
    </div>
  );
};

export default ChatWindow;
