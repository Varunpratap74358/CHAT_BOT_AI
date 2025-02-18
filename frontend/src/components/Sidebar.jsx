import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { ChatData } from "../context/ChatContext";
import { MdDelete } from "react-icons/md";
import { LoadingSpinner } from "./Loading";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Sidebar = ({ toggleSideber, isOpen }) => {
  const { chats, createChat, createLoad, delteChat, setSelected } = ChatData();
  const {logoutFunction} = UserData();
  const navigate = useNavigate();

  const deleteChatConfirm = (id) => {
    if (confirm("ae you sure you want to delete this chat")) {
      delteChat(id);
    }
  };

  const logoutHandler=()=>{
    logoutFunction(navigate)
  }

  const clickEvent=(id)=>{
    setSelected(id)
    toggleSideber();
  }

  return (
    <div
      className={`fixed inset-0 bg-gray-800 p-4 transition-transform transform md:relative md:translate-x-0 md:w-1/4 md:block ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        onClick={toggleSideber}
        className="md:hidden p-2 mb-4 bg-gray-700 rounded text-2xl"
      >
        {" "}
        <IoIosCloseCircle />{" "}
      </button>

      <div className="text-2xl font-semibold mb-6"><span className="underline text-[#4ad214a7]">Varun</span> ChatBot</div>
      <div className="mb-4">
        <button
          onClick={createChat}
          className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded"
        >
          {createLoad ? <LoadingSpinner /> : "New Chat +"}
        </button>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-2">Recent</p>

        <div className="max-h-[500px] overflow-auto mb-20 md:mb-0 thin-scrollbar">
          {chats && chats.length === 0 ? (
            <p>No chats yet</p>
          ) : (
            chats.map((v, i) => (
              <button
                key={i}
                onClick={() => clickEvent(v._id)}
                className="w-full text-left py-2 px-2 bg-gray-700 hover:bg-gray-600 rounded mt-2 flex justify-between items-center"
              >
                <span>{v.latestMessage.slice(0, 38)}...</span>
                <button
                  onClick={() => deleteChatConfirm(v._id)}
                  className="bg-red-600 text-white text-xl px-3 py-1 cursor-pointer rounded-md hover:bg-red-700"
                >
                  <MdDelete />
                </button>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="absolute bottom-0 mb-6 w-full">
        <button onClick={logoutHandler} className="bg-red-600 cursor-pointer text-white text-xl px-3 py-2 rounded-md hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
