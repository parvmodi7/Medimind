import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("utoken");
    navigate("/");
  };

  return (
    <div className="fixed left-0 top-0 bg-white w-full z-50 shadow-sm border-b border-gray-100 px-4 sm:px-[8%]">
      <div className="flex items-center justify-between py-4 text-sm font-medium">
        <div className="flex items-center">
          {/* MediMind Logo */}
          <div
            className="flex items-center cursor-pointer gap-2"
            onClick={() => navigate("/")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 14H14V18H10V14H6V10H10V6H14V10H18V14Z" />
            </svg>
            <span className="text-xl font-bold tracking-tight text-black">
              MediMind
            </span>
          </div>
        </div>

        {/* Main Navigation - Desktop */}
        <ul className="hidden lg:flex items-center gap-8 text-gray-600">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-black font-semibold"
                : "hover:text-black transition-colors"
            }
          >
            <li className="py-1">Home</li>
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive
                ? "text-black font-semibold"
                : "hover:text-black transition-colors"
            }
          >
            <li className="py-1">Find Doctors</li>
          </NavLink>
          <NavLink
            to="/symptom-checker"
            className={({ isActive }) =>
              isActive
                ? "text-black font-semibold"
                : "hover:text-black transition-colors"
            }
          >
            <li className="py-1">Symptom Checker</li>
          </NavLink>

          <NavLink
            to="/health-plan"
            className={({ isActive }) =>
              isActive
                ? "text-black font-semibold"
                : "hover:text-black transition-colors"
            }
          >
            <li className="py-1">Health Plan</li>
          </NavLink>

          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-black transition-colors">
              More <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </button>
            <div className="absolute right-0 pt-2 hidden group-hover:block w-48 z-20">
              <div className="bg-white text-gray-600 rounded shadow-lg border border-gray-100 flex flex-col py-2">
                <NavLink to="/medication-search" className="px-4 py-2 hover:bg-gray-50 hover:text-black">Pill Identifier</NavLink>
                <NavLink to="/donor-register" className="px-4 py-2 hover:bg-gray-50 hover:text-black">Donate Organs</NavLink>
                <NavLink to="/about" className="px-4 py-2 hover:bg-gray-50 hover:text-black">About</NavLink>
                <NavLink to="/contact" className="px-4 py-2 hover:bg-gray-50 hover:text-black">Contact</NavLink>
              </div>
            </div>
          </div>
        </ul>

        {/* User Profile/Login Section */}
        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <div className="flex items-center gap-2 border border-gray-200 rounded-full pl-1 pr-3 py-1 hover:border-gray-400 transition-all">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={userData.image}
                  alt="User"
                />
                <span className="hidden sm:block font-medium text-black text-sm">
                  {userData.name?.split(" ")[0] || "User"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Dropdown Menu */}
              <div className="absolute top-0 right-0 pt-12 z-20 hidden group-hover:block">
                <div className="min-w-60 bg-white rounded-lg shadow-xl border border-gray-100 flex flex-col p-2 text-gray-600">
                  <NavLink
                    to="/my-profile"
                    className="px-4 py-2 hover:bg-gray-50 rounded flex items-center gap-3 hover:text-black transition-colors"
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/my-appointments"
                    className="px-4 py-2 hover:bg-gray-50 rounded flex items-center gap-3 hover:text-black transition-colors"
                  >
                    My Appointments
                  </NavLink>
                  <NavLink
                    to="/saved-doctors"
                    className="px-4 py-2 hover:bg-gray-50 rounded flex items-center gap-3 hover:text-black transition-colors"
                  >
                    Saved Doctors
                  </NavLink>
                  <div className="border-t border-gray-100 my-1"></div>
                  <NavLink
                    to="/dashboard-mood"
                    className="px-4 py-2 hover:bg-gray-50 rounded flex items-center gap-3 hover:text-black transition-colors"
                  >
                    Mental Health Tracker
                  </NavLink>
                  <NavLink
                    to="/donor-dashboard"
                    className="px-4 py-2 hover:bg-gray-50 rounded flex items-center gap-3 hover:text-black transition-colors"
                  >
                    Donor Dashboard
                  </NavLink>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={logout}
                    className="text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded flex items-center gap-3 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="text-black font-semibold text-sm px-4 py-2 hover:text-gray-600 transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors shadow-sm"
              >
                Sign up
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setShowMenu(true)} className="lg:hidden p-1 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Mobile Menu */}
          <div
            className={`${showMenu ? "fixed w-full h-full" : "h-0 w-0"
              } lg:hidden left-0 top-0 z-30 overflow-hidden bg-white transition-all duration-300`}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 14H14V18H10V14H6V10H10V6H14V10H18V14Z" />
                </svg>
                <span className="text-lg font-bold">MediMind</span>
              </div>
              <button onClick={() => setShowMenu(false)} className="p-2 text-gray-500 hover:text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="overflow-y-auto h-full pb-20">
              <ul className="flex flex-col p-6 space-y-2">
                <NavLink onClick={() => setShowMenu(false)} to="/" className="text-xl font-medium py-2 border-b border-gray-50 block text-gray-800">Home</NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/doctors" className="text-xl font-medium py-2 border-b border-gray-50 block text-gray-800">Find Doctors</NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/symptom-checker" className="text-xl font-medium py-2 border-b border-gray-50 block text-gray-800">Symptom Checker</NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/health-plan" className="text-xl font-medium py-2 border-b border-gray-50 block text-gray-800">Health Plan</NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/medication-search" className="text-xl font-medium py-2 border-b border-gray-50 block text-gray-800">Pill Identifier</NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/about" className="text-xl font-medium py-2 border-b border-gray-50 block text-gray-800">About</NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/contact" className="text-xl font-medium py-2 border-b border-gray-50 block text-gray-800">Contact</NavLink>

                {!token && (
                  <div className="mt-8 flex flex-col gap-4">
                    <button onClick={() => { setShowMenu(false); navigate("/login"); }} className="w-full bg-black text-white py-3 rounded-lg font-semibold">Log in</button>
                    <button onClick={() => { setShowMenu(false); navigate("/login"); }} className="w-full border border-black text-black py-3 rounded-lg font-semibold">Create account</button>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
