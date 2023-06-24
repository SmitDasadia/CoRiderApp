/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiArrowLeft, FiEdit } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import router from "next/router";

type Props = {};

interface ApiResponse {
  from: string;
  message: string;
  name: string;
  status: string;
  to: string;
}

const Header: React.FC<Props> = (props) => {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get(
        `https://qa.corider.in/assignment/chat?page=0`
      );

      const res: ApiResponse = response.data;
      setData(res);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  

  const handleEditIconClick = () => {
    // Handle edit icon click
  };

  return (
    <>
      {data && (
        <div className="mx-auto p-3 pt-4 border-b-2 w-full sticky top-0 bg-white z-50">
          <div className="flex items-center justify-between mb-4 ">
            <div className="flex items-center">
              <button
                className="bg-transparent text-black rounded-md p-2 focus:outline-none"
                onClick={()=>{
                    router.push("/")
                }}
              >
                <FiArrowLeft className="text-2xl" />
              </button>
              <h2 className="text-2xl font-bold ml-2">{data.name}</h2>
            </div>
            <button
              className="bg-transparent text-gray-500 hover:text-gray-800 rounded-full p-2 focus:outline-none"
              onClick={handleEditIconClick}
            >
              <FiEdit className="text-2xl text-black" />
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center mb-4">
              <div className="ml-2">
                <img
                  src="data:image/png;base64,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"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="ml-6">
                <p className="text-gray-500 mb-1">
                  From{" "}
                  <span className="text-lg font-bold text-black">
                    {data.from}
                  </span>
                </p>
                <p className="text-gray-500 mb-1">
                  To{" "}
                  <span className="text-lg font-bold text-black">
                    {data.to}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <button className="bg-transparent text-black p-2 focus:outline-none">
                <BsThreeDotsVertical className="text-2xl" />
              </button>
            </div>
          </div>


        </div>
      )}
    </>
  );
};

export default Header;
