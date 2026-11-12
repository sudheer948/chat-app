
import { Outlet, NavLink } from "react-router-dom";

const Body = () => {
  

  // Temporary users (replace with API data later)
  const users = [
    { id: 1, name: "John Doe", message: "Hey, how are you?" },
    { id: 2, name: "Alex Smith", message: "See you tomorrow!" },
    { id: 3, name: "David", message: "Thanks for your help" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">

        <div className="p-5 border-b">
          <h1 className="text-2xl font-bold text-indigo-600">
            Messages
          </h1>
          <input
            type="text"
            placeholder="Search users..."
            className="w-full mt-4 px-4 py-2 rounded-lg bg-gray-100 outline-none"
          />
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <NavLink
              key={user.id}
              to={`/chat/${user.id}`}
              className={({ isActive }) =>
                `flex items-center gap-3 p-4 border-b hover:bg-gray-100 transition ${
                  isActive ? "bg-indigo-50" : ""
                }`
              }
            >
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                {user.name.charAt(0)}
              </div>

              {/* User Details */}
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500 truncate">
                  {user.message}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Right Chat Section */}
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>

    </div>
  );
};

export default Body;
