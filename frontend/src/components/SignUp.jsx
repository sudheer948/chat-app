import { useState } from "react";
import signupIllustration from "/assets/signup.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
  // Store email and password
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Control password visibility
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle Signup form submission
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      console.log(res.data);
      const { message, data } = res.data;

      dispatch(addUser(data));
      navigate("/");
      setError("");
    } catch (err) {
      console.log(err?.response?.data?.message);
      setError(err?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-8">
      {/* Main login container */}
      <div className="w-full max-w-6xl min-h-162.5 bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 animate-fade-in">
        {/* LEFT SIDE - IMAGE SECTION */}
        <div className="relative bg-linear-to-br from-violet-100 via-purple-50 to-indigo-100 p-8 sm:p-12 flex flex-col justify-between text-slate-900 overflow-hidden animate-slide-left">
          {/* Background decoration */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-float"></div>

          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-float-delayed"></div>

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-19">
            <div className="w-22 h-22 rounded-xl flex items-center">
              {/* Keep your existing SVG logo here */}
            </div>

            <span className="text-2xl font-extrabold tracking-wide text-violet-900">
              ChatFlow
            </span>
          </div>

          {/* Illustration */}
          <div className="relative z-10 flex-1 flex items-center justify-center py-10 animate-image-enter">
            <div className="w-full max-w-md">
              <img
                src={signupIllustration}
                alt="People connecting through ChatFlow"
                className="w-full h-64 sm:h-80 object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Welcome message */}
          <div className="relative z-10 max-w-md animate-text-enter">
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4 text-violet-950">
              Your conversations start here.
            </h1>

            <p className="text-slate-600 text-base leading-relaxed">
              Create your account, connect with friends, and make every
              conversation meaningful. Your people are just one message away.
            </p>

            {/* Small feature highlights */}
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="px-4 py-2 rounded-full bg-white/80 text-violet-800 text-sm font-medium shadow-sm">
                ✨ Real-time messaging
              </span>

              <span className="px-4 py-2 rounded-full bg-white/80 text-violet-800 text-sm font-medium shadow-sm">
                💬 Stay connected
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16 animate-slide-right">
          <div className="w-full max-w-md">
            {/* Heading */}
            <div className="mb-10 animate-text-enter text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                Create your new account
              </h2>

              <p className="text-slate-500">
                Create a new account to chat with registered users on this app
              </p>
            </div>

            {/* Login form */}
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
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
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email address
                </label>

                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
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
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3.5 pr-16 rounded-xl border border-slate-200 bg-slate-50 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <p className="text-sm text-red-500 mt-2 font-semibold">{error}</p>

              {/* SignUp button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl active:scale-[0.98] transition-all duration-200"
              >
                Create account
              </button>
            </form>

            {/* Signup link */}
            <Link to={"/login"}>
              <p className="text-center text-sm text-slate-500 mt-8">
                Existing User?
                <span
                  href="/signup"
                  className="ml-1 font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Sign in
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

export default SignUp;
