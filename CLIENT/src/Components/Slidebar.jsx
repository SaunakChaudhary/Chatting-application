/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { SocketContext } from "../Context/socketContext";

const Slidebar = ({ setClickedUser }) => {
  const { onlineUsers } = useContext(SocketContext);

  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");

  useEffect(() => {
    const fetchUsersExceptLoggedin = async () => {
      const response = await fetch("https://chatting-application-backend-3wlj.onrender.com/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUserData(data);
      }
    };

    fetchUsersExceptLoggedin();
    
  }, [token]);

  const handleLogout = () => {
    // Remove the token from localStorage and redirect
    localStorage.removeItem("Token");
    navigate("/login");
  };

  return (
    <aside className="fixed h-screen w-64 bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-700 p-4 shadow-[5px_5px_0px_#ff0055]">
      <h2 className="text-2xl font-bold mb-6 font-neobrutal">Chats</h2>
      <ul className="space-y-4">
        {userData.map((user, idx) => {
          return (
            <li
              key={idx}
              className="flex items-center gap-4 text-medium p-3 bg-gray-100 dark:bg-gray-700 rounded border-2 border-black dark:border-gray-600 shadow-[3px_3px_0px_#00aaff] hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => setClickedUser(user._id)}
            >
              <img
                src={user.avatarUrl}
                alt="Avatar"
                className="w-10 h-10 rounded-full border-4 border-black dark:border-gray-600 shadow-[1px_1px_0px_#ff0055]"
              />
              {onlineUsers.includes(user._id) && (
                <span className="relative right-7 bottom-3 bg-green-500 w-2 h-2 rounded-full shadow-[1px_1px_0px_#7CFC00]"></span>
              )}
              {user.username}
            </li>
          );
        })}
      </ul>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full mt-6 flex items-center gap-2 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-medium shadow-[3px_3px_0px_#00aaff]"
      >
        <i className="ri-logout-box-line text-xl"></i> Logout
      </button>
    </aside>
  );
};

export default Slidebar;
