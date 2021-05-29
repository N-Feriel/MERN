import React from "react";
import Register from "./components/Register";
import SideBar from "./components/SideBar";
import Stats from "./components/Stats";

function AdminPage() {
  return (
    <div className="grid mx-auto mt-5 lg:grid-cols-4 lg:w-4/5 opacity-80">
      <SideBar />

      <div className="mx-4 my-5 text-white bg-indigo-300 lg:mx-auto lg:w-4/5 p-9 rounded-3xl lg:col-span-3">
        <h2 className="mb-4 text-2xl font-bold text-center text-blue-700 lg:text-4xl">
          Stats List
        </h2>

        {/* <Stats /> */}

        <Register />
      </div>
    </div>
  );
}

export default AdminPage;
