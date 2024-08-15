import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaEnvelope, FaHome, FaSearch, FaUser } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { FaList } from "react-icons/fa6";

const SideNav = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-500 p-4">
        <ul className="menu">
          <li className="m-6 hover:bg-slate-400 rounded-xl">
            <NavLink to="/d">
              <div className="flex items-center">
                <FaHome className="text-3xl" />
                <span className="text-slate-100 text-2xl font-semibold ml-4">Admin Home</span>
              </div>
            </NavLink>
          </li>
          <li className="m-6 hover:bg-slate-400 rounded-xl">
            <NavLink to="/d/add">
              <div className="flex items-center">
                <IoIosAddCircle className="text-3xl" />
                <span className="text-slate-100 text-2xl font-semibold ml-4">Add Items</span>
              </div>
            </NavLink>
          </li>
          <li className="m-6 hover:bg-slate-400 rounded-xl">
            <NavLink to="/d/t">
              <div className="flex items-center">
                <FaList className="text-2xl" />
                <span className="text-slate-100 text-2xl font-semibold ml-4">Manage Items</span>
              </div>
            </NavLink>
          </li>
         
          <li className="m-6 hover:bg-slate-400 rounded-xl">
            <NavLink to="/d/user">
              <div className="flex items-center">
                <FaUser className="text-3xl" />
                <span className="text-slate-100 text-2xl font-semibold ml-4">All Users</span>
              </div>
            </NavLink>
          </li>
          {/* Shared navigation links */}
          <div className="divider my-4"></div>
          <li className="m-6 hover:bg-slate-400 rounded-xl">
            <NavLink to="/">
              <div className="flex items-center">
                <FaHome className="text-3xl" />
                <span className="text-slate-100 text-2xl font-semibold ml-4">Home</span>
              </div>
            </NavLink>
          </li>
          <li className="m-6 hover:bg-slate-400 rounded-xl">
            <NavLink to="/order/salad">
              <div className="flex items-center">
                <FaSearch className="text-3xl" />
                <span className="text-slate-100 text-2xl font-semibold ml-4">Menu</span>
              </div>
            </NavLink>
          </li>
          <li className="m-6 hover:bg-slate-400 rounded-xl">
            <NavLink to="/order/contract">
              <div className="flex items-center">
                <FaEnvelope className="text-3xl" />
                <span className="text-slate-100 text-2xl font-semibold ml-4">Contract</span>
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SideNav;
