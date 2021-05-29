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
      <div class="flex items-center text-teal-600 relative">
        <BookmarkIcon className="w-12 h-12 py-3 text-blue-900 transition duration-500 ease-in-out border-2 border-blue-900 rounded-full" />

        <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
          Personal
        </div>
        <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-white"></div>
      </div>

      <div class="flex items-center text-teal-600 relative">
        <div class="">
          <UserAddIcon className="w-12 h-12 py-3 transition duration-500 ease-in-out border-2 border-teal-600 rounded-full" />
        </div>

        <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
          Account
        </div>
        <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
      </div>
      <div class="flex items-center text-teal-600 relative">
        <div class="">
          <MailIcon className="w-12 h-12 py-3 transition duration-500 ease-in-out border-2 border-teal-600 rounded-full" />
        </div>

        <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
          Message
        </div>
        <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
      </div>

      <div class="flex items-center text-teal-600 relative">
        <div class="">
          <DatabaseIcon className="w-12 h-12 py-3 transition duration-500 ease-in-out border-2 border-teal-600 rounded-full" />
        </div>

        <div class="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">
          Confirm
        </div>
        <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
      </div>
    </div>
  );
}

export default HeaderForm;
