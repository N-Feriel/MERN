import {
  DocumentAddIcon,
  DocumentReportIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import React from "react";

function SideBar() {
  return (
    <div className="flex h-full text-blue-900 bg-white lg:font-bold lg:text-ms lg:flex-col lg:rounded-lg lg:m-auto">
      <div className="items-center m-4 lg:flex">
        <div className="flex items-center justify-center w-20 h-20 m-auto text-center bg-blue-900 rounded-full p-auto text-gray-50">
          <span>Admin</span>
        </div>

        <div>
          <p>Name</p>
        </div>
      </div>

      <div className="flex justify-around flex-1 m-4 space-y-2 lg:flex-col">
        <div className="flex items-center space-x-2">
          <DocumentAddIcon className="h-8" />
          <h2 className="hidden lg:inline-block">Add New</h2>
        </div>

        <div className="flex items-center space-x-2">
          <DocumentReportIcon className="h-8" />
          <h2 className="hidden lg:inline-block">Stats</h2>
        </div>
        <div className="flex items-center space-x-2">
          <UserGroupIcon className="h-8" />
          <h2 className="hidden lg:inline-block">Volenteers List</h2>
        </div>
        <div className="flex items-center space-x-2">
          <UsersIcon className="h-8" />
          <h2 className="hidden lg:inline-block">Clients List</h2>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
