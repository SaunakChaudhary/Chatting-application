/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from "react";
import { UserDataContext } from "../Context/context";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const token = localStorage.getItem("Token");

  const getUserData = async () => {
    const response = await fetch("https://chatting-application-backend-3wlj.onrender.com/api/auth/get-user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      setUser(data);
    } else {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }

    getUserData();
  }, [getUserData, token]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
