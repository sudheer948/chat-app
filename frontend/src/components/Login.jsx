import { useEffect, useState } from "react";
import illustration from "/assets/illustration.png";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Login = () => {
  // Store email and password
  const [emailId, setEmail] = useState("muhammedsudheer121@gmail.com");
  const [password, setPassword] = useState("Sudheer1234$");
  const [error, setError] = useState("");

  // Control password visibility
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Handle login form submission
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true },
      );
      const { message, data } = res.data;
      console.log(message);

      dispatch(addUser(data));
      navigate("/");
      setError("");
    } catch (err) {
      console.log(err);
      console.log(err?.response?.data?.message);
      setError(err?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-8">
      {/* Main login container */}
      <div className="w-full max-w-6xl min-h-162.5 bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 animate-fade-in">
        {/* LEFT SIDE - IMAGE SECTION */}
        <div className="relative bg-linear-to-br from-indigo-950 via-violet-900 to-purple-700 p-8 sm:p-12 flex flex-col justify-between text-white overflow-hidden animate-slide-left">
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-float-delayed"></div>

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-22 h-22 rounded-xl flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 120 120"
                fill="none"
              >
                <defs>
                  <linearGradient
                    id="purple"
                    x1="20"
                    y1="15"
                    x2="95"
                    y2="105"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#D8B4FE" />
                    <stop offset=".5" stopColor="#9333EA" />
                    <stop offset="1" stopColor="#5B21B6" />
                  </linearGradient>
                  <linearGradient
                    id="white"
                    x1="35"
                    y1="20"
                    x2="90"
                    y2="85"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFFFFF" />
                    <stop offset="1" stopColor="#DDD6FE" />
                  </linearGradient>
                  <filter
                    id="shadow"
                    x="0"
                    y="0"
                    width="120"
                    height="120"
                    filterUnits="userSpaceOnUse"
                  >
                    <feGaussianBlur stdDeviation="3" />
                  </filter>
                </defs>

                <ellipse
                  cx="60"
                  cy="103"
                  rx="34"
                  ry="5"
                  fill="#7C3AED"
                  opacity=".3"
                  filter="url(#shadow)"
                />

                <path
                  d="M19 29C19 20.7 25.7 14 34 14H83C91.3 14 98 20.7 98 29V58C98 66.3 91.3 73 83 73H47L28 87V73C22.5 70.8 19 65.1 19 58V29Z"
                  fill="url(#purple)"
                />

                <path
                  d="M36 42C36 33.2 43.2 26 52 26H91C99.8 26 107 33.2 107 42V66C107 74.8 99.8 82 91 82H65L48 96V82C40.9 80.5 36 74.1 36 66V42Z"
                  fill="url(#white)"
                  stroke="#FFFFFF"
                  strokeOpacity=".6"
                  strokeWidth="2"
                />

                <circle cx="58" cy="54" r="4.5" fill="#7C3AED" />
                <circle cx="72" cy="54" r="4.5" fill="#7C3AED" />
                <circle cx="86" cy="54" r="4.5" fill="#7C3AED" />
              </svg>
            </div>

            <span className="text-2xl font-bold tracking-wide">ChatFlow</span>
          </div>

          {/* Illustration space */}
          <div className="relative z-10 flex-1 flex items-center justify-center py-10 animate-image-enter">
            <div className="w-full max-w-md">
              <img
                src={illustration}
                alt="Chat illustration"
                className="w-full h-64 sm:h-80 object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Welcome message */}
          <div className="relative z-10 max-w-md animate-text-enter">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Conversations that bring people closer.
            </h1>

            <p className="text-indigo-100 text-base leading-relaxed">
              Connect with your friends, share your moments, and stay in touch
              wherever life takes you.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16 animate-slide-right">
          <div className="w-full max-w-md">
            {/* Heading */}
            <div className="mb-10 animate-text-enter">
              <p className="text-sm font-semibold text-indigo-600 mb-3">
                WELCOME BACK 👋
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                Sign in to your account
              </h2>

              <p className="text-slate-500">
                Enter your details to continue your conversations.
              </p>
            </div>

            {/* Login form */}
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const inputs = [...e.currentTarget.querySelectorAll("input")];
                  const index = inputs.indexOf(e.target);

                  if (index !== -1 && index < inputs.length - 1) {
                    e.preventDefault();
                    inputs[index + 1].focus();
                  }
                }
              }}
              className="space-y-6"
            >
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email address
                </label>

                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    required
                    className="mb-2 w-full px-4 py-3.5 pr-16 rounded-xl border border-slate-200 bg-slate-50 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <p className="text-sm text-red-500 h-5 p-2 font-semibold">
                  {error}
                </p>
              </div>

              {/* Login button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl active:scale-[0.98] transition-all duration-200"
              >
                Sign in
              </button>
            </form>

            {/* Signup link */}
            <Link to={"/signup"}>
              <p className="text-center text-sm text-slate-500 mt-8">
                Don't have an account?
                <span
                  href="/signup"
                  className="ml-1 font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Create account
                </span>
              </p>
            </Link>

            {/* Footer */}
            <div className="mt-12 text-center text-xs text-slate-400">
              © 2026 ChatFlow. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
