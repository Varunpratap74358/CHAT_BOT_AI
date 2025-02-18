import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { CHAT_API } from "../api/apis";
import toast from "react-hot-toast";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoading, setNewRequestLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [createLoad, setCreateLoad] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchResponse = async () => {
    if (prompt == "") return alert("Write Prompt");
    setNewRequestLoading(true);
    setPrompt("");
    try {
      const { data } = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyATezh4jxX0kkLeCIYyH0NT01byvf_r1Mk",
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
      });

      const message = {
        question: prompt,
        answer: data?.candidates[0]?.content?.parts[0]?.text,
      };

      setMessages((prev) => [...prev, message]);
      setNewRequestLoading(false);

      const res = await axios.post(
        `${CHAT_API}/${selected}`,
        {
          question: prompt,
          answer: data?.candidates[0]?.content?.parts[0]?.text,
        },
        { headers: { token: localStorage.getItem("token") } }
      );
    } catch (error) {
      alert("Somthing went wrong");
      console.log(error);
      setNewRequestLoading(false);
    }
  };

  const fetchChat = async () => {
    try {
      const { data } = await axios.get(`${CHAT_API}/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      // console.log(data);
      setChats(data);
      setSelected(data[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

  const createChat = async () => {
    setCreateLoad(true);
    try {
      const { data } = await axios.post(
        `${CHAT_API}/new`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      fetchChat();
      setCreateLoad(false);
    } catch (error) {
      console.log(error);
      setCreateLoad(false);
      toast.error("Somthing went wrong");
    }
  };

  const delteChat = async (id) => {
    try {
      const { data } = await axios.delete(`${CHAT_API}/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      fetchChat();
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${CHAT_API}/${selected}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMessages(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [selected]);
  return (
    <ChatContext.Provider
      value={{
        fetchResponse,
        messages,
        prompt,
        setPrompt,
        newRequestLoading,
        chats,
        createChat,
        createLoad,
        delteChat,
        setSelected,
        selected,
        loading,
        setLoading,
        fetchChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatData = () => useContext(ChatContext);
