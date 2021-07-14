import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="flex flex-col justify-center w-full h-screen space-x-2 bg-red-100 ">
      <div className="flex justify-center mb-8 space-x-4 align-center">
        <div className="text-3xl">4</div>
        <QuestionMarkCircleIcon className="h-8 text-purple-800 lg:h-10 icon" />
        <div className="text-3xl">4</div>
      </div>
      <div className="text-center lg:text-xl">
        Something goes wrong !!
        <p>
          Let's go
          <Link
            to="/"
            className="mx-2 text-purple-900 cursor-pointer hover:text-pink-400 "
          >
            home
          </Link>
          and try from there.
        </p>
      </div>
    </div>
  );
}

export default Error;
