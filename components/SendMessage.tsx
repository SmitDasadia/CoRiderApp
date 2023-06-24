import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";

type Props = {};

function SendMessage({}: Props) {
  const [newMessage, setNewMessage] = useState<string>("");
  const handleMessageSubmit = () => {
    // Implement your logic to send the message to the backend or perform any desired action
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };
  return (
    <>
      <div className="fixed bottom-0 left-0 w-full p-3 flex bg-white pb-10 ">
        <div className="relative flex-grow bg-white ">
          <form action="">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Reply to @Rohit Yadav"
              className=" px-4 py-2 w-full pr-10 rounded-md focus:
              outline-none"
            />
            <button
              
              className="absolute right-0 top-0 bottom-0  text-black rounded-r-lg px-4 py-2 flex items-center"
            >
              <GrAttachment size={20} className="mr-14" />
            </button>

            <button
              onClick={handleMessageSubmit}
              className="absolute right-0 top-0 bottom-0  text-black rounded-r-lg px-4 py-2 flex items-center"
            >
              <AiOutlineSend size={20} className="mr-2" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SendMessage;
