import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { USER_API } from "../api/apis";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false);

  // user login
  const loginUser = async (email, navigate) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${USER_API}/login`, { email });
      // console.log(data)
      toast.success(data.message);
      localStorage.setItem("verifyToken", data?.verifyToken);
      navigate("/verify");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setBtnLoading(false);
    }
  };

  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyUser = async (otp, navigate) => {
    const verifyToken = localStorage.getItem("verifyToken");
    setBtnLoading(true);
    if (!verifyToken) {
      return toast.error("Please give token");
    }
    try {
      const { data } = await axios.post(`${USER_API}/verify`, {
        otp,
        verifyToken,
      });
      // console.log(data)
      toast.success(data.message);
      localStorage.clear();
      localStorage.setItem("token", data?.token);
      navigate("/");
      setIsAuth(true);
      setUser(data.user);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setBtnLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${USER_API}/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setIsAuth(true);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loginUser,
        btnLoading,
        verifyUser,
        isAuth,
        setIsAuth,
        user,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const UserData = () => useContext(UserContext);
