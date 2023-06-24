import React from "react";
import UniqueUserId from "./UniqueUserId";

const ChatHome = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Chats
          </h2>
          <UniqueUserId />
        </div>
      </div>
    </div>
  );
};

export default ChatHome;