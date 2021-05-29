import React from "react";
import {
  BookmarkIcon,
  MailIcon,
  UserAddIcon,
  DatabaseIcon,
} from "@heroicons/react/outline";

function HeaderForm() {
  return (
    <div className="flex items-center justify-around mb-10">
      <div className="relative flex items-center text-teal-600">
        <BookmarkIcon className="w-12 h-12 py-3 text-blue-900 transition duration-500 ease-in-out border-2 border-blue-900 rounded-full" />

        <div className="absolute top-0 w-32 mt-16 -ml-10 text-xs font-medium text-center text-teal-600 uppercase">
          Personal
        </div>
        <div className="flex-auto transition duration-500 ease-in-out border-t-2 border-white"></div>
      </div>

      <div className="relative flex items-center text-teal-600">
        <div className="">
          <UserAddIcon className="w-12 h-12 py-3 transition duration-500 ease-in-out border-2 border-teal-600 rounded-full" />
        </div>

        <div className="absolute top-0 w-32 mt-16 -ml-10 text-xs font-medium text-center text-teal-600 uppercase">
          Account
        </div>
        <div className="flex-auto transition duration-500 ease-in-out border-t-2 border-teal-600"></div>
      </div>
      <div className="relative flex items-center text-teal-600">
        <div className="">
          <MailIcon className="w-12 h-12 py-3 transition duration-500 ease-in-out border-2 border-teal-600 rounded-full" />
        </div>

        <div className="absolute top-0 w-32 mt-16 -ml-10 text-xs font-medium text-center text-teal-600 uppercase">
          Message
        </div>
        <div className="flex-auto transition duration-500 ease-in-out border-t-2 border-teal-600"></div>
      </div>

      <div className="relative flex items-center text-teal-600">
        <div className="">
          <DatabaseIcon className="w-12 h-12 py-3 transition duration-500 ease-in-out border-2 border-teal-600 rounded-full" />
        </div>

        <div className="absolute top-0 w-32 mt-16 -ml-10 text-xs font-medium text-center text-teal-600 uppercase">
          Confirm
        </div>
        <div className="flex-auto transition duration-500 ease-in-out border-t-2 border-teal-600"></div>
      </div>
    </div>
  );
}

export default HeaderForm;
