import {
  DocumentAddIcon,
  DocumentReportIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import React from "react";

function SideBar({ valueList, setValueList }) {
  return (
    <div className="flex justify-around mt-5 mr-5 bg-blue-900 rounded-2xl text-gray-50 lg:flex-col">
      <div
        className={`flex space-x-2 my-auto px-8 py-3 cursor-pointer ${
          valueList === "register"
            ? "bg-purple-200 justify-center text-purple-900 "
            : ""
        }`}
        onClick={() => setValueList("register")}
      >
        <DocumentAddIcon className="h-6" />
        <h4 className="hidden text-lg uppercase lg:block">Add new</h4>
      </div>

      <div
        className={`flex space-x-2 my-auto px-8 py-3 cursor-pointer ${
          valueList === "default"
            ? "bg-purple-200 justify-center text-purple-900 "
            : ""
        }`}
        onClick={() => setValueList("default")}
      >
        <DocumentReportIcon className="h-6" />
        <h4 className="hidden text-lg uppercase lg:block">stats</h4>
      </div>
      <div
        className={`flex space-x-2 my-auto px-8 py-3 cursor-pointer ${
          valueList === "volenteer"
            ? "bg-purple-200 justify-center text-purple-900 "
            : ""
        }`}
        onClick={() => setValueList("volenteer")}
      >
        <UserGroupIcon className="h-6" />
        <h4 className="hidden text-lg uppercase lg:block">volenteers List</h4>
      </div>

      <div
        className={`flex space-x-2 my-auto px-8 py-3 cursor-pointer ${
          valueList === "client"
            ? "bg-purple-200 justify-center text-purple-900 "
            : ""
        }`}
        onClick={() => setValueList("client")}
      >
        <UsersIcon className="h-6" />
        <h4 className="hidden text-lg uppercase lg:block">Clients List</h4>
      </div>
    </div>
  );
}

export default SideBar;
