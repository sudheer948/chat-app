import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { addUsers } from "../utils/usersSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);
  const users = useSelector((store) => store.users);
  console.log("store : ", users);

  console.log(users);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err?.response);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(BASE_URL + "/users", {
        withCredentials: true,
      });
      dispatch(addUsers(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err?.response);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    const interValid = setInterval(() => {
      fetchUsers();
    }, 5000);

    return () => {
      clearInterval(interValid);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true },
      );
      console.log(res.data.message);
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Temporary users (replace with API data later)
  // const users = [
  //   { id: 1, name: "John Doe", message: "Hey, how are you?" },
  //   { id: 2, name: "Alex Smith", message: "See you tomorrow!" },
  //   { id: 3, name: "David", message: "Thanks for your help" },
  // ];

  if (users.length === 0)
    return <h1 className="text-center">No users found!</h1>;

  return (
    <div className="h-screen flex flex-col bg-gray-100 animate-fade-in overflow-hidden">
      {/* Navbar */}

      <nav className="h-19 bg-white/90 backdrop-blur-xl border-b border-gray-200/70 px-6 md:px-10 flex items-center justify-between shrink-0 animate-navbar shadow-[0_2px_15px_rgba(79,70,229,0.04)] relative z-20">
        {/* Brand */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-indigo-500 via-violet-600 to-purple-700 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>

          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
              Chat
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
                App
              </span>
            </h1>

            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400">
              Stay connected
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Online Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 border border-green-100 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-green-800 animate-bounce"></span>
            <span className="text-xs font-semibold text-green-800">
              Connected
            </span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-9 w-px bg-gray-200"></div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 font-semibold text-sm shadow-sm hover:border-red-200 hover:bg-red-50 hover:text-red-600 hover:shadow-md active:scale-95 transition-all duration-300 ease-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-0.5 transition-transform duration-300"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>

            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Chat Layout */}

      {/* Main Chat Layout */}
      <div className="flex flex-1 min-h-0 bg-gray-50">
        {/* Left Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200/80 flex flex-col shrink-0 animate-slide-left">
          {/* Sidebar Header */}
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                  Messages
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Stay connected with your people
                </p>
              </div>

              <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                </svg>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>

              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-100 outline-none text-sm text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all duration-300 animate-pulse"
              />
            </div>
          </div>

          {/* Users List */}
          <div className="flex-1 overflow-y-auto p-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-3 py-3">
              Recent conversations
            </p>

            {users.map((user, index) => (
              <NavLink
                key={user._id}
                to={`/chat/${user._id}`}
                style={{
                  animationDelay: `${0.1 + index * 0.08}s`,
                }}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 p-3 mb-1 rounded-2xl transition-all duration-300 animate-slide-left ${
                    isActive ? "bg-indigo-50 shadow-sm" : "hover:bg-gray-50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-indigo-600" />
                    )}

                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-500/15 group-hover:scale-105 transition-transform duration-300">
                        {user.firstName.charAt(0).toUpperCase()}
                      </div>

                      {/* Online Indicator */}
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-[3px] border-white rounded-full" />
                    </div>

                    {/* User Details */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-semibold text-sm truncate transition-colors ${
                          isActive
                            ? "text-indigo-700"
                            : "text-gray-800 group-hover:text-indigo-600"
                        }`}
                      >
                        {user.firstName} {user.lastName}
                      </h3>
                    </div>

                    {/* Arrow */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`shrink-0 transition-all duration-300 ${
                        isActive
                          ? "text-indigo-500 opacity-100"
                          : "text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                      }`}
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </aside>

        {/* Right Chat Section */}
        <main className="flex-1 min-w-0 animate-slide-right">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Body;
