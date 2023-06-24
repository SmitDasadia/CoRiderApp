/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Chat {
  id: string;
  message: string;
  sender: {
    image: string;
    is_kyc_verified: boolean;
    self: boolean;
    user_id: string;
  };
  time: string;
}

interface ApiResponse {
  chats: Chat[];
}

interface Props {
  userId: string;
}

function ChatFromUserId({ userId }: Props) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMoreChats, setHasMoreChats] = useState<boolean>(true);

  useEffect(() => {
    fetchChats();
  }, [userId]);

  const fetchChats = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        `https://qa.corider.in/assignment/chat?page=0`
      );
      const data = response.data.chats;
      const userChats: Chat[] = data.filter(
        (chat: Chat) => chat.sender.user_id === userId
      );
      setChats(userChats);
      setPage((prevPage) => prevPage + 1);
      setHasMoreChats(userChats.length > 0);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight && hasMoreChats) {
      fetchChats();
    }
  };

  return (
    <>
      <div
        className="max-w-full sm:max-w-full p-4 overflow-y-auto"
        onScroll={handleScroll}
      >
        {chats.map((chat) => (
          <>
            <div>
              <div className="w-full flex items-center justify-center m-3">
                <div className="w-full flex  h-[0.9px] bg-gray-200"></div>
                <p className="text-[14px] text-[#B7B7B7] text-center w-[500px]">
                  {chat.time}
                </p>
                <div className="w-full flex  h-[0.9px] bg-gray-200"></div>
              </div>

              <div
                key={chat.id}
                className={`flex mb-4  ${
                  chat.sender.self ? "justify-end" : "justify-start"
                }`}
              >
                {!chat.sender.self && (
                  <img
                    src={chat.sender.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-4"
                  />
                )}
                <div
                  className={`p-3 rounded-lg shadow-md ${
                    chat.sender.self ? "bg-[#0072F5] text-white" : "bg-white"
                  } ${
                    chat.sender.self ? "rounded-br-none" : "rounded-tl-none"
                  }`}
                >
                  <p
                    className={`${
                      chat.sender.self ? "text-right" : "text-left"
                    }`}
                  >
                    {chat.message}
                  </p>
                  <p
                    className={`text-xs ${
                      chat.sender.self ? "text-right" : "text-left"
                    }`}
                  >
                    {chat.time}
                  </p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="flex justify-end">
        <div className=" p-3 rounded-lg shadow-md bg-[#0072F5] text-white rounded-br-none max-w-[90%] mr-4">
          <p className="text-left">
            Connect with fellow travelers, share the ride and save money Connect
            with fellow travelers, share the ride and save money
          </p>
        </div>
      </div>

      
    </>
  );
}

export default ChatFromUserId;
