/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

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

interface ChatData {
  chats: Chat[];
  from: string;
  message: string;
  name: string;
  status: string;
  to: string;
}

const UniqueUserId = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [api, setApi] = useState<ChatData[]>([]);

  const [userIds, setUserIds] = useState<string[]>([]);
  useEffect(() => {
    fetchChatData();
  }, []);

  const fetchChatData = async () => {
    try {
      const response = await axios.get(
        `https://qa.corider.in/assignment/chat?page=0`
      );
      const data: ChatData[] = response.data;
      const chats: Chat[] = response.data.chats;
      const uniqueUserIds: string[] = [];
      chats.forEach((chat) => {
        if (!uniqueUserIds.includes(chat.sender.user_id)) {
          uniqueUserIds.push(chat.sender.user_id);
        }
      });
      setUserIds(uniqueUserIds);
      setApi(data);
      setChats(chats);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {userIds.map((userId) => {
          const chatWithImage = chats.find(
            (chat) => chat.sender.user_id === userId
          );

          if (chatWithImage) {
            return (
              <Link
                passHref
                key={userId}
                href={`/chats/${userId}`}
                legacyBehavior
              >
                <div className="flex items-center p-3 bg-white  cursor-pointer hover:scale-105">
                  <img
                    src={chatWithImage.sender.image}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div className="flex flex-col">
                    <p className="font-medium text-lg truncate hover:text-clip sm:w-auto w-32">
                      {userId}
                    </p>
                    {chatWithImage.sender.self == true && <p>Self</p>}
                  </div>
                </div>
              </Link>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default UniqueUserId;
