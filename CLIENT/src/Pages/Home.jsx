import { useContext, useRef, useState } from "react";
import Slidebar from "../Components/Slidebar";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { SocketContext } from "../Context/socketContext";

const Home = () => {
  const [clickedUser, setClickedUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const latestMessageRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const [UserDataOfReceiver, setUserDataOfReceiver] = useState({});

  const token = localStorage.getItem("Token");

  useEffect(() => {
    const getUserDataOfReceiver = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/getUsers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: clickedUser }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUserDataOfReceiver(data.userDetails);
        } else {
          toast.error(data.message || "Failed to send message.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again." + error);
      }
    };
    if (clickedUser) getUserDataOfReceiver();
  }, [clickedUser]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/message/${clickedUser}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setMessages(data.messages);
        } else {
          toast.error(data.message || "Failed to load messages.");
        }
      } catch (error) {
        toast.error("Error fetching messages." + error);
      }
    };

    if (clickedUser) {
      getMessages();
    }
  }, [clickedUser, token, messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error("Message cannot be empty!");
      return;
    }

    if (!token) {
      toast.error("You are not authenticated!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/message/send/${clickedUser}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessages([...message, data.message]);
        setMessage("");
      } else {
        toast.error(data.message || "Failed to send message.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again." + error);
    }
  };

  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };

      socket.on("newMessage", handleNewMessage);

      return () => socket.off("newMessage", handleNewMessage);
    }
  }, [socket]);

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Sidebar */}
      <Slidebar setClickedUser={setClickedUser} />
      {/* Main Chat Container */}
      {clickedUser ? (
        <main className="ml-64 flex-1 flex flex-col border-4 border-black dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800 shadow-[5px_5px_0px_#00aaff]">
          <header className="flex items-center gap-5 top-0 fixed w-[80.5%] p-4 bg-white dark:bg-gray-700 border-4 border-black dark:border-gray-600 shadow-[3px_3px_0px_#ff0055]">
            <img src={UserDataOfReceiver.avatarUrl} alt="Avatar" className="w-10" />
            <h2 className="text-xl font-bold font-neobrutal">
              {UserDataOfReceiver.username}
            </h2>
          </header>
          {messages && messages.length !== 0 && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 my-20">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  ref={idx === messages.length - 1 ? latestMessageRef : null}
                  className={`flex ${
                    msg.receiverId === clickedUser
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 max-w-xs rounded-lg shadow-[3px_3px_0px_#00aaff] ${
                      msg.receiverId === clickedUser
                        ? "bg-blue-500 text-white rounded-tr-none"
                        : "bg-gray-200 text-black dark:bg-gray-600 dark:text-white rounded-tl-none"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <footer className="fixed bottom-0 left-[265px] w-[82%] p-4 bg-white dark:bg-gray-700 border-4 border-black dark:border-gray-600 shadow-[3px_3px_0px_#ff0055]">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 p-3 rounded border-2 border-black dark:border-gray-600 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white font-bold rounded border-2 border-black dark:border-gray-600 shadow-[3px_3px_0px_#00aaff] hover:translate-y-[-2px] transition-transform"
                >
                  Send
                </button>
              </div>
            </footer>
          </form>
        </main>
      ) : (
        <main className="flex-1 flex flex-col border-4 border-black dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800 shadow-[5px_5px_0px_#00aaff]">
          <div className="px-4 text-center sm:text-lg ms:text-xl text-gray-500 mt-40 font-semibold flex flex-col items-center gap-2">
            <p>Welcome</p>
            <p>Select a chat to start messaging</p>
            <i className="mt-20 ri-message-2-fill text-[200px]"></i>
          </div>
        </main>
      )}
    </div>
  );
};

export default Home;
