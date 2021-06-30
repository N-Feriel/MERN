import React from "react";
import { MenuIcon } from "@heroicons/react/outline";
import logo from "../../assets/logo_1.png";
import Nav from "./Nav";
import NavItem from "./NavItem";

function NavBar() {
  return (
    <div className="flex items-center justify-between flex-grow p-1 py-2 text-white bg-pink-200 shadow-xl">
      <img src={logo} alt="" className="object-contain w-20 h-20" />

      <Nav>
        <NavItem href="/" isActive>
          Home
        </NavItem>
        <NavItem href="/register/event">Add Time</NavItem>
        <NavItem href="/archives">Archives</NavItem>
      </Nav>

      <MenuIcon className="h-8 px-2 lg:hidden" />
    </div>
  );
}

export default NavBar;
