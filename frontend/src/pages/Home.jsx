import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../components/Header";
import { ChatData } from "../context/ChatContext";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import { IoMdSend } from "react-icons/io";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideber = () => {
    setIsOpen(!isOpen);
  };

  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    chats
  } = ChatData();

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  const messagecontainerRef = useRef();
  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  return (
    <div className="flex h-screen bg-gray-900 text-white ">
      <Sidebar toggleSideber={toggleSideber} isOpen={isOpen} />

      <div className="flex flex-1 flex-col">
        <button
          onClick={toggleSideber}
          className="md:hidden p-4 bg-gray-800 text-2xl"
        >
          <GiHamburgerMenu />
        </button>

        <div className="flex-1 p-6 mb-20 md:mb-0">
          <Header />
          {loading ? (
            <LoadingBig />
          ) : (
            <div
              ref={messagecontainerRef}
              className="flex-1 p-6 max-h-[600px] overflow-y-auto mb-auto md:mb-0 thin-scrollbar"
            >
              {messages && messages.length > 0 ? (
                messages.map((v, i) => {
                  return (
                    <div className="" key={i}>
                      <div className="mb-4 p-4 font-semibold rounded bg-blue-700 text-white flex gap-2">
                        <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                          <CgProfile />
                          {/* <img src="https://scontent.fdel14-2.fna.fbcdn.net/v/t39.30808-6/479533770_635181672240866_3464745486400155198_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=rxJ3RyEkU-cQ7kNvgHtdn5j&_nc_oc=AdiQHBPAQaZQPkhn6G5RJIqFzfcITPBuRSgSQq-Yd4Loz6HJvNfAuCbQIzPGAMbF9dA&_nc_zt=23&_nc_ht=scontent.fdel14-2.fna&_nc_gid=AAo-SDx_xiXDo21cZnuu6if&oh=00_AYB8hxCb3pBMbj1GOlmG4YwzAM9evkxxHO6c2q1UtRnmKg&oe=67BA36F2" className="h-12 w-12 rounded-full" alt="" /> */}
                        </div>
                        {v.question}
                      </div>
                      <div className="mb-4 p-4 rounded bg-gray-700 text-white flex gap-2">
                        <div className="bg-white p-2 rounded-full text-black text-2xl h-10">
                          <FaRobot />
                        </div>
                        <p
                          className="text-[17px] "
                          dangerouslySetInnerHTML={{ __html: v.answer }}
                        ></p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No Chat Yet</p>
              )}

              {newRequestLoading && <LoadingSmall />}
            </div>
          )}
        </div>
      </div>

      {
       chats && chats.lengts===0 ? "" : <div className="fixed bottom-0 right-0 left-auto p-4 bg-gray-900 w-full md:w-[75%] ">
        <form
          onSubmit={submitHandler}
          className="flex justify-center items-center"
        >
          <input
            type="text"
            placeholder="enter a prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-grow p-4 bg-gray-700 rounded-l text-white outline-none"
            required
          />
          <button className="p-4 cursor-pointer hover:text-blue-500 transform transition-all duration-300 bg-gray-700 rounded-r text-2xl text-white">
            <IoMdSend />
          </button>
        </form>
      </div>
      }
    </div>
  );
};

export default Home;
