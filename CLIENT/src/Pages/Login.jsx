import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserDataContext } from "../Context/context";
import { useContext } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setUser(data.user);
        localStorage.setItem("Token", data.token);
        setFormData({
          email: "",
          password: "",
        });
        navigate("/")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="py-4 text-center border-4 bg-gray-800 border-gray-700">
        <h1 className="text-3xl font-bold font-neobrutal">My Chatting App</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center px-4">
        <form
          onSubmit={handleSubmit}
          className="p-6 w-full max-w-md bg-gray-800 border-4 border-gray-700 shadow-[5px_5px_0px_#00aaff] rounded-lg"
        >
          <h2 className="text-2xl font-bold text-center font-neobrutal mb-4">
            Login
          </h2>

          <label className="block font-bold mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-2 border-2 rounded bg-gray-700 border-gray-600 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
          />

          <label className="block font-bold mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full p-2 border-2 rounded bg-gray-700 border-gray-600 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full py-2 mt-2 font-bold rounded bg-blue-500 text-white border-2 border-gray-600 hover:translate-y-[-2px] transition-transform"
          >
            Log In
          </button>

          <p className="text-center mt-4 font-neobrutal">
            Don&apos;t have an account?{" "}
            <NavLink to="/signup" className="text-blue-400 font-bold">
              Sign Up
            </NavLink>
          </p>
        </form>
      </main>

      {/* Footer */}
      <footer className="py-2 text-center border-4 bg-gray-800 border-gray-700">
        <p className="font-neobrutal">© 2024 MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
