import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserDataContext } from "../Context/context";
import { useContext } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
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
          className="p-6 w-full max-w-md border-4 rounded-lg bg-gray-800 border-gray-700 shadow-[5px_5px_0px_#00aaff]"
        >
          <h2 className="text-2xl font-bold text-center font-neobrutal mb-4">
            Sign Up
          </h2>

          <label className="block font-bold mb-1" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="w-full p-2 border-2 rounded bg-gray-700 border-gray-600 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.username}
            onChange={handleChange}
          />

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

          <label className="block font-bold mb-1" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="w-full p-2 border-2 rounded bg-gray-700 border-gray-600 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="" disabled>
              --Gender--
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <button
            type="submit"
            className="w-full py-2 mt-2 font-bold rounded 
              bg-blue-500 text-white border-gray-600
             hover:translate-y-[-2px] transition-transform"
          >
            Sign Up
          </button>

          <p className="text-center mt-4 font-neobrutal">
            Already have an account?{" "}
            <NavLink to="/login" className="font-bold text-blue-400">
              Log in
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

export default Signup;
