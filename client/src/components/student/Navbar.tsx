import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar: React.FC = () => {
  const context = useContext(AppContext);
  const isCourseListPage = location.pathname.includes("/course-list");
  const [toggleBurger, setToggleBurger] = useState(false);

  const { openSignIn } = useClerk();
  const { user } = useUser();

  if (!context) {
    throw new Error("CourseSection must be used within an AppContextProvider");
  }
  const { navigate, isEducator, backendUrl, setIsEducator, getToken } = context;

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        setToggleBurger((prev) => !prev);
        return;
      }

      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + "/api/educator/update-role",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setIsEducator(true);
        setToggleBurger((prev) => !prev);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        setToggleBurger(true);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const onClickBurger = () => {
    setToggleBurger((prev) => !prev);
  };
  return (
    <div
      className={`${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      } flex justify-between items-center px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 sm:py-4 py-3`}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-20 h-20 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button onClick={becomeEducator}>
                {isEducator ? "Educator DashboardModel" : "Become Educator"}
              </button>
              | <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer"
          >
            Create Account
          </button>
        )}
      </div>

      {/* phone screen */}

      <div className="md:hidden relative flex items-center gap-2 sm:gap-5 text-gray-500">
        {user && (
          <img
            onClick={onClickBurger}
            src={toggleBurger ? assets.ham_gray : assets.ham_blue}
            alt="hamburger"
            className="w-5 h-5 cursor-pointer transition-transform duration-200"
          />
        )}

        {toggleBurger && user && (
          <div
            className={
              toggleBurger &&
              `absolute top-8 right-0 z-50 w-52 px-2 py-4 bg-white rounded-xl shadow-xl border border-gray-200 text-sm flex flex-col gap-3`
            }
          >
            {/* User actions */}
            {user && (
              <div className="flex flex-col gap-2 text-gray-700 w-full max-w-[220px]">
                <button
                  onClick={becomeEducator}
                  className="text-left border-l-4 p-2 border-blue-600 hover:text-blue-600 hover:border-b rounded-sm hover:bg-gray-100 transition-colors break-words text-sm sm:text-base"
                >
                  {isEducator ? "Dashboard" : "Become Educator"}
                </button>

                <Link
                  to="/my-enrollments"
                  onClick={onClickBurger}
                  className="hover:text-blue-600 transition-colors border-blue-600 border-l-4 p-2 hover:border-b rounded-sm hover:bg-gray-100 break-words text-sm sm:text-base"
                >
                  My Courses
                </Link>
              </div>
            )}
          </div>
        )}
        <div>
          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="flex items-center gap-2 hover:opacity-80 border px-2 py-1 rounded-md bg-blue-600"
            >
              <img src={assets.user_icon} alt="user icon" className="w-5 h-5" />
              <span className="text-gray-100">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
