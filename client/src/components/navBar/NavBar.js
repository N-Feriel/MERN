import React, { useContext } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import logo from "../../assets/logo_1.png";
import Nav from "./Nav";
import NavItem from "./NavItem";
import { LogoutIcon } from "@heroicons/react/outline";

import { logout } from "../../services/authService";
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";

function NavBar() {
  const history = useHistory();

  const { user } = useContext(UserContext);

  const handleLogOut = () => {
    logout();
    history.push("/");
  };

  const handleLogIn = () => {
    history.push("/login");
  };

  return (
    <div className="flex items-center justify-between flex-grow p-1 py-2 text-white bg-pink-200 shadow-xl">
      <a href="/">
        <img src={logo} alt="" className="object-contain w-20 h-20" />
      </a>

      <Nav>
        <NavItem href="/" isActive>
          Home
        </NavItem>
        <NavItem href="/register/event">Add Time</NavItem>
        <NavItem href="/archives">Archives</NavItem>

        {user ? (
          <button
            onClick={handleLogOut}
            className="flex px-4 py-2 my-2 bg-yellow-300 rounded-lg cursor-pointer hover:bg-pink-600"
          >
            <LogoutIcon className="h-6 mx-1" />
            logOut
          </button>
        ) : (
          <button
            onClick={handleLogIn}
            className="flex px-4 py-2 my-2 bg-yellow-300 rounded-lg cursor-pointer hover:bg-pink-600"
          >
            <LogoutIcon className="h-6 mx-1" />
            logIn
          </button>
        )}
      </Nav>

      <MenuIcon className="h-8 px-2 lg:hidden" />
    </div>
  );
}

export default NavBar;
