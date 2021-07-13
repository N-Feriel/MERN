import {
  ClockIcon,
  DocumentAddIcon,
  DocumentReportIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import React from "react";

function SideBar({ valueList, setValueList }) {
  return (
    <div className="grid justify-around w-4/5 grid-flow-col mx-auto mt-10 bg-indigo-900 lg:w-full rounded-2xl text-gray-50 lg:grid-flow-row lg:grid-rows-6 lg:h-screen">
      <div
        className={`flex space-x-2 my-auto px-8 w-full py-3 cursor-pointer ${
          valueList === "register"
            ? "bg-purple-200 justify-center text-purple-900 rounded-2xl"
            : ""
        }`}
        onClick={() => setValueList("register")}
      >
        <DocumentAddIcon className="h-6" />
        <h4 className="hidden text-base uppercase lg:block">Add new</h4>
      </div>

      <div
        className={`flex space-x-2 my-auto px-8 py-3 cursor-pointer ${
          valueList === "default"
            ? "bg-purple-200 justify-center text-purple-900 rounded-2xl"
            : ""
        }`}
        onClick={() => setValueList("default")}
      >
        <DocumentReportIcon className="h-6" />
        <h4 className="hidden text-base uppercase lg:block">stats</h4>
      </div>
      <div
        className={`flex space-x-2 my-auto px-8 py-3 cursor-pointer ${
          valueList === "volenteer"
            ? "bg-purple-200 justify-center text-purple-900 rounded-2xl "
            : ""
        }`}
        onClick={() => setValueList("volenteer")}
      >
        <UserGroupIcon className="h-6" />
        <h4 className="hidden text-base uppercase lg:block">volenteers</h4>
      </div>

      <div
        className={`flex space-x-2 my-auto px-8 py-3 cursor-pointer ${
          valueList === "client"
            ? "bg-purple-200 justify-center text-purple-900 rounded-2xl"
            : ""
        }`}
        onClick={() => setValueList("client")}
      >
        <UsersIcon className="h-6" />
        <h4 className="hidden text-base uppercase lg:block">Clients</h4>
      </div>

      <div
        className={`flex space-x-2 my-auto px-8 py-3 cursor-pointer ${
          valueList === "event"
            ? "bg-purple-200 justify-center text-purple-900 rounded-2xl"
            : ""
        }`}
        onClick={() => setValueList("event")}
      >
        <ClockIcon className="h-6" />
        <h4 className="hidden text-base uppercase lg:block">Events</h4>
      </div>
    </div>
  );
}

export default SideBar;
