/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import SendMessage from "@/components/SendMessage";
import ChatFromUserId from "@/components/ChatFromUserId";
import Header from "@/components/Header";

const Chat = () => {
  const { userId } = useRouter().query;

  return (
    <div className="container">
      <Header />

      {typeof userId === "string" && (
        <>
          <div className="pt-32 pb-32">
            <ChatFromUserId userId={userId} />
          </div>
        </>
      )}

      <SendMessage />
    </div>
  );
};

export default Chat;
