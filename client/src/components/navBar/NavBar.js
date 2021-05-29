import React from "react";
import { MenuIcon, UserIcon } from "@heroicons/react/outline";
import logo from "../../assets/logo_1.png";
import Nav from "./Nav";
import NavItem from "./NavItem";

function NavBar() {
  return (
    <div className="bg-blue-900 text-blue-200 flex p-1 py-2 items-center flex-grow justify-between shadow-md">
      <img src={logo} alt="" className="object-contain h-20 w-20" />

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
